// Copies the toolcall_formats cases and scorer from a checkout of
// OpenRouterTeam/benchmark-harness. Only import paths are rewritten.
// Usage: node scripts/vendor-upstream.mjs <path-to-upstream-checkout>
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const EXPECTED_COMMIT = "e5db81bf92d7ebb93833080d796071a79d93ff06";
const here = dirname(fileURLToPath(import.meta.url));
const target = resolve(here, "..", "vendor", "openrouter-benchmark-harness");
const upstream = process.argv[2];

if (!upstream) {
  throw new Error("Usage: node scripts/vendor-upstream.mjs <upstream-checkout>");
}

const commit = execFileSync("git", ["-C", upstream, "rev-parse", "HEAD"], {
  encoding: "utf8",
}).trim();
if (commit !== EXPECTED_COMMIT) {
  throw new Error(`Expected upstream ${EXPECTED_COMMIT}, found ${commit}`);
}

const FILES = [
  ["src/internal/guards.ts", "internal/guards.ts", []],
  [
    "src/benchmarks/toolcall-formats/json-schema.ts",
    "toolcall-formats/json-schema.ts",
    [['"../../internal/guards"', '"../internal/guards.ts"']],
  ],
  [
    "src/benchmarks/toolcall-formats/cases.ts",
    "toolcall-formats/cases.ts",
    [
      ['import type { ValueOf } from "../../internal/guards";', 'import type { ValueOf } from "../internal/guards.ts";'],
      ['import { isRecord } from "../../internal/guards";', 'import { isRecord } from "../internal/guards.ts";'],
      ['from "./json-schema";', 'from "./json-schema.ts";'],
    ],
  ],
  [
    "src/benchmarks/toolcall-formats/scorer.ts",
    "toolcall-formats/scorer.ts",
    [
      ['from "effect/Effect";', 'from "../shims/effect.ts";'],
      ['import * as Result from "effect/Result";', 'import * as Result from "../shims/result.ts";'],
      ['import type { Score, TaskState, ToolCall } from "../../harness/core";', 'import type { Score, TaskState, ToolCall } from "../shims/core.ts";'],
      ['import { ScoreValue } from "../../harness/core";', 'import { ScoreValue } from "../shims/core.ts";'],
      ['import type { ScorerService } from "../../harness/scorer";', 'import type { ScorerService } from "../shims/core.ts";'],
      ['import { isRecord } from "../../internal/guards";', 'import { isRecord } from "../internal/guards.ts";'],
      ['import type { ExpectedCall, ToolCallFormatCase } from "./cases";', 'import type { ExpectedCall, ToolCallFormatCase } from "./cases.ts";'],
      ['} from "./cases";', '} from "./cases.ts";'],
      ['from "./json-schema";', 'from "./json-schema.ts";'],
    ],
  ],
];

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const manifest = [];

for (const [source, destination, replacements] of FILES) {
  const original = readFileSync(join(upstream, source), "utf8");
  let text = original;
  for (const [from, to] of replacements) {
    if (!text.includes(from)) {
      throw new Error(`${source}: missing import ${from}`);
    }
    text = text.replaceAll(from, to);
  }
  const output = join(target, destination);
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, text, "utf8");
  manifest.push({
    source,
    destination,
    upstream_sha256: sha256(original),
    vendored_sha256: sha256(text),
    change: replacements.length > 0 ? "import paths only" : "none",
  });
}

copyFileSync(join(upstream, "LICENSE"), join(target, "LICENSE"));
writeFileSync(
  join(target, "MANIFEST.json"),
  `${JSON.stringify(
    {
      repository: "https://github.com/OpenRouterTeam/benchmark-harness",
      commit,
      license: "Apache-2.0",
      files: manifest,
    },
    null,
    2
  )}\n`
);
console.log(`Vendored ${manifest.length} files from ${commit}`);
