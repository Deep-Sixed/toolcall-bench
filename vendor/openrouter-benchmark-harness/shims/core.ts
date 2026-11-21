// Minimal local replacement for the harness types the vendored scorer imports.
export const ScoreValue = {
  Correct: "C",
  Incorrect: "I",
  Skipped: "S",
} as const;

export type ScoreValue = (typeof ScoreValue)[keyof typeof ScoreValue];

export interface Score {
  readonly value: ScoreValue;
  readonly answer: string | null;
  readonly explanation: string;
}

export interface ToolCall {
  readonly id: string;
  readonly type: "function";
  readonly function: { readonly name: string; readonly arguments: string };
}

export interface TaskState {
  readonly sample: { readonly id: string };
  readonly output?: {
    readonly message: { readonly toolCalls?: readonly ToolCall[] };
  };
}

export type ScorerService = (state: TaskState) => () => Score;
