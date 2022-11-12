import { ReactElement, ReactNode } from 'react';
import { useFirebaseAuthInitialized, useFirebaseUser } from './firebase-auth';

interface Props {
  loading: ReactElement;
  notSignedIn: ReactElement;
  children: ReactNode;
}

/**
 * 認証が必要な場面で使用する
 *
 * いろんな場面で利用する場合、このコンポーネントを利用して、アプリ独自のコンポーネントを作成することを想定している
 */
export function RequireIdaasAuth({
  loading,
  notSignedIn,
  children,
}: Props): JSX.Element {
  const authInitialized = useFirebaseAuthInitialized();
  const user = useFirebaseUser();

  if (!authInitialized) {
    return loading;
  }

  if (!user) {
    return notSignedIn;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
