import { ReactNode, Suspense } from 'react';
import { Box, HStack, Spacer, VStack } from '@chakra-ui/react';
import { MyHeaderInfo } from '../my-header-info';
import { Menu } from '../menu';
import { PartialLoading } from '../partial-loading/partial-loading';
import { PageLoading } from '../page-loading/page-loading';

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <Suspense fallback={<PageLoading />}>
      <VStack m={2} alignItems="stretch">
        <HStack justify="space-between" h="30px">
          <Spacer />
          <Suspense fallback={<div>...</div>}>
            <MyHeaderInfo />
          </Suspense>
        </HStack>

        <Menu />

        <Box>
          <Suspense fallback={<PartialLoading />}>{children}</Suspense>
        </Box>
      </VStack>
    </Suspense>
  );
}
