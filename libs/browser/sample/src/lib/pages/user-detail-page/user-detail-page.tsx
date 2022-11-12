import { gql } from '@shared/graphql-codegen';
import { useQuery } from 'urql';
import invariant from 'invariant';
import { UserDetail } from './user-detail';

const gqlQuery = gql(/* GraphQL */ `
  query UserDetailPage($id: ID!) {
    user(id: $id) {
      ...UserDetail
    }
  }
`);

interface Props {
  userId: string;
}

export function UserDetailPage({ userId }: Props) {
  const [{ data }] = useQuery({
    query: gqlQuery,
    variables: {
      id: userId,
    },
  });
  invariant(data, 'data should be defined');

  return <UserDetail user={data.user} />;
}
