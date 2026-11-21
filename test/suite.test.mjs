import assert from "node:assert/strict";
import { createServer } from "node:http";
import { test } from "node:test";

import { renderComparison, renderMarkdown, summarize } from "../src/report.mjs";
import { serverArgs } from "../src/server.mjs";
import {
  buildRequest,
  classifyResponse,
  runSuite,
  SYSTEM_MESSAGE,
  TOOLCALL_FORMAT_CASES,
} from "../src/suite.mjs";

const caseOf = (suffix) => {
  const entry = TOOLCALL_FORMAT_CASES.find((item) => item.id === `toolcall_formats-${suffix}`);
  assert.ok(entry, `missing case ${suffix}`);
  return entry;
};
const call = (name, args, id = "call_1") => ({
  id,
  type: "function",
  function: { name, arguments: typeof args === "string" ? args : JSON.stringify(args) },
});
const response = (toolCalls, finishReason = "tool_calls") => ({
  choices: [
    { finish_reason: finishReason, message: { role: "assistant", content: null, tool_calls: toolCalls } },
  ],
  usage: { prompt_tokens: 10, completion_tokens: 5 },
  timings: { predicted_per_second: 50 },
});
const categoryOf = (entry, toolCalls, finishReason) =>
  classifyResponse(entry, 200, response(toolCalls, finishReason)).category;

const READ_STRICT = caseOf("read_slice-anyof_null_strict");

test("uses all 135 upstream cases with stable ids", () => {
  assert.equal(TOOLCALL_FORMAT_CASES.length, 135);
  assert.equal(new Set(TOOLCALL_FORMAT_CASES.map((entry) => entry.id)).size, 135);
  assert.equal(new Set(TOOLCALL_FORMAT_CASES.map((entry) => entry.scenarioId)).size, 27);
});

test("builds a deterministic llama-server request", () => {
  const request = buildRequest(READ_STRICT, { model: "m", maxTokens: 64, seed: 7 });
  assert.equal(request.messages[0].content, SYSTEM_MESSAGE);
  assert.equal(request.messages[1].content, READ_STRICT.prompt);
  assert.equal(request.temperature, 0);
  assert.equal(request.seed, 7);
  assert.equal(request.cache_prompt, false);
  assert.equal(request.parallel_tool_calls, true);
  assert.deepEqual(request.tools, READ_STRICT.tools);
});

test("server binds only to loopback and disables the web UI", () => {
  const args = serverArgs({ modelPath: "m.gguf", port: 9, ctx: 8192, reasoning: "off", seed: 1, logPath: "l" });
  assert.equal(args[args.indexOf("--host") + 1], "127.0.0.1");
  assert.ok(args.includes("--no-ui"));
  assert.equal(args[args.indexOf("-np") + 1], "1");
});

test("accepts correct arguments", () => {
  assert.equal(
    categoryOf(READ_STRICT, [call("read", { path: "src/server.ts", offset: 40, limit: 41 })]),
    "pass"
  );
});

test("classifies upstream scorer failures", () => {
  assert.equal(categoryOf(READ_STRICT, []), "no_tool_call");
  assert.equal(categoryOf(READ_STRICT, [call("read", '{"path": "src/')]), "invalid_json");
  assert.equal(categoryOf(READ_STRICT, [call("write", {})]), "unknown_tool");
  assert.equal(
    categoryOf(READ_STRICT, [call("read", { path: "src/server.ts", offset: "40", limit: "41" })]),
    "schema_violation"
  );
  assert.equal(
    categoryOf(READ_STRICT, [call("read", { path: "src/server.ts", offset: 4, limit: null })]),
    "wrong_value"
  );
});

test("requires the exact parallel call count, in any order", () => {
  const parallel = caseOf("parallel_reads-type_array_null");
  const reads = ["README.md", "package.json", "tsconfig.json"].map((path, index) =>
    call("read", { path, offset: null, limit: null }, `call_${index}`)
  );
  assert.equal(categoryOf(parallel, reads), "pass");
  assert.equal(categoryOf(parallel, reads.slice(1)), "call_count");
});

test("requires exact Unicode content", () => {
  const entry = caseOf("write_unicode_content-omitted");
  const content = 'She said "héllo" — naïve café ✓';
  assert.equal(categoryOf(entry, [call("write_file", { path: "notes.txt", content, append: true })]), "pass");
  assert.equal(
    categoryOf(entry, [call("write_file", { path: "notes.txt", content: `${content}\n`, append: true })]),
    "wrong_value"
  );
});

