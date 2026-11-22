# Tool-call benchmark: gemma-4-E2B-it-Q4_K_M

**Score: 90/135 (66.7%)**

All samples completed. Every failure below is included in the score.

| Result | Count |
|---|---:|
| pass | 90 |
| schema_violation | 45 |

## Schema encodings

| Encoding | Score |
|---|---:|
| omitted | 26/27 (96.3%) |
| anyof_null | 14/27 (51.9%) |
| anyof_null_strict | 14/27 (51.9%) |
| type_array_null | 18/27 (66.7%) |
| type_array_null_strict | 18/27 (66.7%) |

## Scenarios

| Scenario | Score |
|---|---:|
| bash_wrong_type_requested | 0/5 (0.0%) |
| label_array | 1/5 (20.0%) |
| transfer_decimal | 1/5 (20.0%) |
| parallel_weather | 1/5 (20.0%) |
| write_json_content | 1/5 (20.0%) |
| bash_omit_requested | 1/5 (20.0%) |
| ticket_omit_requested | 1/5 (20.0%) |
| read_wrong_type_requested | 1/5 (20.0%) |
| ticket_wrong_type_requested | 1/5 (20.0%) |
| bash_plain | 3/5 (60.0%) |
| ticket_full | 3/5 (60.0%) |
| meeting_nested | 3/5 (60.0%) |
| write_unicode_content | 3/5 (60.0%) |
| read_slice | 5/5 (100.0%) |
| read_whole | 5/5 (100.0%) |
| bash_timeout | 5/5 (100.0%) |
| parallel_reads | 5/5 (100.0%) |
| thermostat_full | 5/5 (100.0%) |
| thermostat_minimal | 5/5 (100.0%) |
| ticket_minimal | 5/5 (100.0%) |
| label_weights | 5/5 (100.0%) |
| scores_numbers | 5/5 (100.0%) |
| meeting_no_location | 5/5 (100.0%) |
| weather_negative | 5/5 (100.0%) |
| scale_integer_enum | 5/5 (100.0%) |
| no_arguments | 5/5 (100.0%) |
| read_omit_requested | 5/5 (100.0%) |

## Run

- Model: `gemma-4-E2B-it-Q4_K_M.gguf`
- Reasoning: off
- Context: 8192, max tokens: 1024, seed: 42
- Median latency: 306 ms
- Upstream cases: https://github.com/OpenRouterTeam/benchmark-harness at `e5db81bf92d7ebb93833080d796071a79d93ff06`
