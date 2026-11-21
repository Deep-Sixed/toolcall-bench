import {
  FORMAT_CATEGORIES,
  INFRASTRUCTURE_CATEGORIES,
  LIMIT_CATEGORIES,
  MODEL_CATEGORIES,
} from "./suite.mjs";

function median(values) {
  const sorted = values.filter(Number.isFinite).sort((a, b) => a - b);
  if (sorted.length === 0) {
    return null;
  }
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
}

function tally(results, field) {
  const groups = {};
  for (const result of results) {
    const key = result[field];
    groups[key] ??= { passed: 0, total: 0 };
    groups[key].total += 1;
    groups[key].passed += result.category === "pass" ? 1 : 0;
  }
  return groups;
}

export function summarize(results) {
  const categories = {};
  for (const { category } of results) {
    categories[category] = (categories[category] ?? 0) + 1;
  }
  const countIn = (set) =>
    Object.entries(categories).reduce(
      (sum, [category, count]) => sum + (set.has(category) ? count : 0),
      0
    );
  const total = results.length;
  const passed = categories.pass ?? 0;
  const infrastructure = countIn(INFRASTRUCTURE_CATEGORIES);
  const known =
    passed +
    countIn(FORMAT_CATEGORIES) +
    countIn(MODEL_CATEGORIES) +
    countIn(LIMIT_CATEGORIES) +
    infrastructure;
  if (known !== total) {
    throw new Error(`Unclassified results: ${total - known}`);
  }
  return {
    total,
    passed,
    pass_rate: total === 0 ? 0 : passed / total,
    complete: infrastructure === 0,
    failures: {
      format: countIn(FORMAT_CATEGORIES),
      wrong_value: countIn(MODEL_CATEGORIES),
      truncated: countIn(LIMIT_CATEGORIES),
      infrastructure,
    },
    categories,
    by_variant: tally(results, "variant"),
    by_scenario: tally(results, "scenario"),
    median_latency_ms: median(results.map((result) => result.latencyMs)),
    median_generation_tokens_per_second: median(
      results.map((result) => result.timings?.predicted_per_second)
    ),
  };
}

const percent = (value) => `${(value * 100).toFixed(1)}%`;
const ratio = ({ passed, total }) => `${passed}/${total} (${percent(passed / total)})`;

export function renderMarkdown(metadata, summary) {
  const lines = [
    `# Tool-call benchmark: ${metadata.label}`,
    "",
    `**Score: ${summary.passed}/${summary.total} (${percent(summary.pass_rate)})**`,
    "",
    summary.complete
      ? "All samples completed. Every failure below is included in the score."
      : `**Incomplete run:** ${summary.failures.infrastructure} samples hit infrastructure failures. They count as failed, so do not compare this score as a clean result.`,
    "",
    "| Result | Count |",
    "|---|---:|",
    ...Object.entries(summary.categories)
      .sort(([, a], [, b]) => b - a)
      .map(([category, count]) => `| ${category} | ${count} |`),
    "",
    "## Schema encodings",
    "",
    "| Encoding | Score |",
    "|---|---:|",
    ...Object.entries(summary.by_variant).map(
      ([name, group]) => `| ${name} | ${ratio(group)} |`
    ),
    "",
    "## Scenarios",
    "",
    "| Scenario | Score |",
    "|---|---:|",
    ...Object.entries(summary.by_scenario)
      .sort(([, a], [, b]) => a.passed / a.total - b.passed / b.total)
      .map(([name, group]) => `| ${name} | ${ratio(group)} |`),
    "",
    "## Run",
    "",
    `- Model: \`${metadata.model_path ?? metadata.label}\``,
    `- Reasoning: ${metadata.settings.reasoning}`,
    `- Context: ${metadata.settings.ctx}, max tokens: ${metadata.settings.max_tokens}, seed: ${metadata.settings.seed}`,
    `- Median latency: ${summary.median_latency_ms ?? "n/a"} ms`,
    `- Upstream cases: ${metadata.upstream.repository} at \`${metadata.upstream.commit}\``,
    "",
  ];
  return lines.join("\n");
}

export function renderComparison(rows) {
  const sorted = [...rows].sort((a, b) => b.summary.pass_rate - a.summary.pass_rate);
  return [
    "# Tool-call comparison",
    "",
    "| Model | Score | Format | Wrong value | Truncated | Infrastructure | Complete |",
    "|---|---:|---:|---:|---:|---:|---|",
    ...sorted.map(({ label, summary }) => {
      const { format, wrong_value: wrongValue, truncated, infrastructure } = summary.failures;
      return `| ${label} | ${summary.passed}/${summary.total} (${percent(summary.pass_rate)}) | ${format} | ${wrongValue} | ${truncated} | ${infrastructure} | ${summary.complete ? "yes" : "no"} |`;
    }),
    "",
  ].join("\n");
}
