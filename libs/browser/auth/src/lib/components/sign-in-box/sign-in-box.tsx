import React from 'react';
import { signInWithGoogle } from 'react-firebase-auth';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@browser/common-components';
import { Box } from '@chakra-ui/react';

export function SignInBox() {
  const m = useMutation(async () => await signInWithGoogle());

  return (
    <Box m={2}>
      <Button
        variant="solid"
        onClick={() => m.mutate()}
        isLoading={m.isLoading}
      >
        Google
      </Button>
    </Box>
  );
}
