# Tool-call comparison: llama.cpp v1.0.0

Runtime: official llama.cpp v1.0.0, commit `b1b770d90`. Context 8192, maximum output 1024, temperature 0, seed 42, reasoning off, single slot, GPU fit target 768 MiB.

Suite: OpenRouter toolcall_formats, 135 samples. Core excludes the three `*_wrong_type_requested` scenarios. Single run per model. Every failure stays in the denominator, and no model-generated tool call was executed.

## RTX 4070 Ti, 12 GB

Intel Core i7-6850K, 32 GB DDR4, Windows 10, official CUDA 12.4 release binaries (build 12359).

| Rank | Model | Correct | Core | Format | Wrong value | Truncated | Median latency | Median gen tok/s | Note |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | [qwen3-14b-abliterated-Q4_K_M](rtx-4070-ti/qwen3-14b-abliterated-Q4_K_M/summary.md) | 135/135 (100.0%) | 120/120 | 0 | 0 | 0 | 0.95 s | 47.2 | Community abliterated model. Effectively tied with official Qwen3 14B. |
| 2 | [Qwen3-14B-Q4_K_M](rtx-4070-ti/Qwen3-14B-Q4_K_M/summary.md) | 135/135 (100.0%) | 120/120 | 0 | 0 | 0 | 0.96 s | 47.2 |  |
| 3 | [Qwen3.5-9B-Uncensored-HauhauCS-Aggressive-Q4_K_M](rtx-4070-ti/Qwen3.5-9B-Uncensored-HauhauCS-Aggressive-Q4_K_M/summary.md) | 135/135 (100.0%) | 120/120 | 0 | 0 | 0 | 1.08 s | 72.2 | Same-build rerun. Earlier b9567 result: 130/135. |
| 4 | [Qwen3.5-9B-Q6_K](rtx-4070-ti/Qwen3.5-9B-Q6_K/summary.md) | 130/135 (96.3%) | 115/120 | 0 | 5 | 0 | 1.32 s | 57.6 | All 5 misses are in `bash_timeout`. |
| 5 | [Qwen3-Coder-30B-A3B-Instruct-Q4_K_M](rtx-4070-ti/Qwen3-Coder-30B-A3B-Instruct-Q4_K_M/summary.md) | 130/135 (96.3%) | 115/120 | 0 | 5 | 0 | 3.27 s | 32.0 |  |
| 6 | [gpt-oss-20b-MXFP4](rtx-4070-ti/gpt-oss-20b-MXFP4/summary.md) | 125/135 (92.6%) | 110/120 | 10 | 0 | 0 | 2.01 s | 68.2 | Same-build rerun. Earlier b9567 result: 124/135. |
| 7 | [gemma-4-E2B-it-Q4_K_M](rtx-4070-ti/gemma-4-E2B-it-Q4_K_M/summary.md) | 118/135 (87.4%) | 118/120 | 17 | 0 | 0 | 0.28 s | 153.2 | Same-build rerun. Earlier b9567 result: 92/135. |
| 8 | [gemma-4-31B-it-Q4_K_M](rtx-4070-ti/gemma-4-31B-it-Q4_K_M/summary.md) | 116/135 (85.9%) | 114/120 | 19 | 0 | 0 | 15.80 s | 3.1 | Same-build rerun. Earlier b9567 result: 106/135. Exceeds 12 GB VRAM. |
| 9 | [gemma-4-E4B-it-Q4_K_M](rtx-4070-ti/gemma-4-E4B-it-Q4_K_M/summary.md) | 115/135 (85.2%) | 112/120 | 16 | 4 | 0 | 0.43 s | 97.9 | Same-build rerun. Earlier b9567 result: 99/135. |
| 10 | [gemma-4-12b-it-Q4_K_M](rtx-4070-ti/gemma-4-12b-it-Q4_K_M/summary.md) | 113/135 (83.7%) | 110/120 | 21 | 1 | 0 | 0.83 s | 53.2 | Same-build rerun. Earlier b9567 result: 111/135. |
| 11 | [gemma-4-26B-A4B-it-UD-Q4_K_M](rtx-4070-ti/gemma-4-26B-A4B-it-UD-Q4_K_M/summary.md) | 112/135 (83.0%) | 110/120 | 23 | 0 | 0 | 2.43 s | 31.2 | Same-build rerun. Earlier b9567 result: 100/135. |
| 12 | [Qwen2.5-Coder-14B-Instruct-Q4_K_M](rtx-4070-ti/Qwen2.5-Coder-14B-Instruct-Q4_K_M/summary.md) | 0/135 (0.0%) | 0/120 | 135 | 0 | 0 | 1.34 s | 47.8 | Official 0/135. Lenient diagnostic 105/135. |

## RTX 3060 Ti, 8 GB

Intel Core i7-4930K, approximately 48 GiB DDR3, Linux, built from the v1.0.0 tag with CUDA and AVX1 and without the embedded web UI. This build reports itself as `b1-b1b770d` because of how the source was checked out. It is the same commit.

