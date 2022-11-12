'use client';

import { Provider } from 'urql';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, AuthUser } from '@browser/auth';
import * as Sentry from '@sentry/nextjs';
import { ReactNode } from 'react';
import { initializeFirebase } from '../initialize/initialize-firebase';
import { MyChakraProvider } from '@browser/chakra';
import { createUrqlClient } from '@browser/urql';

const queryClient = new QueryClient();
const urqlClient = createUrqlClient();

initializeFirebase();

async function onUserIdentified(me: AuthUser | null) {
  console.log('onUserIdentified', me);
  if (me) {
    Sentry.setUser({
      id: me.id,
      username: me.name,
    });
  } else {
    Sentry.setUser(null);
  }
}

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <MyChakraProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Provider value={urqlClient}>
            <AuthProvider onUserIdentified={onUserIdentified}>
              {children}
            </AuthProvider>
          </Provider>
        </RecoilRoot>
      </QueryClientProvider>
    </MyChakraProvider>
  );
}
