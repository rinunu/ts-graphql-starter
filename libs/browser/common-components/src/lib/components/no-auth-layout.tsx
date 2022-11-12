import { ReactNode, Suspense } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { Menu } from './menu';
import { PartialLoading } from './partial-loading/partial-loading';
import { PageLoading } from './page-loading/page-loading';

interface Props {
  children: ReactNode;
}

export function NoAuthLayout({ children }: Props) {
  return (
    <Suspense fallback={<PageLoading />}>
      <VStack m={2} alignItems="stretch">
        <Menu />

        <Box>
          <Suspense fallback={<PartialLoading />}>{children}</Suspense>
        </Box>
      </VStack>
    </Suspense>
  );
}
