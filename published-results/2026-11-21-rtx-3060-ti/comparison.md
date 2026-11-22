# Tool-call comparison: RTX 3060 Ti

Hardware: NVIDIA RTX 3060 Ti 8 GiB; Intel Core i7-4930K; approximately 48 GiB RAM; Linux.

Runtime: llama.cpp b9862 (5f83fbbe7), CUDA AVX1; 8192 context; maximum output 1024; temperature 0; seed 42; reasoning off; single slot; GPU fit target 768 MiB.

Suite: OpenRouter toolcall_formats, 135 samples, commit e5db81bf92d7ebb93833080d796071a79d93ff06. Single run per model.

| Rank | Model | Correct | Format | Wrong value | Truncated | Infrastructure | Median latency | Median gen tok/s |
|---:|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | Qwen3.5-4B-Uncensored-HauhauCS-Aggressive-Q4_K_M | 126/135 (93.3%) | 5 | 4 | 0 | 0 | 0.96 s | 97.4 |
| 2 | gpt-oss-20b-MXFP4 | 125/135 (92.6%) | 10 | 0 | 0 | 0 | 4.62 s | 28.9 |
| 3 | Qwen3-4B-Instruct-2507-UD-Q4_K_XL | 122/135 (90.4%) | 0 | 13 | 0 | 0 | 0.49 s | 113.3 |
| 4 | Qwen3.5-2B-Uncensored-HauhauCS-Aggressive-Q4_K_M | 113/135 (83.7%) | 4 | 18 | 0 | 0 | 0.49 s | 187.1 |
| 5 | Qwen3.5-2B-Q4_K_M | 113/135 (83.7%) | 2 | 20 | 0 | 0 | 0.49 s | 187.0 |
| 6 | Qwen3.5-2B-Uncensored-HauhauCS-Aggressive-BF16 | 111/135 (82.2%) | 4 | 20 | 0 | 0 | 0.86 s | 91.6 |
| 7 | Qwen2.5-0.5B-Instruct-F16 | 107/135 (79.3%) | 0 | 23 | 5 | 0 | 0.23 s | 214.7 |
| 8 | qwen2.5-0.5b-instruct-q2_k | 96/135 (71.1%) | 5 | 34 | 0 | 0 | 0.15 s | 373.2 |
| 9 | gemma-4-E2B-it-Q4_K_M | 90/135 (66.7%) | 45 | 0 | 0 | 0 | 0.31 s | 141.3 |
| 10 | Tiny3.5-Coder-500M-F16 | 0/135 (0.0%) | 135 | 0 | 0 | 0 | 0.23 s | 259.5 |

Every timeout, truncation and server failure remains in the denominator. No model-generated tool calls were executed. All ten runs completed without infrastructure failures.

This set uses llama.cpp b9862, unlike the [RTX 4070 Ti results](../2026-11-21/comparison.md) on b9567; do not treat latency across the two sets as directly comparable. Scores depend on model quantization, runtime, chat template and tool parser; one seeded run does not establish general coding or reasoning ability.

`Tiny3.5-Coder-500M-F16` produced no parsed tool calls. Its first sample returned JSON-like tool-call text as plain text, so its 0% may reflect chat-template or parser compatibility rather than model ability.
