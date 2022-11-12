import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PageLoading } from './page-loading/page-loading';

interface Props {
  children: ReactNode;
}

/**
 * https://github.com/vercel/next.js/discussions/11484
 */
export function RouterReady({ children }: Props) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setReady(true);
    }
  }, [router.isReady]);

  if (!ready) {
    return <PageLoading />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
