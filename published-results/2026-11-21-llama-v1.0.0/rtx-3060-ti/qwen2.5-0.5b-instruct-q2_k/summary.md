# Tool-call benchmark: qwen2.5-0.5b-instruct-q2_k

**Score: 96/135 (71.1%)**

All samples completed. Every failure below is included in the score.

| Result | Count |
|---|---:|
| pass | 96 |
| wrong_value | 34 |
| no_tool_call | 5 |

## Schema encodings

| Encoding | Score |
|---|---:|
| omitted | 21/27 (77.8%) |
| anyof_null | 19/27 (70.4%) |
| anyof_null_strict | 19/27 (70.4%) |
| type_array_null | 18/27 (66.7%) |
| type_array_null_strict | 19/27 (70.4%) |

## Scenarios

| Scenario | Score |
|---|---:|
| read_slice | 0/5 (0.0%) |
| meeting_nested | 0/5 (0.0%) |
| meeting_no_location | 0/5 (0.0%) |
| write_json_content | 0/5 (0.0%) |
| write_unicode_content | 0/5 (0.0%) |
| scale_integer_enum | 0/5 (0.0%) |
| parallel_reads | 1/5 (20.0%) |
| read_wrong_type_requested | 1/5 (20.0%) |
| read_whole | 4/5 (80.0%) |
| bash_timeout | 5/5 (100.0%) |
| bash_plain | 5/5 (100.0%) |
| thermostat_full | 5/5 (100.0%) |
| thermostat_minimal | 5/5 (100.0%) |
| ticket_full | 5/5 (100.0%) |
| ticket_minimal | 5/5 (100.0%) |
| label_array | 5/5 (100.0%) |
| label_weights | 5/5 (100.0%) |
| scores_numbers | 5/5 (100.0%) |
| transfer_decimal | 5/5 (100.0%) |
| weather_negative | 5/5 (100.0%) |
| parallel_weather | 5/5 (100.0%) |
| no_arguments | 5/5 (100.0%) |
| read_omit_requested | 5/5 (100.0%) |
| bash_omit_requested | 5/5 (100.0%) |
| ticket_omit_requested | 5/5 (100.0%) |
| bash_wrong_type_requested | 5/5 (100.0%) |
| ticket_wrong_type_requested | 5/5 (100.0%) |

## Run

- Model: `qwen2.5-0.5b-instruct-q2_k.gguf`
- Reasoning: off
- Context: 8192, max tokens: 1024, seed: 42
- Median latency: 142 ms
- Upstream cases: https://github.com/OpenRouterTeam/benchmark-harness at `e5db81bf92d7ebb93833080d796071a79d93ff06`