| Rank | Model | Correct | Core | Format | Wrong value | Truncated | Median latency | Median gen tok/s | Note |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | [Qwen3.5-4B-Uncensored-HauhauCS-Aggressive-Q4_K_M](rtx-3060-ti/Qwen3.5-4B-Uncensored-HauhauCS-Aggressive-Q4_K_M/summary.md) | 134/135 (99.3%) | 119/120 | 0 | 1 | 0 | 0.84 s | 100.5 | Rerun. Earlier b9862 result: 126/135. |
| 2 | [Qwen3-8B-Q5_K_M](rtx-3060-ti/Qwen3-8B-Q5_K_M/summary.md) | 130/135 (96.3%) | 115/120 | 0 | 5 | 0 | 0.77 s | 65.2 |  |
| 3 | [gpt-oss-20b-MXFP4](rtx-3060-ti/gpt-oss-20b-MXFP4/summary.md) | 125/135 (92.6%) | 110/120 | 10 | 0 | 0 | 4.72 s | 28.2 | Rerun. Earlier b9862 result: 125/135. Exceeds 8 GB VRAM. |
| 4 | [Qwen3-4B-Instruct-2507-UD-Q4_K_XL](rtx-3060-ti/Qwen3-4B-Instruct-2507-UD-Q4_K_XL/summary.md) | 122/135 (90.4%) | 115/120 | 0 | 13 | 0 | 0.47 s | 109.1 | Rerun. Earlier b9862 result: 122/135. |
| 5 | [mini-senik-0.8b-agent-q4_k_m](rtx-3060-ti/mini-senik-0.8b-agent-q4_k_m/summary.md) | 120/135 (88.9%) | 105/120 | 0 | 15 | 0 | 0.31 s | 257.9 | Community fine-tune. All 15 misses are valid calls with wrong values. |
| 6 | [gemma-4-E2B-it-Q4_K_M](rtx-3060-ti/gemma-4-E2B-it-Q4_K_M/summary.md) | 118/135 (87.4%) | 116/120 | 17 | 0 | 0 | 0.30 s | 134.9 | Rerun. Earlier b9862 result: 90/135. |
| 7 | [Qwen3.5-2B-Uncensored-HauhauCS-Aggressive-BF16](rtx-3060-ti/Qwen3.5-2B-Uncensored-HauhauCS-Aggressive-BF16/summary.md) | 116/135 (85.9%) | 106/120 | 0 | 19 | 0 | 0.82 s | 90.5 | Rerun. Earlier b9862 result: 111/135. |
| 8 | [Qwen3.5-2B-Uncensored-HauhauCS-Aggressive-Q4_K_M](rtx-3060-ti/Qwen3.5-2B-Uncensored-HauhauCS-Aggressive-Q4_K_M/summary.md) | 115/135 (85.2%) | 104/120 | 2 | 18 | 0 | 0.42 s | 192.9 | Rerun. Earlier b9862 result: 113/135. |
| 9 | [Qwen3.5-2B-Q4_K_M](rtx-3060-ti/Qwen3.5-2B-Q4_K_M/summary.md) | 113/135 (83.7%) | 103/120 | 2 | 20 | 0 | 0.41 s | 191.5 | Rerun. Earlier b9862 result: 113/135. |
| 10 | [Qwen2.5-0.5B-Instruct-F16](rtx-3060-ti/Qwen2.5-0.5B-Instruct-F16/summary.md) | 107/135 (79.3%) | 96/120 | 0 | 23 | 5 | 0.22 s | 211.4 | Rerun. Earlier b9862 result: 107/135. |
| 11 | [senik-dense-2b-q4_k_m](rtx-3060-ti/senik-dense-2b-q4_k_m/summary.md) | 98/135 (72.6%) | 83/120 | 22 | 12 | 0 | 0.28 s | 170.3 | Community fine-tune. Incomplete run: 3 server parse errors count as failures. |
| 12 | [qwen2.5-0.5b-instruct-q2_k](rtx-3060-ti/qwen2.5-0.5b-instruct-q2_k/summary.md) | 96/135 (71.1%) | 85/120 | 5 | 34 | 0 | 0.14 s | 395.8 | Rerun. Earlier b9862 result: 96/135. |
| 13 | [Qwen3-4B-Thinking-2507-Q8_0](rtx-3060-ti/Qwen3-4B-Thinking-2507-Q8_0/summary.md) | 82/135 (60.7%) | 79/120 | 0 | 0 | 53 | 9.80 s | 78.7 | 53 cases hit the 1024-token limit with empty visible output. |
| 14 | [Tiny3.5-Coder-500M-F16](rtx-3060-ti/Tiny3.5-Coder-500M-F16/summary.md) | 0/135 (0.0%) | 0/120 | 135 | 0 | 0 | 0.21 s | 252.4 | Rerun. Earlier b9862 result: 0/135. Model ignores the tool-call format. |
| 15 | [Qwen2.5-Coder-7B-Instruct-Q6_K](rtx-3060-ti/Qwen2.5-Coder-7B-Instruct-Q6_K/summary.md) | 0/135 (0.0%) | 0/120 | 135 | 0 | 0 | 0.81 s | 63.8 | Official 0/135. Lenient diagnostic 99/135. |

