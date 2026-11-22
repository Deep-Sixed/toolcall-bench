# Tool-Call Bench

Tests how reliably local GGUF models make valid tool calls through `llama-server`. It uses the 135 `toolcall_formats` cases from OpenRouter's benchmark harness: 27 scenarios across 5 JSON Schema encodings.

It needs Node.js 22.18 or newer and has no npm dependencies.

## Results

Published comparisons:

- [RTX 4070 Ti, 12 GB](published-results/2026-11-21/comparison.md): eight local GGUF models on llama.cpp b9567
- [RTX 3060 Ti, 8 GB](published-results/2026-11-21-rtx-3060-ti/comparison.md): ten local GGUF models on llama.cpp b9862
- [llama.cpp v1.0.0](published-results/2026-11-21-llama-v1.0.0/comparison.md): eight new models across both GPUs, plus same-build GPT-OSS-20B and uncensored Qwen3.5 9B reruns

Each model folder contains its summary, run settings, and per-sample results. The two sets use different hardware and llama.cpp builds, so compare them with care. Latency and run time are specific to the test machine, and these results measure tool-call reliability only. See the [reproducibility guide](docs/REPRODUCING.md) for hardware, settings, and how to run the same tests.

## Run

Test one model:

```powershell
npm run bench -- --model C:\Tools\models\gemma-4-12b-it-Q4_K_M.gguf
```

Compare several models:

```powershell
npm run bench -- --model C:\Tools\models\gemma-4-E4B-it-Q4_K_M.gguf --model C:\Tools\models\gemma-4-12b-it-Q4_K_M.gguf
```

Test a server that is already running:

```powershell
npm run bench -- --url http://127.0.0.1:8080 --label my-model
```

Run the tests:

```powershell
npm test
```

Use `npm run bench -- --help` for all options. Defaults are temperature 0, seed 42, reasoning off, 8,192 context, 1,024 output tokens, and a 180-second timeout per sample.

The runner starts its own loopback-only `llama-server` on a free port and stops only that process. It refuses to start when less than 3,000 MiB of VRAM is free.

## Scoring

The score is `passed / all selected samples`. Nothing is dropped from the denominator.

| Group | Results | Usually means |
|---|---|---|
| Pass | `pass` | The call was valid and correct |
| Format | `no_tool_call`, `unknown_tool`, `invalid_json`, `schema_violation`, `call_count` | A model, template, parser, or decoding problem |
| Wrong value | `wrong_value` | The call was valid but had the wrong content |
| Truncated | `truncated` | The output reached the token limit |
| Infrastructure | `request_rejected`, `server_error`, `timeout`, `transport_error`, `malformed_response`, `scorer_error`, `not_run` | The run is marked incomplete |

The three `*_wrong_type_requested` scenarios deliberately ask for the wrong JSON type. They pass only when the serving stack enforces the schema, so low scores there do not necessarily mean the model is bad at ordinary tool use.

Each run writes `summary.md`, `summary.json`, `samples.jsonl`, `run.json`, and the server log under `results/`.

## Limits

- This measures tool-call reliability, not general reasoning or coding ability.
- Comparisons are only fair with the same llama.cpp build, chat template, and settings. `run.json` records them.
- The model fingerprint hashes the file size and the first and last 16 MiB, not the whole file.
- The upstream `toolcall_schema_fuzz` suite is not included because generating its cases requires additional npm packages.

## License and attribution

This project is licensed under the Apache License 2.0.

The cases and scorer in `vendor/openrouter-benchmark-harness/` come from [OpenRouterTeam/benchmark-harness](https://github.com/OpenRouterTeam/benchmark-harness) at commit `e5db81bf92d7ebb93833080d796071a79d93ff06`, under the Apache License 2.0. Only their import paths were changed, and small local shims replace the upstream runtime imports. `MANIFEST.json` records the original and vendored file hashes.
