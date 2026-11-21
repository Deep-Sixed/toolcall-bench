# Tool-call comparison

All models used llama.cpp build b9567, temperature 0, seed 42, reasoning off, 8,192 context, and 1,024 output tokens.

| Rank | Model | Full score | Core score | Format failures | Wrong values | Infrastructure | Median latency | Tokens/s | Run time |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | Qwen3.6-35B-A3B-UD-Q4_K_M | 131/135 (97.0%) | 116/120 (96.7%) | 4 | 0 | 0 | 4.7 s | 32.7 | 12.1 min |
| 2 | Qwen3.5-9B-Uncensored-HauhauCS-Aggressive-Q4_K_M | 130/135 (96.3%) | 115/120 (95.8%) | 4 | 1 | 0 | 1.2 s | 69.0 | 2.8 min |
| 3 | gpt-oss-20b-MXFP4 | 124/135 (91.9%) | 110/120 (91.7%) | 11 | 0 | 0 | 1.6 s | 76.0 | 5.1 min |
| 4 | gemma-4-12b-it-Q4_K_M | 111/135 (82.2%) | 108/120 (90.0%) | 23 | 1 | 0 | 0.8 s | 50.2 | 2.1 min |
| 5 | gemma-4-31B-it-Q4_K_M | 106/135 (78.5%) | 104/120 (86.7%) | 29 | 0 | 0 | 17.3 s | 2.9 | 41.4 min |
| 6 | gemma-4-26B-A4B-it-UD-Q4_K_M | 100/135 (74.1%) | 100/120 (83.3%) | 35 | 0 | 0 | 2.6 s | 29.8 | 6.6 min |
| 7 | gemma-4-E4B-it-Q4_K_M | 99/135 (73.3%) | 96/120 (80.0%) | 32 | 4 | 0 | 0.4 s | 97.1 | 1.1 min |
| 8 | gemma-4-E2B-it-Q4_K_M | 92/135 (68.1%) | 92/120 (76.7%) | 43 | 0 | 0 | 0.3 s | 154.9 | 0.7 min |

Core score excludes the three scenarios that deliberately request the wrong JSON type. Every timeout, truncation, and server failure counts as a failure.
