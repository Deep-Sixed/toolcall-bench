# Tool-call benchmark: gpt-oss-20b-MXFP4

**Score: 125/135 (92.6%)**

All samples completed. Every failure below is included in the score.

| Result | Count |
|---|---:|
| pass | 125 |
| call_count | 10 |

## Schema encodings

| Encoding | Score |
|---|---:|
| omitted | 25/27 (92.6%) |
| anyof_null | 25/27 (92.6%) |
| anyof_null_strict | 25/27 (92.6%) |
| type_array_null | 25/27 (92.6%) |
| type_array_null_strict | 25/27 (92.6%) |

## Scenarios

| Scenario | Score |
|---|---:|
| parallel_reads | 0/5 (0.0%) |
| parallel_weather | 0/5 (0.0%) |
| read_slice | 5/5 (100.0%) |
| read_whole | 5/5 (100.0%) |
| bash_timeout | 5/5 (100.0%) |
| bash_plain | 5/5 (100.0%) |
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

- Model: `gpt-oss-20b-MXFP4.gguf`
- Reasoning: off
- Context: 8192, max tokens: 1024, seed: 42
- Median latency: 4718 ms
- Upstream cases: https://github.com/OpenRouterTeam/benchmark-harness at `e5db81bf92d7ebb93833080d796071a79d93ff06`
