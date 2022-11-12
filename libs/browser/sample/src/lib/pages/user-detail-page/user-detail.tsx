import { FragmentType, gql, useFragment } from '@shared/graphql-codegen';
import { Box, VStack } from '@chakra-ui/react';
import { Post } from '../../components/post';
import { PostList } from '../../components/post-list';

const fragment = gql(/* GraphQL */ `
  fragment UserDetail on User {
    id
    name
    posts {
      id
      ...Post
    }
  }
`);

interface Props {
  user: FragmentType<typeof fragment>;
}

export function UserDetail(props: Props) {
  const user = useFragment(fragment, props.user);

  return (
    <VStack alignItems="stretch">
      <Box>{user.name}</Box>
      <Box>
        <PostList>
          {user.posts.map((it) => (
            <Post key={it.id} post={it} />
          ))}
        </PostList>
      </Box>
    </VStack>
  );
}
