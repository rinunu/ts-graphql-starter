import { Operation } from 'urql';

interface Success {
  data: unknown;
}

interface Errors {
  errors: unknown;
}

type Result = Success | Errors;

export function urqlParameters(f: (op: Operation) => Result) {
  return {
    urql: f,
  };
}
