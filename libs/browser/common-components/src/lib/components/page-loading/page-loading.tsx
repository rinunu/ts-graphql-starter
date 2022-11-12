import { Box, Center, Spinner, VStack } from '@chakra-ui/react';

export function PageLoading() {
  return (
    <Center height="100vh">
      <VStack>
        <Spinner />
        <Box>Page loading...</Box>
      </VStack>
    </Center>
  );
}