test("truncation is a failure even when the partial call is valid", () => {
  assert.equal(
    categoryOf(READ_STRICT, [call("read", { path: "src/server.ts", offset: 40, limit: 41 })], "length"),
    "truncated"
  );
});

test("classifies server and response failures", () => {
  assert.equal(classifyResponse(READ_STRICT, 400, { error: "bad" }).category, "request_rejected");
  assert.equal(classifyResponse(READ_STRICT, 500, { error: "bad" }).category, "server_error");
  assert.equal(classifyResponse(READ_STRICT, 200, {}).category, "malformed_response");
  assert.equal(
    classifyResponse(READ_STRICT, 200, response([{ function: { name: "read", arguments: {} } }])).category,
    "malformed_response"
  );
});

test("every failure stays in the denominator", () => {
  const rows = [
    ["pass", 2],
    ["schema_violation", 1],
    ["wrong_value", 1],
    ["truncated", 1],
    ["timeout", 1],
    ["server_error", 1],
    ["not_run", 1],
  ].flatMap(([category, count]) =>
    Array.from({ length: count }, (_, index) => ({
      category,
      variant: "omitted",
      scenario: `s${index}`,
      latencyMs: 10,
    }))
  );
  const summary = summarize(rows);
  assert.equal(summary.total, 8);
  assert.equal(summary.passed, 2);
  assert.equal(summary.pass_rate, 0.25);
  assert.equal(summary.complete, false);
  assert.deepEqual(summary.failures, { format: 1, wrong_value: 1, truncated: 1, infrastructure: 3 });
});

test("unknown categories cannot silently disappear", () => {
  assert.throws(
    () => summarize([{ category: "surprise", variant: "v", scenario: "s", latencyMs: 1 }]),
    /Unclassified/u
  );
});

test("reports flag incomplete runs", () => {
  const summary = summarize([{ category: "timeout", variant: "v", scenario: "s", latencyMs: 1 }]);
  const metadata = {
    label: "m",
    settings: { reasoning: "off", ctx: 1, max_tokens: 1, seed: 1 },
    upstream: { repository: "r", commit: "c" },
  };
  assert.match(renderMarkdown(metadata, summary), /Incomplete run/u);
  assert.match(renderComparison([{ label: "m", summary }]), /\| no \|/u);
});

async function withServer(handler, run) {
  const server = createServer(handler);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    return await run(`http://127.0.0.1:${server.address().port}`);
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
}

test("runs end to end against a mock server", async () => {
  const cases = [READ_STRICT, caseOf("read_whole-omitted"), caseOf("bash_plain-omitted"), caseOf("no_arguments-omitted")];
  let requests = 0;
  const results = await withServer(
    (req, res) => {
      req.resume();
      req.on("end", () => {
        requests += 1;
        if (requests === 3) {
          res.writeHead(500, { "content-type": "text/plain" });
          res.end("boom");
          return;
        }
        const toolCalls =
          requests === 1
            ? [call("read", { path: "src/server.ts", offset: 40, limit: 41 })]
            : requests === 2
              ? []
              : [call("list_active_alerts", {})];
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(response(toolCalls)));
      });
    },
    (baseUrl) => runSuite({ baseUrl, cases, model: "mock" })
  );
  assert.deepEqual(
    results.map((result) => result.category),
    ["pass", "no_tool_call", "server_error", "pass"]
  );
  assert.equal(summarize(results).pass_rate, 0.5);
});

test("timeouts are recorded as failures", async () => {
  const results = await withServer(
    () => {},
    (baseUrl) => runSuite({ baseUrl, cases: [READ_STRICT], model: "mock", timeoutMs: 50 })
  );
  assert.equal(results[0].category, "timeout");
});

test("stops after repeated transport errors and counts the rest as not run", async () => {
  const cases = TOOLCALL_FORMAT_CASES.slice(0, 6);
  let attempts = 0;
  const results = await runSuite({
    baseUrl: "http://127.0.0.1:9",
    cases,
    model: "mock",
    fetchImpl: async () => {
      attempts += 1;
      throw new TypeError("connection refused");
    },
  });
  assert.equal(attempts, 3);
  assert.equal(results.length, 6);
  assert.deepEqual(
    results.map((result) => result.category),
    ["transport_error", "transport_error", "transport_error", "not_run", "not_run", "not_run"]
  );
});
