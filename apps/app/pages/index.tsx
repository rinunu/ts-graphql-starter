import { Layout } from '@browser/common-components';
import { RequireAuth } from '@browser/auth';
import { Box } from '@chakra-ui/react';

export default function NextIndexPage() {
  return (
    <RequireAuth>
      <Layout>
        <Box />
      </Layout>
    </RequireAuth>
  );
}
