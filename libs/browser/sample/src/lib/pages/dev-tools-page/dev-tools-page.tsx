import { Box, VStack } from '@chakra-ui/react';
import { Layout } from '@browser/common-components';

interface Props {
  dummy?: string;
}

export function DevToolsPage(props: Props) {
  return (
    <Layout>
      <VStack alignItems="stretch">
        <Box>dev!</Box>
      </VStack>
    </Layout>
  );
}
