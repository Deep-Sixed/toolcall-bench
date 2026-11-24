# Tool-call benchmark: senik-quantum-1.7b-v2.2-hadamard-mixed

**Score: 41/135 (30.4%)**

All samples completed. Every failure below is included in the score.

| Result | Count |
|---|---:|
| no_tool_call | 84 |
| pass | 41 |
| wrong_value | 10 |

## Schema encodings

| Encoding | Score |
|---|---:|
| omitted | 13/27 (48.1%) |
| anyof_null | 11/27 (40.7%) |
| anyof_null_strict | 7/27 (25.9%) |
| type_array_null | 7/27 (25.9%) |
| type_array_null_strict | 3/27 (11.1%) |

## Scenarios

| Scenario | Score |
|---|---:|
| read_slice | 0/5 (0.0%) |
| bash_plain | 0/5 (0.0%) |
| ticket_minimal | 0/5 (0.0%) |
| label_weights | 0/5 (0.0%) |
| scores_numbers | 0/5 (0.0%) |
| meeting_nested | 0/5 (0.0%) |
| meeting_no_location | 0/5 (0.0%) |
| transfer_decimal | 0/5 (0.0%) |
| scale_integer_enum | 0/5 (0.0%) |
| bash_omit_requested | 0/5 (0.0%) |
| ticket_omit_requested | 0/5 (0.0%) |
| bash_timeout | 1/5 (20.0%) |
| weather_negative | 1/5 (20.0%) |
| read_wrong_type_requested | 1/5 (20.0%) |
| bash_wrong_type_requested | 1/5 (20.0%) |
| ticket_wrong_type_requested | 1/5 (20.0%) |
| ticket_full | 2/5 (40.0%) |
| label_array | 2/5 (40.0%) |
| read_omit_requested | 2/5 (40.0%) |
| thermostat_full | 3/5 (60.0%) |
| thermostat_minimal | 3/5 (60.0%) |
| parallel_weather | 3/5 (60.0%) |
| write_json_content | 3/5 (60.0%) |
| no_arguments | 3/5 (60.0%) |
| read_whole | 5/5 (100.0%) |
| parallel_reads | 5/5 (100.0%) |
| write_unicode_content | 5/5 (100.0%) |

## Run

- Model: `senik-quantum-1.7b-v2.2-hadamard-mixed.gguf`
- Reasoning: off
- Context: 8192, max tokens: 1024, seed: 42
- Median latency: 249 ms
- Upstream cases: https://github.com/OpenRouterTeam/benchmark-harness at `e5db81bf92d7ebb93833080d796071a79d93ff06`
