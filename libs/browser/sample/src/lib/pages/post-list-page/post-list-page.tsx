import { gql, useFragment } from '@shared/graphql-codegen';
import { Post } from '../../components/post';
import { VStack } from '@chakra-ui/react';
import { AddPostForm } from '../../components/add-post-form';
import { PostList } from '../../components/post-list';
import { useQuery } from 'urql';
import invariant from 'invariant';

const fragment = gql(/* GraphQL */ `
  fragment PostList on Post {
    id
    ...Post
  }
`);

const query = gql(/* GraphQL */ `
  query Index {
    posts {
      ...PostList
    }
  }
`);

export function PostListPage() {
  const [{ data }] = useQuery({ query });
  invariant(data, 'data should be defined');

  const posts = useFragment(fragment, data.posts);

  return (
    <VStack alignItems="stretch">
      <AddPostForm />
      <PostList>
        {posts.map((it) => (
          <Post post={it} key={it.id} />
        ))}
      </PostList>
    </VStack>
  );
}
