import { gql } from '@shared/graphql-codegen';
import { useClient } from 'urql';
import { useCallback } from 'react';
import invariant from 'invariant';
import { AuthUser } from '../auth-user';

const query = gql(/* GraphQL */ `
  query UseAppSignIn {
    me {
      id
      name
    }
  }
`);

export type OnUserIdentified = (me: AuthUser | null) => Promise<void>;

export interface UseAppSignInParams {
  /**
   * ユーザー情報が確定した際に呼び出される
   */
  onUserIdentified: OnUserIdentified;
}

export function useAppSignIn({ onUserIdentified }: UseAppSignInParams) {
  const client = useClient();

  return useCallback(async () => {
    const { error, data } = await client.query(query, {}).toPromise();
    if (error) {
      throw new Error('sign in error');
    }
    invariant(data, 'data is null');

    await onUserIdentified(data.me);
  }, [client, onUserIdentified]);
}
