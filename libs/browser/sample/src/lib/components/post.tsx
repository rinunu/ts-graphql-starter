import { FragmentType, gql, useFragment } from '@shared/graphql-codegen';
import { Box, LinkBox, VStack } from '@chakra-ui/react';
import { DateTime, Link } from '@browser/common-components';
import { sampleUserDetailRoute } from '@browser/route';

const fragment = gql(/* GraphQL */ `
  fragment Post on Post {
    id
    content
    createdAt
    author {
      id
      name
    }
  }
`);

interface Props {
  post: FragmentType<typeof fragment>;
}

export function Post(props: Props) {
  const post = useFragment(fragment, props.post);
  return (
    <LinkBox key={post.id} p={5} border="1px solid" borderColor="gray.200">
      <VStack alignItems="flex-start">
        <Box>{post.content}</Box>
        <Box bg="orange.100" p={1}>
          <Link href={sampleUserDetailRoute(post.author.id)}>
            <Box>{post.author.name}</Box>
          </Link>
        </Box>
        <Box>
          <DateTime value={post.createdAt} />
        </Box>
      </VStack>
    </LinkBox>
  );
}
