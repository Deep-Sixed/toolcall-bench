# Tool-call benchmark: Qwen3.5-2B-Q4_K_M

**Score: 113/135 (83.7%)**

All samples completed. Every failure below is included in the score.

| Result | Count |
|---|---:|
| pass | 113 |
| wrong_value | 20 |
| schema_violation | 2 |

## Schema encodings

| Encoding | Score |
|---|---:|
| omitted | 23/27 (85.2%) |
| anyof_null | 23/27 (85.2%) |
| anyof_null_strict | 23/27 (85.2%) |
| type_array_null | 22/27 (81.5%) |
| type_array_null_strict | 22/27 (81.5%) |

## Scenarios

| Scenario | Score |
|---|---:|
| read_slice | 0/5 (0.0%) |
| bash_timeout | 0/5 (0.0%) |
| write_unicode_content | 0/5 (0.0%) |
| bash_wrong_type_requested | 0/5 (0.0%) |
| parallel_weather | 3/5 (60.0%) |
| read_whole | 5/5 (100.0%) |
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
| scale_integer_enum | 5/5 (100.0%) |
| no_arguments | 5/5 (100.0%) |
| read_omit_requested | 5/5 (100.0%) |
| bash_omit_requested | 5/5 (100.0%) |
| ticket_omit_requested | 5/5 (100.0%) |
| read_wrong_type_requested | 5/5 (100.0%) |
| ticket_wrong_type_requested | 5/5 (100.0%) |

## Run

- Model: `Qwen3.5-2B-Q4_K_M.gguf`
- Reasoning: off
- Context: 8192, max tokens: 1024, seed: 42
- Median latency: 494 ms
- Upstream cases: https://github.com/OpenRouterTeam/benchmark-harness at `e5db81bf92d7ebb93833080d796071a79d93ff06`
