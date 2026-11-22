# Tool-call benchmark: gemma-4-26B-A4B-it-UD-Q4_K_M

**Score: 112/135 (83.0%)**

All samples completed. Every failure below is included in the score.

| Result | Count |
|---|---:|
| pass | 112 |
| schema_violation | 21 |
| no_tool_call | 2 |

## Schema encodings

| Encoding | Score |
|---|---:|
| omitted | 24/27 (88.9%) |
| anyof_null | 21/27 (77.8%) |
| anyof_null_strict | 21/27 (77.8%) |
| type_array_null | 23/27 (85.2%) |
| type_array_null_strict | 23/27 (85.2%) |

## Scenarios

| Scenario | Score |
|---|---:|
| read_wrong_type_requested | 0/5 (0.0%) |
| bash_wrong_type_requested | 0/5 (0.0%) |
| meeting_nested | 1/5 (20.0%) |
| ticket_wrong_type_requested | 2/5 (40.0%) |
| label_array | 3/5 (60.0%) |
| meeting_no_location | 3/5 (60.0%) |
| ticket_omit_requested | 3/5 (60.0%) |
| read_slice | 5/5 (100.0%) |
| read_whole | 5/5 (100.0%) |
| bash_timeout | 5/5 (100.0%) |
| bash_plain | 5/5 (100.0%) |
| parallel_reads | 5/5 (100.0%) |
| thermostat_full | 5/5 (100.0%) |
| thermostat_minimal | 5/5 (100.0%) |
| ticket_full | 5/5 (100.0%) |
| ticket_minimal | 5/5 (100.0%) |
| label_weights | 5/5 (100.0%) |
| scores_numbers | 5/5 (100.0%) |
| transfer_decimal | 5/5 (100.0%) |
| weather_negative | 5/5 (100.0%) |
| parallel_weather | 5/5 (100.0%) |
| write_json_content | 5/5 (100.0%) |
| write_unicode_content | 5/5 (100.0%) |
| scale_integer_enum | 5/5 (100.0%) |
| no_arguments | 5/5 (100.0%) |
| read_omit_requested | 5/5 (100.0%) |
| bash_omit_requested | 5/5 (100.0%) |

## Run

- Model: `gemma-4-26B-A4B-it-UD-Q4_K_M.gguf`
- Reasoning: off
- Context: 8192, max tokens: 1024, seed: 42
- Median latency: 2431 ms
- Upstream cases: https://github.com/OpenRouterTeam/benchmark-harness at `e5db81bf92d7ebb93833080d796071a79d93ff06`
