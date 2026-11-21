import {
  TOOLCALL_FORMAT_CASES,
  variantLabel,
} from "../vendor/openrouter-benchmark-harness/toolcall-formats/cases.ts";
import { scoreToolCalls } from "../vendor/openrouter-benchmark-harness/toolcall-formats/scorer.ts";

export { TOOLCALL_FORMAT_CASES, variantLabel };

// Copied unchanged from upstream src/benchmarks/toolcall-formats/benchmark.ts.
export const SYSTEM_MESSAGE =
  "You are a function-calling assistant. Fulfil every request by calling the provided tools directly, without asking for confirmation. Pass values exactly as given. For any parameter the request does not give a value for, omit it, or pass null if its schema requires it and allows null; never invent defaults. When a request needs several independent calls, make all of them in this turn.";

export const FORMAT_CATEGORIES = new Set([
  "no_tool_call",
  "unknown_tool",
  "invalid_json",
  "schema_violation",
  "call_count",
]);
export const MODEL_CATEGORIES = new Set(["wrong_value"]);
export const LIMIT_CATEGORIES = new Set(["truncated"]);
export const INFRASTRUCTURE_CATEGORIES = new Set([
  "request_rejected",
  "server_error",
  "timeout",
  "transport_error",
  "malformed_response",
  "scorer_error",
  "not_run",
]);

export function buildRequest(entry, { model, maxTokens, seed }) {
  return {
    model,
    messages: [
      { role: "system", content: SYSTEM_MESSAGE },
      { role: "user", content: entry.prompt },
    ],
    tools: entry.tools,
    tool_choice: "auto",
    parallel_tool_calls: true,
    temperature: 0,
    seed,
    max_tokens: maxTokens,
    cache_prompt: false,
    stream: false,
  };
}

function outcome(category, detail, extra = {}) {
  return { category, detail: String(detail).slice(0, 2000), ...extra };
}

function normalizeToolCalls(rawCalls) {
  if (rawCalls === undefined || rawCalls === null) {
    return [];
  }
  if (!Array.isArray(rawCalls)) {
    throw new TypeError("tool_calls is not an array");
  }
  return rawCalls.map((call, index) => {
    const name = call?.function?.name;
    const args = call?.function?.arguments;
    if (typeof name !== "string" || typeof args !== "string") {
      throw new TypeError(`tool_calls[${index}] lacks a string name or arguments`);
    }
    return {
      id: typeof call.id === "string" ? call.id : `call_${index}`,
      type: "function",
      function: { name, arguments: args },
    };
  });
}

export function classifyResponse(entry, status, body) {
  if (status === 400 || status === 422) {
    return outcome("request_rejected", `HTTP ${status}: ${JSON.stringify(body)}`);
  }
  if (status < 200 || status >= 300) {
    return outcome("server_error", `HTTP ${status}: ${JSON.stringify(body)}`);
  }
  const choice = body?.choices?.[0];
  if (!choice?.message) {
    return outcome("malformed_response", "response has no choices[0].message");
  }

  const metrics = {
    finishReason: choice.finish_reason ?? null,
    usage: body.usage ?? null,
    timings: body.timings ?? null,
    content: typeof choice.message.content === "string" ? choice.message.content : null,
  };

  let toolCalls;
  try {
    toolCalls = normalizeToolCalls(choice.message.tool_calls);
  } catch (error) {
    return outcome("malformed_response", error.message, metrics);
  }
  metrics.toolCalls = toolCalls;

  if (choice.finish_reason === "length") {
    return outcome("truncated", "response stopped at the token limit", metrics);
  }

  let score;
  try {
    score = scoreToolCalls(entry, toolCalls);
  } catch (error) {
    return outcome("scorer_error", error.message, metrics);
  }
  if (score.value === "C") {
    return outcome("pass", score.explanation, metrics);
  }
  const separator = score.explanation.indexOf(":");
  const category =
    separator === -1 ? "scorer_error" : score.explanation.slice(0, separator);
  return outcome(category, score.explanation, metrics);
}

export async function runSuite({
  baseUrl,
  cases = TOOLCALL_FORMAT_CASES,
  model,
  maxTokens = 1024,
  seed = 42,
  timeoutMs = 180_000,
  maxConsecutiveTransportErrors = 3,
  onResult = () => {},
  fetchImpl = fetch,
}) {
  const results = [];
  const url = `${baseUrl.replace(/\/+$/u, "")}/v1/chat/completions`;
  let consecutiveTransportErrors = 0;
  let abortReason = null;

  for (const [index, entry] of cases.entries()) {
    const base = {
      index,
      id: entry.id,
      scenario: entry.scenarioId,
      variant: variantLabel(entry.variant),
    };
    if (abortReason !== null) {
      const skipped = { ...base, ...outcome("not_run", abortReason), latencyMs: 0 };
      results.push(skipped);
      onResult(skipped);
      continue;
    }

    const startedAt = performance.now();
    let result;
    try {
      const response = await fetchImpl(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(buildRequest(entry, { model, maxTokens, seed })),
        signal: AbortSignal.timeout(timeoutMs),
      });
      const text = await response.text();
      let body;
      try {
        body = JSON.parse(text);
      } catch {
        result =
          response.ok
            ? outcome("malformed_response", `invalid JSON response: ${text.slice(0, 300)}`)
            : outcome("server_error", `HTTP ${response.status}: ${text.slice(0, 300)}`);
      }
      result ??= classifyResponse(entry, response.status, body);
      consecutiveTransportErrors = 0;
    } catch (error) {
      if (error?.name === "TimeoutError" || error?.name === "AbortError") {
        result = outcome("timeout", `no response within ${timeoutMs} ms`);
        consecutiveTransportErrors = 0;
      } else {
        result = outcome("transport_error", error?.cause?.message ?? error?.message ?? error);
        consecutiveTransportErrors += 1;
        if (consecutiveTransportErrors >= maxConsecutiveTransportErrors) {
          abortReason = `stopped after ${consecutiveTransportErrors} consecutive transport errors`;
        }
      }
    }

    const complete = {
      ...base,
      ...result,
      latencyMs: Math.round(performance.now() - startedAt),
    };
    results.push(complete);
    onResult(complete);
  }
  return results;
}
