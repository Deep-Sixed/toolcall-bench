// Minimal local replacement for the one Effect helper the vendored scorer imports.
export function sync<T>(evaluate: () => T): () => T {
  return evaluate;
}
