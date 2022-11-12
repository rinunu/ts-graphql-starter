import { FragmentType, gql, useFragment } from '@shared/graphql-codegen';
import { UserListItem } from './user-list-item';
import { VStack } from '@chakra-ui/react';
import { Layout } from '@browser/common-components';

const fragment = gql(/* GraphQL */ `
  fragment UserList on Query {
    users {
      id
      ...UserListItem
    }
  }
`);

interface Props {
  users: FragmentType<typeof fragment>;
}

export function UserList(props: Props) {
  const users = useFragment(fragment, props.users).users;

  return (
    <Layout>
      <VStack alignItems="stretch">
        {users.map((it) => (
          <UserListItem user={it} key={it.id} />
        ))}
      </VStack>
    </Layout>
  );
}
