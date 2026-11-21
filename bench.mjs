#!/usr/bin/env node
import { createWriteStream, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

import { renderComparison, renderMarkdown, summarize } from "./src/report.mjs";
import {
  freeVramMiB,
  modelFingerprint,
  serverProperties,
  startLlamaServer,
} from "./src/server.mjs";
import { runSuite, TOOLCALL_FORMAT_CASES } from "./src/suite.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const USAGE = `Usage:
  npm run bench -- --model C:\\Tools\\models\\model.gguf [--model another.gguf]
  npm run bench -- --url http://127.0.0.1:8080 --label my-model

Options:
  --limit N               Run only the first N samples
  --scenario NAME         Run one scenario (repeatable)
  --ctx N                 Context size (default 8192)
  --max-tokens N          Output limit per sample (default 1024)
  --reasoning MODE        on, off or auto (default off)
  --seed N                Request and server seed (default 42)
  --timeout-sec N         Timeout per sample (default 180)
  --min-free-vram-mib N   Refuse to start below this free VRAM (default 3000)
  --server PATH           llama-server path (default C:\\Tools\\llama.cpp\\llama-server.exe)
  --out DIR               Results directory (default results)`;

function positiveInteger(name, raw) {
  const value = Number(raw);
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`--${name} must be a positive integer`);
  }
  return value;
}

function options() {
  const { values } = parseArgs({
    options: {
      model: { type: "string", multiple: true, default: [] },
      url: { type: "string" },
      label: { type: "string" },
      limit: { type: "string" },
      scenario: { type: "string", multiple: true, default: [] },
      ctx: { type: "string", default: "8192" },
      "max-tokens": { type: "string", default: "1024" },
      reasoning: { type: "string", default: "off" },
      seed: { type: "string", default: "42" },
      "timeout-sec": { type: "string", default: "180" },
      "min-free-vram-mib": { type: "string", default: "3000" },
      server: { type: "string", default: "C:\\Tools\\llama.cpp\\llama-server.exe" },
      out: { type: "string", default: join(here, "results") },
      help: { type: "boolean", default: false },
    },
  });
  if (values.help) {
    console.log(USAGE);
    process.exit(0);
  }
  if ((values.model.length > 0) === Boolean(values.url)) {
    throw new Error(`Pass either --model or --url.\n\n${USAGE}`);
  }
  if (values.url && !values.label) {
    throw new Error("--url requires --label");
  }
  if (!["on", "off", "auto"].includes(values.reasoning)) {
    throw new Error("--reasoning must be on, off or auto");
  }
  return {
    ...values,
    limit: values.limit === undefined ? undefined : positiveInteger("limit", values.limit),
    ctx: positiveInteger("ctx", values.ctx),
    maxTokens: positiveInteger("max-tokens", values["max-tokens"]),
    seed: positiveInteger("seed", values.seed),
    timeoutMs: positiveInteger("timeout-sec", values["timeout-sec"]) * 1000,
    minFreeVramMiB: positiveInteger("min-free-vram-mib", values["min-free-vram-mib"]),
  };
}

function selectCases({ scenario, limit }) {
  let cases = TOOLCALL_FORMAT_CASES;
  if (scenario.length > 0) {
    const known = new Set(cases.map((entry) => entry.scenarioId));
    const unknown = scenario.filter((name) => !known.has(name));
    if (unknown.length > 0) {
      throw new Error(`Unknown scenario: ${unknown.join(", ")}`);
    }
    cases = cases.filter((entry) => scenario.includes(entry.scenarioId));
  }
  return limit === undefined ? cases : cases.slice(0, limit);
}

async function benchmarkTarget(target, config, cases, upstream) {
  const stamp = new Date().toISOString().replace(/[:.]/gu, "-");
  const safeLabel = target.label.replace(/[^\w.-]+/gu, "_");
  const runDir = join(resolve(config.out), `${stamp}-${safeLabel}`);
  mkdirSync(runDir, { recursive: true });

  let server = null;
  let baseUrl = config.url;
  if (target.modelPath) {
    const free = await freeVramMiB();
    if (free < config.minFreeVramMiB) {
      throw new Error(
        `Only ${free} MiB of VRAM is free. Close heavy GPU apps or lower --min-free-vram-mib.`
      );
    }
    console.error(`Loading ${target.label} (${free} MiB VRAM free)...`);
    server = await startLlamaServer({
      executable: config.server,
      modelPath: target.modelPath,
      ctx: config.ctx,
      reasoning: config.reasoning,
      seed: config.seed,
      logPath: join(runDir, "llama-server.log"),
    });
    ({ baseUrl } = server);
  }

  const samples = createWriteStream(join(runDir, "samples.jsonl"), { encoding: "utf8" });
  try {
    const properties = await serverProperties(baseUrl);
    const metadata = {
      label: target.label,
      model_path: target.modelPath ?? null,
      model_fingerprint: target.modelPath ? modelFingerprint(target.modelPath) : null,
      server: properties,
      started_at: new Date().toISOString(),
      settings: {
        ctx: config.ctx,
        max_tokens: config.maxTokens,
        reasoning: config.reasoning,
        seed: config.seed,
        temperature: 0,
        timeout_ms: config.timeoutMs,
        cache_prompt: false,
        parallel_tool_calls: true,
      },
      upstream: { repository: upstream.repository, commit: upstream.commit },
      sample_count: cases.length,
    };
    const results = await runSuite({
      baseUrl,
      cases,
      model: target.label,
      maxTokens: config.maxTokens,
      seed: config.seed,
      timeoutMs: config.timeoutMs,
      onResult: (result) => {
        samples.write(`${JSON.stringify(result)}\n`);
        if ((result.index + 1) % 15 === 0 || result.index + 1 === cases.length) {
          console.error(`  ${target.label}: ${result.index + 1}/${cases.length}`);
        }
      },
    });
    const summary = summarize(results);
    metadata.finished_at = new Date().toISOString();
    writeFileSync(join(runDir, "run.json"), `${JSON.stringify(metadata, null, 2)}\n`);
    writeFileSync(join(runDir, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`);
    writeFileSync(join(runDir, "summary.md"), renderMarkdown(metadata, summary));
    console.error(`  Results: ${runDir}`);
    return { label: target.label, summary, runDir };
  } finally {
    await new Promise((done) => samples.end(done));
    if (server) {
      await server.stop();
    }
  }
}

async function main() {
  const config = options();
  const cases = selectCases(config);
  if (cases.length === 0) {
    throw new Error("No samples selected");
  }
  if (config.model.length > 0 && !existsSync(config.server)) {
    throw new Error(`llama-server not found: ${config.server}`);
  }
  const targets = config.url
    ? [{ label: config.label }]
    : config.model.map((path) => {
        const modelPath = resolve(path);
        if (!existsSync(modelPath)) {
          throw new Error(`Model not found: ${modelPath}`);
        }
        return { label: basename(modelPath, ".gguf"), modelPath };
      });
  const upstream = JSON.parse(
    readFileSync(join(here, "vendor", "openrouter-benchmark-harness", "MANIFEST.json"), "utf8")
  );

  const rows = [];
  for (const target of targets) {
    rows.push(await benchmarkTarget(target, config, cases, upstream));
  }
  const comparison = renderComparison(rows);
  if (rows.length > 1) {
    mkdirSync(resolve(config.out), { recursive: true });
    writeFileSync(join(resolve(config.out), "comparison.md"), comparison);
  }
  console.log(comparison);
  process.exitCode = rows.every((row) => row.summary.complete) ? 0 : 2;
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});
