# Tool-call benchmark: Qwen3-4B-Thinking-2507-Q8_0

**Score: 82/135 (60.7%)**

All samples completed. Every failure below is included in the score.

| Result | Count |
|---|---:|
| pass | 82 |
| truncated | 53 |

## Schema encodings

| Encoding | Score |
|---|---:|
| omitted | 22/27 (81.5%) |
| anyof_null | 14/27 (51.9%) |
| anyof_null_strict | 16/27 (59.3%) |
| type_array_null | 14/27 (51.9%) |
| type_array_null_strict | 16/27 (59.3%) |

## Scenarios

| Scenario | Score |
|---|---:|
| write_json_content | 0/5 (0.0%) |
| write_unicode_content | 0/5 (0.0%) |
| ticket_wrong_type_requested | 0/5 (0.0%) |
| read_whole | 1/5 (20.0%) |
| scores_numbers | 1/5 (20.0%) |
| parallel_weather | 1/5 (20.0%) |
| read_omit_requested | 1/5 (20.0%) |
| ticket_omit_requested | 1/5 (20.0%) |
| read_wrong_type_requested | 1/5 (20.0%) |
| bash_wrong_type_requested | 2/5 (40.0%) |
| parallel_reads | 3/5 (60.0%) |
| label_array | 3/5 (60.0%) |
| meeting_no_location | 3/5 (60.0%) |
| bash_omit_requested | 3/5 (60.0%) |
| thermostat_minimal | 4/5 (80.0%) |
| ticket_minimal | 4/5 (80.0%) |
| meeting_nested | 4/5 (80.0%) |
| read_slice | 5/5 (100.0%) |
| bash_timeout | 5/5 (100.0%) |
| bash_plain | 5/5 (100.0%) |
| thermostat_full | 5/5 (100.0%) |
| ticket_full | 5/5 (100.0%) |
| label_weights | 5/5 (100.0%) |
| transfer_decimal | 5/5 (100.0%) |
| weather_negative | 5/5 (100.0%) |
| scale_integer_enum | 5/5 (100.0%) |
| no_arguments | 5/5 (100.0%) |

## Run

- Model: `Qwen3-4B-Thinking-2507-Q8_0.gguf`
- Reasoning: off
- Context: 8192, max tokens: 1024, seed: 42
- Median latency: 9803 ms
- Upstream cases: https://github.com/OpenRouterTeam/benchmark-harness at `e5db81bf92d7ebb93833080d796071a79d93ff06`
