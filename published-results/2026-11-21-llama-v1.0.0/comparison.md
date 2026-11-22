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
| 7 | [Qwen2.5-Coder-14B-Instruct-Q4_K_M](rtx-4070-ti/Qwen2.5-Coder-14B-Instruct-Q4_K_M/summary.md) | 0/135 (0.0%) | 0/120 | 135 | 0 | 0 | 1.34 s | 47.8 | Official 0/135. Lenient diagnostic 105/135. |

## RTX 3060 Ti, 8 GB

Intel Core i7-4930K, approximately 48 GiB DDR3, Linux, built from the v1.0.0 tag with CUDA and AVX1 and without the embedded web UI. This build reports itself as `b1-b1b770d` because of how the source was checked out. It is the same commit.

| Rank | Model | Correct | Core | Format | Wrong value | Truncated | Median latency | Median gen tok/s | Note |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | [Qwen3-8B-Q5_K_M](rtx-3060-ti/Qwen3-8B-Q5_K_M/summary.md) | 130/135 (96.3%) | 115/120 | 0 | 5 | 0 | 0.77 s | 65.2 |  |
| 2 | [Qwen3-4B-Thinking-2507-Q8_0](rtx-3060-ti/Qwen3-4B-Thinking-2507-Q8_0/summary.md) | 82/135 (60.7%) | 79/120 | 0 | 0 | 53 | 9.80 s | 78.7 | 53 cases hit the 1024-token limit with empty visible output. |
| 3 | [Qwen2.5-Coder-7B-Instruct-Q6_K](rtx-3060-ti/Qwen2.5-Coder-7B-Instruct-Q6_K/summary.md) | 0/135 (0.0%) | 0/120 | 135 | 0 | 0 | 0.81 s | 63.8 | Official 0/135. Lenient diagnostic 99/135. |

## Reading these results

- **Qwen2.5 Coder 14B and 7B:** The official score is 0/135 for both. Each GGUF's chat template asks for `<tool_call>`, but the models print calls in other wrappers. The 14B model uses `<function-calls>`, and the 7B model mostly uses Markdown JSON fences or tags such as `<xml>` and `<json>`, so llama-server returns text and no `tool_calls`.
- **Lenient diagnostic:** Extracting JSON calls from that text and running the unchanged scorer gives 105/135 for the 14B model and 99/135 for the 7B model. These numbers show what a custom parser might recover. They are not official scores.
- **Qwen3 4B Thinking:** 53 cases stopped at the 1024-token limit with empty visible output, so its 82/135 reflects this benchmark's fixed limit as well as the model. A larger limit was not tested.
- **GPT-OSS-20B:** The same model file, template and settings scored 124/135 on b9567 and 125/135 on v1.0.0. One case changed outcome. Both runs fail all 10 parallel-call cases.
- **Uncensored Qwen3.5 9B:** The same model file, template and settings scored 130/135 on b9567 and 135/135 on v1.0.0. Five cases changed from fail to pass. It differs from the official Qwen3.5 9B Q6_K in both fine-tuning and quantization, so this set does not show which difference explains their 5-case gap.
- **Abliterated Qwen3 14B:** This community model and the official Qwen3 14B are both Q4_K_M and had the same outcome on all 135 cases. Its first-place rank comes from a 6 ms median-latency difference, which is too small to treat as a real speed advantage. The two GGUFs have different chat templates. This benchmark does not measure refusals, coding, reasoning or factual accuracy.
- **Comparing sets:** Scores and timings in this set should not be treated as directly comparable with the [b9567](../2026-11-21/comparison.md) or [b9862](../2026-11-21-rtx-3060-ti/comparison.md) sets. The two GPUs here also differ in CPU, memory and operating system.
