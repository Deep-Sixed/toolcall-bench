# Tool-call benchmark: senik-dense-2b-q4_k_m

**Score: 98/135 (72.6%)**

**Incomplete run:** 3 samples hit infrastructure failures. They count as failed, so do not compare this score as a clean result.

| Result | Count |
|---|---:|
| pass | 98 |
| schema_violation | 22 |
| wrong_value | 12 |
| server_error | 3 |

## Schema encodings

| Encoding | Score |
|---|---:|
| omitted | 24/27 (88.9%) |
| anyof_null | 19/27 (70.4%) |
| anyof_null_strict | 20/27 (74.1%) |
| type_array_null | 18/27 (66.7%) |
| type_array_null_strict | 17/27 (63.0%) |

## Scenarios

| Scenario | Score |
|---|---:|
| read_slice | 0/5 (0.0%) |
| bash_timeout | 0/5 (0.0%) |
| write_unicode_content | 0/5 (0.0%) |
| read_whole | 1/5 (20.0%) |
| label_array | 1/5 (20.0%) |
| read_omit_requested | 1/5 (20.0%) |
| ticket_omit_requested | 1/5 (20.0%) |
| meeting_no_location | 2/5 (40.0%) |
| parallel_weather | 3/5 (60.0%) |
| bash_omit_requested | 4/5 (80.0%) |
| bash_plain | 5/5 (100.0%) |
| parallel_reads | 5/5 (100.0%) |
| thermostat_full | 5/5 (100.0%) |
| thermostat_minimal | 5/5 (100.0%) |
| ticket_full | 5/5 (100.0%) |
| ticket_minimal | 5/5 (100.0%) |
| label_weights | 5/5 (100.0%) |
| scores_numbers | 5/5 (100.0%) |
| meeting_nested | 5/5 (100.0%) |
| transfer_decimal | 5/5 (100.0%) |
| weather_negative | 5/5 (100.0%) |
| write_json_content | 5/5 (100.0%) |
| scale_integer_enum | 5/5 (100.0%) |
| no_arguments | 5/5 (100.0%) |
| read_wrong_type_requested | 5/5 (100.0%) |
| bash_wrong_type_requested | 5/5 (100.0%) |
| ticket_wrong_type_requested | 5/5 (100.0%) |

## Run

- Model: `senik-dense-2b-q4_k_m.gguf`
- Reasoning: off
- Context: 8192, max tokens: 1024, seed: 42
- Median latency: 280 ms
- Upstream cases: https://github.com/OpenRouterTeam/benchmark-harness at `e5db81bf92d7ebb93833080d796071a79d93ff06`
