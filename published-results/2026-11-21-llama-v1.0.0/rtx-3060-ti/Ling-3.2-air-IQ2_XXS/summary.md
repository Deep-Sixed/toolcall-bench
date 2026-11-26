# Tool-call benchmark: Ling-3.2-air-IQ2_XXS

**Score: 125/135 (92.6%)**

All samples completed. Every failure below is included in the score.

| Result | Count |
|---|---:|
| pass | 125 |
| wrong_value | 10 |

## Schema encodings

| Encoding | Score |
|---|---:|
| omitted | 25/27 (92.6%) |
| anyof_null | 25/27 (92.6%) |
| anyof_null_strict | 24/27 (88.9%) |
| type_array_null | 25/27 (92.6%) |
| type_array_null_strict | 26/27 (96.3%) |

## Scenarios

| Scenario | Score |
|---|---:|
| write_unicode_content | 0/5 (0.0%) |
| read_omit_requested | 3/5 (60.0%) |
| meeting_nested | 4/5 (80.0%) |
| write_json_content | 4/5 (80.0%) |
| read_wrong_type_requested | 4/5 (80.0%) |
| read_slice | 5/5 (100.0%) |
| read_whole | 5/5 (100.0%) |
| bash_timeout | 5/5 (100.0%) |
| bash_plain | 5/5 (100.0%) |
| parallel_reads | 5/5 (100.0%) |
| thermostat_full | 5/5 (100.0%) |
| thermostat_minimal | 5/5 (100.0%) |
| ticket_full | 5/5 (100.0%) |
| ticket_minimal | 5/5 (100.0%) |
| label_array | 5/5 (100.0%) |
| label_weights | 5/5 (100.0%) |
| scores_numbers | 5/5 (100.0%) |
| meeting_no_location | 5/5 (100.0%) |
| transfer_decimal | 5/5 (100.0%) |
| weather_negative | 5/5 (100.0%) |
| parallel_weather | 5/5 (100.0%) |
| scale_integer_enum | 5/5 (100.0%) |
| no_arguments | 5/5 (100.0%) |
| bash_omit_requested | 5/5 (100.0%) |
| ticket_omit_requested | 5/5 (100.0%) |
| bash_wrong_type_requested | 5/5 (100.0%) |
| ticket_wrong_type_requested | 5/5 (100.0%) |

## Run

- Model: `Ling-3.2-air-IQ2_XXS.gguf`
- Reasoning: off
- Context: 8192, max tokens: 1024, seed: 42
- Median latency: 30507 ms
- Upstream cases: https://github.com/OpenRouterTeam/benchmark-harness at `e5db81bf92d7ebb93833080d796071a79d93ff06`
