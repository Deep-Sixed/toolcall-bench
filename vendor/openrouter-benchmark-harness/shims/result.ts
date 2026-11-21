// Minimal local replacement for the Result helpers the vendored scorer imports.
export type Success<T> = { readonly _tag: "Success"; readonly success: T };
export type Failure<E> = { readonly _tag: "Failure"; readonly failure: E };
export type Result<T, E> = Success<T> | Failure<E>;

export function succeed<T>(success: T): Success<T> {
  return { _tag: "Success", success };
}

export function fail<E>(failure: E): Failure<E> {
  return { _tag: "Failure", failure };
}

function attempt<T>(evaluate: () => T): Result<T, unknown> {
  try {
    return succeed(evaluate());
  } catch (error) {
    return fail(error);
  }
}

export { attempt as try };

export function isSuccess<T, E>(result: Result<T, E>): result is Success<T> {
  return result._tag === "Success";
}

export function isFailure<T, E>(result: Result<T, E>): result is Failure<E> {
  return result._tag === "Failure";
}
