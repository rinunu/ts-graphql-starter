import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
} from 'urql';
import { devtoolsExchange } from '@urql/devtools';
import { authExchange } from '@urql/exchange-auth';
import { createUrqlFirebaseAuthConfig } from 'urql-firebase-auth';
import { errorExchange } from './error-exchange';

export function createUrqlClient() {
  return createClient({
    // TODO
    url: 'http://localhost:3333/graphql',
    suspense: true,
    // TODO
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange,
      errorExchange,
      authExchange(createUrqlFirebaseAuthConfig()),
      fetchExchange,
    ],
  });
}
