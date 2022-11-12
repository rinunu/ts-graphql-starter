import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import * as Sentry from '@sentry/nextjs';

export function useMutationError({ error }: { error: unknown }) {
  const toast = useToast();
  useEffect(() => {
    if (error) {
      Sentry.captureException(error);

      toast({
        title: 'エラーが発生しました',
        description: '再度お試しください',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [error, toast]);
}
