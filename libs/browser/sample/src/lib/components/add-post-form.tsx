import { HStack, Input } from '@chakra-ui/react';
import { gql } from '@shared/graphql-codegen';
import { useMutation } from 'urql';
import { useState } from 'react';
import { Button, useMutationError } from '@browser/common-components';

const mutation = gql(/* GraphQL */ `
  mutation AddPostForm($content: String!) {
    addPost(input: { content: $content }) {
      id
      author {
        id
      }
    }
  }
`);

export function AddPostForm() {
  const [{ fetching, error }, mutate] = useMutation(mutation);
  const [content, setContent] = useState('');
  useMutationError({ error });

  return (
    <HStack>
      <Input value={content} onChange={(e) => setContent(e.target.value)} />
      <Button
        variant="solid"
        onClick={() =>
          mutate({
            content,
          })
        }
        isLoading={fetching}
      >
        Post
      </Button>
    </HStack>
  );
}
