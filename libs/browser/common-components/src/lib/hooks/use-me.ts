import { gql } from '@shared/graphql-codegen';
import { useQuery } from 'urql';
import invariant from 'invariant';

const query = gql(/* GraphQL */ `
  query UseMe {
    me {
      id
      name
    }
  }
`);

export function useMe() {
  const [{ data }] = useQuery({ query });
  invariant(data, '');
  return data.me;
}
