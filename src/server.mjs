import { execFile, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { closeSync, fstatSync, openSync, readSync } from "node:fs";
import { createServer } from "node:net";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const FINGERPRINT_BYTES = 16 * 1024 * 1024;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function freeVramMiB() {
  const { stdout } = await execFileAsync("nvidia-smi", [
    "--query-gpu=memory.free",
    "--format=csv,noheader,nounits",
  ]);
  const value = Number(stdout.trim().split(/\r?\n/u)[0]);
  if (!Number.isFinite(value)) {
    throw new Error(`Could not read free VRAM: ${stdout}`);
  }
  return value;
}

export function freePort() {
  return new Promise((resolve, reject) => {
    const probe = createServer();
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const { port } = probe.address();
      probe.close(() => resolve(port));
    });
  });
}

// Hashes the size plus the first and last 16 MiB, which is fast for large GGUF files.
export function modelFingerprint(path) {
  const descriptor = openSync(path, "r");
  try {
    const { size } = fstatSync(descriptor);
    const hash = createHash("sha256").update(String(size));
    const chunk = Buffer.alloc(Math.min(FINGERPRINT_BYTES, size));
    readSync(descriptor, chunk, 0, chunk.length, 0);
    hash.update(chunk);
    readSync(descriptor, chunk, 0, chunk.length, Math.max(0, size - chunk.length));
    hash.update(chunk);
    return { size_bytes: size, partial_sha256: hash.digest("hex") };
  } finally {
    closeSync(descriptor);
  }
}

export function serverArgs({ modelPath, port, ctx, reasoning, seed, logPath }) {
  return [
    "-m",
    modelPath,
    "--host",
    "127.0.0.1",
    "--port",
    String(port),
    "-c",
    String(ctx),
    "-np",
    "1",
    "--fit",
    "on",
    "-fitt",
    "768",
    "--jinja",
    "--reasoning",
    reasoning,
    "--seed",
    String(seed),
    "--no-ui",
    "--log-file",
    logPath,
  ];
}

export async function startLlamaServer({
  executable,
  modelPath,
  ctx,
  reasoning,
  seed,
  logPath,
  startupTimeoutMs = 300_000,
}) {
  const port = await freePort();
  const child = spawn(
    executable,
    serverArgs({ modelPath, port, ctx, reasoning, seed, logPath }),
    { stdio: "ignore", windowsHide: true }
  );
  let exited = false;
  let spawnError = null;
  const exitPromise = new Promise((resolve) => {
    child.once("exit", (code, signal) => {
      exited = true;
      resolve({ code, signal });
    });
  });
  child.once("error", (error) => {
    spawnError = error;
    exited = true;
  });

  const baseUrl = `http://127.0.0.1:${port}`;
  const stop = async () => {
    if (!exited) {
      child.kill();
      await Promise.race([exitPromise, delay(15_000)]);
    }
  };
  const emergencyStop = () => {
    if (!exited) {
      child.kill();
    }
  };
  process.once("exit", emergencyStop);

  const deadline = Date.now() + startupTimeoutMs;
  try {
    while (Date.now() < deadline) {
      if (spawnError !== null) {
        throw spawnError;
      }
      if (exited) {
        throw new Error(`llama-server exited during startup; see ${logPath}`);
      }
      try {
        const response = await fetch(`${baseUrl}/health`, {
          signal: AbortSignal.timeout(2_000),
        });
        if (response.ok) {
          return {
            baseUrl,
            stop: async () => {
              process.removeListener("exit", emergencyStop);
              await stop();
            },
          };
        }
      } catch {
        // The server is still loading.
      }
      await delay(500);
    }
    throw new Error(`llama-server was not healthy within ${startupTimeoutMs} ms`);
  } catch (error) {
    process.removeListener("exit", emergencyStop);
    await stop();
    throw error;
  }
}

export async function serverProperties(baseUrl) {
  try {
    const response = await fetch(`${baseUrl}/props`, {
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.ok) {
      return null;
    }
    const props = await response.json();
    return {
      build_info: props.build_info ?? null,
      model_path: props.model_path ?? null,
      n_ctx: props.default_generation_settings?.n_ctx ?? null,
      chat_template_sha256:
        typeof props.chat_template === "string"
          ? createHash("sha256").update(props.chat_template).digest("hex")
          : null,
    };
  } catch {
    return null;
  }
}
