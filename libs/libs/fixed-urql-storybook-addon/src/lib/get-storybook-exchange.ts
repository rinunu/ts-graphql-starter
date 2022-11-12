import { Exchange, makeResult } from '@urql/core';
import { pipe, map, mergeMap, fromPromise, fromValue } from 'wonka';

/**
 * https://github.com/FormidableLabs/urql/blob/main/packages/storybook-addon/src/exchange.ts
 */
export const getStorybookExchange =
  <T extends { parameters: any }>(context: T): Exchange =>
  () =>
  (op) =>
    pipe(
      op,
      map((operation) => [operation, context.parameters.urql(operation)]),
      mergeMap(([operation, result]) =>
        'then' in result
          ? fromPromise(result.then((r: any) => makeResult(operation, r)))
          : fromValue(makeResult(operation, result))
      )
    );
