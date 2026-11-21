# Tool-call benchmark: Qwen3.6-35B-A3B-UD-Q4_K_M

**Score: 131/135 (97.0%)**

All samples completed. Every failure below is included in the score.

| Result | Count |
|---|---:|
| pass | 131 |
| schema_violation | 4 |

## Schema encodings

| Encoding | Score |
|---|---:|
| omitted | 27/27 (100.0%) |
| anyof_null | 26/27 (96.3%) |
| anyof_null_strict | 26/27 (96.3%) |
| type_array_null | 26/27 (96.3%) |
| type_array_null_strict | 26/27 (96.3%) |

## Scenarios

| Scenario | Score |
|---|---:|
| parallel_weather | 1/5 (20.0%) |
| read_slice | 5/5 (100.0%) |
| read_whole | 5/5 (100.0%) |
| bash_timeout | 5/5 (100.0%) |
| bash_plain | 5/5 (100.0%) |
| parallel_reads | 5/5 (100.0%) |
| thermostat_full | 5/5 (100.0%) |
| thermostat_minimal | 5/5 (100.0%) |
| ticket_full | 5/5 (100.0%) |
| ticket_minimal | 5/5 (100.0%) |
| label_array | 5/5 (100.0%) |
| label_weights | 5/5 (100.0%) |
| scores_numbers | 5/5 (100.0%) |
| meeting_nested | 5/5 (100.0%) |
| meeting_no_location | 5/5 (100.0%) |
| transfer_decimal | 5/5 (100.0%) |
| weather_negative | 5/5 (100.0%) |
| write_json_content | 5/5 (100.0%) |
| write_unicode_content | 5/5 (100.0%) |
| scale_integer_enum | 5/5 (100.0%) |
| no_arguments | 5/5 (100.0%) |
| read_omit_requested | 5/5 (100.0%) |
| bash_omit_requested | 5/5 (100.0%) |
| ticket_omit_requested | 5/5 (100.0%) |
| read_wrong_type_requested | 5/5 (100.0%) |
| bash_wrong_type_requested | 5/5 (100.0%) |
| ticket_wrong_type_requested | 5/5 (100.0%) |

## Run

- Model: `Qwen3.6-35B-A3B-UD-Q4_K_M.gguf`
- Reasoning: off
- Context: 8192, max tokens: 1024, seed: 42
- Median latency: 4663 ms
- Upstream cases: https://github.com/OpenRouterTeam/benchmark-harness at `e5db81bf92d7ebb93833080d796071a79d93ff06`
