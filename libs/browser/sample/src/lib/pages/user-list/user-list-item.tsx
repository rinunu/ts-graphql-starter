import { FragmentType, gql, useFragment } from '@shared/graphql-codegen';
import { Link } from '@browser/common-components';
import { Box } from '@chakra-ui/react';
import { sampleUserDetailRoute } from '@browser/route';

const fragment = gql(/* GraphQL */ `
  fragment UserListItem on User {
    id
    name
    posts {
      id
      content
    }
  }
`);

interface Props {
  user: FragmentType<typeof fragment>;
}

export function UserListItem(props: Props) {
  const user = useFragment(fragment, props.user);
  return (
    <Link href={sampleUserDetailRoute(user.id)} key={user.id}>
      <Box bg="gray.100" p={5}>
        {user.name} ({user.posts.length})
      </Box>
    </Link>
  );
}
