import { AuthProvider as Impl } from 'react-firebase-auth';
import { ReactNode, useCallback } from 'react';
import { useAppSignIn, UseAppSignInParams } from '../hooks/use-app-sign-in';

interface Props extends UseAppSignInParams {
  children: ReactNode;
}

export function AuthProvider({ children, onUserIdentified }: Props) {
  const appSignIn = useAppSignIn({ onUserIdentified });

  const onSignedOut = useCallback(async () => {
    await onUserIdentified(null);
  }, [onUserIdentified]);

  return (
    <Impl appSignIn={appSignIn} onSignedOut={onSignedOut}>
      {children}
    </Impl>
  );
}
