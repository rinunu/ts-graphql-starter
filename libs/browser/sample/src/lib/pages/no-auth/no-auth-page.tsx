import { Box, VStack } from '@chakra-ui/react';

export function NoAuthPage() {
  return (
    <VStack alignItems="stretch">
      <Box>認証なしでアクセスできるページ</Box>
    </VStack>
  );
}
