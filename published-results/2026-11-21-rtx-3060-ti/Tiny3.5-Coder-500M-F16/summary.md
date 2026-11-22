# Tool-call benchmark: Tiny3.5-Coder-500M-F16

**Score: 0/135 (0.0%)**

All samples completed. Every failure below is included in the score.

| Result | Count |
|---|---:|
| no_tool_call | 135 |

## Schema encodings

| Encoding | Score |
|---|---:|
| omitted | 0/27 (0.0%) |
| anyof_null | 0/27 (0.0%) |
| anyof_null_strict | 0/27 (0.0%) |
| type_array_null | 0/27 (0.0%) |
| type_array_null_strict | 0/27 (0.0%) |

## Scenarios

| Scenario | Score |
|---|---:|
| read_slice | 0/5 (0.0%) |
| read_whole | 0/5 (0.0%) |
| bash_timeout | 0/5 (0.0%) |
| bash_plain | 0/5 (0.0%) |
| parallel_reads | 0/5 (0.0%) |
| thermostat_full | 0/5 (0.0%) |
| thermostat_minimal | 0/5 (0.0%) |
| ticket_full | 0/5 (0.0%) |
| ticket_minimal | 0/5 (0.0%) |
| label_array | 0/5 (0.0%) |
| label_weights | 0/5 (0.0%) |
| scores_numbers | 0/5 (0.0%) |
| meeting_nested | 0/5 (0.0%) |
| meeting_no_location | 0/5 (0.0%) |
| transfer_decimal | 0/5 (0.0%) |
| weather_negative | 0/5 (0.0%) |
| parallel_weather | 0/5 (0.0%) |
| write_json_content | 0/5 (0.0%) |
| write_unicode_content | 0/5 (0.0%) |
| scale_integer_enum | 0/5 (0.0%) |
| no_arguments | 0/5 (0.0%) |
| read_omit_requested | 0/5 (0.0%) |
| bash_omit_requested | 0/5 (0.0%) |
| ticket_omit_requested | 0/5 (0.0%) |
| read_wrong_type_requested | 0/5 (0.0%) |
| bash_wrong_type_requested | 0/5 (0.0%) |
| ticket_wrong_type_requested | 0/5 (0.0%) |

## Run

- Model: `Tiny3.5-Coder-500M-F16.gguf`
- Reasoning: off
- Context: 8192, max tokens: 1024, seed: 42
- Median latency: 227 ms
- Upstream cases: https://github.com/OpenRouterTeam/benchmark-harness at `e5db81bf92d7ebb93833080d796071a79d93ff06`