## Reading these results

- **Qwen2.5 Coder 14B and 7B:** The official score is 0/135 for both. Each GGUF's chat template asks for `<tool_call>`, but the models print calls in other wrappers. The 14B model uses `<function-calls>`, and the 7B model mostly uses Markdown JSON fences or tags such as `<xml>` and `<json>`, so llama-server returns text and no `tool_calls`.
- **Lenient diagnostic:** Extracting JSON calls from that text and running the unchanged scorer gives 105/135 for the 14B model and 99/135 for the 7B model. These numbers show what a custom parser might recover. They are not official scores.
- **Qwen3 4B Thinking:** 53 cases stopped at the 1024-token limit with empty visible output, so its 82/135 reflects this benchmark's fixed limit as well as the model. A larger limit was not tested.
- **GPT-OSS-20B:** The same model file, template and settings scored 124/135 on b9567 and 125/135 on v1.0.0. One case changed outcome. Both runs fail all 10 parallel-call cases.
- **Uncensored Qwen3.5 9B:** The same model file, template and settings scored 130/135 on b9567 and 135/135 on v1.0.0. Five cases changed from fail to pass. It differs from the official Qwen3.5 9B Q6_K in both fine-tuning and quantization, so this set does not show which difference explains their 5-case gap.
- **Abliterated Qwen3 14B:** This community model and the official Qwen3 14B are both Q4_K_M and had the same outcome on all 135 cases. Its first-place rank comes from a 6 ms median-latency difference, which is too small to treat as a real speed advantage. The two GGUFs have different chat templates. This benchmark does not measure refusals, coding, reasoning or factual accuracy.
- **Gemma reruns:** With the same model files, templates and settings, all five Gemma models scored higher on v1.0.0 than on b9567: E2B 92 to 118, E4B 99 to 115, 12B 111 to 113, 26B 100 to 112 and 31B 106 to 116. Nearly all gains were schema violations that became passes, mostly from required keys now being present. llama.cpp rewrote its Gemma 4 tool-argument parser shortly before v1.0.0, which is the likely cause, but individual commits were not bisected. A required key can also be filled with a value the request did not give.
- **Qwen3.6 35B:** This model was not rerun on v1.0.0, so its 131/135 remains a [b9567 result](../2026-11-21/comparison.md).
- **RTX 3060 Ti reruns:** All ten earlier models were rerun with the same model files, templates and settings. Four improved over b9862: Gemma E2B 90 to 118, uncensored Qwen3.5 4B 126 to 134, uncensored Qwen3.5 2B BF16 111 to 116, and uncensored Qwen3.5 2B Q4_K_M 113 to 115. The other six kept the same score, and none got worse.
- **Mini-Senik-0.8B-Agent:** Tested from `Lysandra999/Mini-Senik-0.8B-Agent-GGUF` at commit `c190f53172bd06cdc6a38cd5778a16f3ffe2eac1`, with the whole-file SHA-256 `cea357772191eeb82be3b619e464baa1a9fc546542111149f2f987547801aaa4`. It leads Gemma E2B overall, 120 to 118, because it passes all 15 wrong-type cases, but trails it on core cases, 105 to 116. All 15 misses are in `read_slice`, `meeting_nested` and `write_unicode_content`. The calls are valid JSON with wrong values, so schema validation would not catch them. A second run reproduced all 135 outcomes and tool calls. Both runs kept the production Gemma E2B server (1,838 MiB) and embedding server (208 MiB) loaded but idle, unlike the other RTX 3060 Ti runs, which had only the embedding server loaded, so treat its latency and tok/s with extra care.
- **Senik-Dense-2B:** Tested from `Lysandra999/Senik-Dense-2B-GGUF` at commit `0815db665ff4bedb2af8f6ef235cc85e0a23d79a`, with the whole-file SHA-256 `178fb17a87ee01d0bd88f02099511c6e62828a9409bffd3ccf1aafa496ea0232`. Its run is marked incomplete because 3 `write_unicode_content` samples returned HTTP 500 when llama-server could not parse the model's output. Those 3 samples count as failures and are not in the Format or Wrong value columns. Of the 22 format failures, 20 omit required nullable keys and 2 send an empty string for an enum. Two tool calls also put a `[emotion:...]` tag in file content. A second run reproduced all 135 outcomes, tool names, arguments and text. Both runs kept the production Gemma E2B server (1,838 MiB) and embedding server (208 MiB) loaded but idle, so treat its latency and tok/s with extra care.
- **Comparing sets:** Scores and timings in this set should not be treated as directly comparable with the [b9567](../2026-11-21/comparison.md) or [b9862](../2026-11-21-rtx-3060-ti/comparison.md) sets. The two GPUs here also differ in CPU, memory and operating system.
