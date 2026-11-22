# Tool-call benchmark: Qwen2.5-0.5B-Instruct-F16

**Score: 107/135 (79.3%)**

All samples completed. Every failure below is included in the score.

| Result | Count |
|---|---:|
| pass | 107 |
| wrong_value | 23 |
| truncated | 5 |

## Schema encodings

| Encoding | Score |
|---|---:|
| omitted | 22/27 (81.5%) |
| anyof_null | 22/27 (81.5%) |
| anyof_null_strict | 21/27 (77.8%) |
| type_array_null | 21/27 (77.8%) |
| type_array_null_strict | 21/27 (77.8%) |

## Scenarios

| Scenario | Score |
|---|---:|
| read_slice | 0/5 (0.0%) |
| meeting_nested | 0/5 (0.0%) |
| meeting_no_location | 0/5 (0.0%) |
| write_json_content | 0/5 (0.0%) |
| read_wrong_type_requested | 1/5 (20.0%) |
| scale_integer_enum | 2/5 (40.0%) |
| ticket_full | 4/5 (80.0%) |
| read_whole | 5/5 (100.0%) |
| bash_timeout | 5/5 (100.0%) |
| bash_plain | 5/5 (100.0%) |
| parallel_reads | 5/5 (100.0%) |
| thermostat_full | 5/5 (100.0%) |
| thermostat_minimal | 5/5 (100.0%) |
| ticket_minimal | 5/5 (100.0%) |
| label_array | 5/5 (100.0%) |
| label_weights | 5/5 (100.0%) |
| scores_numbers | 5/5 (100.0%) |
| transfer_decimal | 5/5 (100.0%) |
| weather_negative | 5/5 (100.0%) |
| parallel_weather | 5/5 (100.0%) |
| write_unicode_content | 5/5 (100.0%) |
| no_arguments | 5/5 (100.0%) |
| read_omit_requested | 5/5 (100.0%) |
| bash_omit_requested | 5/5 (100.0%) |
| ticket_omit_requested | 5/5 (100.0%) |
| bash_wrong_type_requested | 5/5 (100.0%) |
| ticket_wrong_type_requested | 5/5 (100.0%) |

## Run

- Model: `Qwen2.5-0.5B-Instruct-F16.gguf`
- Reasoning: off
- Context: 8192, max tokens: 1024, seed: 42
- Median latency: 235 ms
- Upstream cases: https://github.com/OpenRouterTeam/benchmark-harness at `e5db81bf92d7ebb93833080d796071a79d93ff06`
