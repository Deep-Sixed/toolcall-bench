# Reproducing the Results

This guide lets you run the same tool-call suite on your own GPU and compare results fairly.

## Published test setup

| Item | Value |
|---|---|
| GPU | NVIDIA GeForce RTX 4070 Ti, 12 GB |
| NVIDIA driver | 621.01 |
| CPU | Intel Core i7-6850K, 6 cores / 12 threads |
| Memory | 32 GB quad-channel DDR4-2133 |
| Operating system | Windows 10 |
| llama.cpp | `llama-server` b9567 (`42a0afd59`), CUDA backend |
| Node.js | 22.22.3 |
| Upstream cases | `toolcall_formats` at `e5db81bf92d7ebb93833080d796071a79d93ff06` |

## Inference settings

| Setting | Value |
|---|---|
| Temperature | 0 |
| Seed | 42 |
| Reasoning | Off |
| Context | 8,192 tokens |
| Maximum output | 1,024 tokens |
| Parallel slots | 1 |
| Prompt cache | Disabled per request |
| Parallel tool calls | Enabled |
| GPU fit | `--fit on`, 768 MiB target margin |
| Timeout | 180 seconds per sample |

Each model was run once. Each run's `run.json` records its llama.cpp build, chat template hash, settings, and a partial model fingerprint.

## Run it

1. Install Node.js 22.18 or newer and a llama.cpp build with `llama-server`.
2. Clone this repository and run the tests:

   ```sh
   npm test
   ```

3. Close other GPU-heavy applications.
4. Run a model:

   ```sh
   npm run bench -- --server /path/to/llama-server --model /path/to/model.gguf
   ```

5. Read `summary.md` in the new folder under `results/`.

To compare several models, repeat `--model`. A `comparison.md` file is written to `results/`.

## Comparing results fairly

- Use the same GGUF file and quantization. The partial fingerprint in `run.json` helps identify it.
- Report your llama.cpp build, because tool parsing and templates can change between builds.
- Keep the settings above, or state every setting you changed.
- Compare scores across GPUs, but treat latency and tokens per second as hardware-specific.
- Keep every failure in the denominator. A run with infrastructure failures is marked incomplete.
- Repeat runs before treating differences of a few samples as meaningful.

## Sharing results

Open an issue with your `summary.md`, `run.json`, GPU, driver, operating system, and llama.cpp build. Check those files first and remove any private paths. Do not share raw `llama-server.log` files unless you have reviewed them.

## What the score does not measure

These are single-run tool-call format and accuracy results. They do not rank general intelligence, reasoning, or coding ability. Some failures may come from llama.cpp's template handling, tool parser, or schema enforcement rather than the model itself.
