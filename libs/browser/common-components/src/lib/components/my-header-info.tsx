import { Box, HStack } from '@chakra-ui/react';
import { useMe } from '../hooks/use-me';
import { useSignOut } from 'react-firebase-auth';
import { Button } from './button/button';

export function MyHeaderInfo() {
  const me = useMe();
  const { isLoading, signOut } = useSignOut();

  return (
    <HStack>
      <Box fontWeight="bold" color="orange.500">
        {me.name}
      </Box>
      <Box>
        <Button
          onClick={() => signOut()}
          size="xs"
          isLoading={isLoading}
          variant="quiet"
        >
          ログアウト
        </Button>
      </Box>
    </HStack>
  );
}
