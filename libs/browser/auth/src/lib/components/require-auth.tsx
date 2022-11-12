import { RequireIdaasAuth } from 'react-firebase-auth';
import { PageLoading } from '@browser/common-components';
import { ReactNode } from 'react';
import { SignInBox } from './sign-in-box/sign-in-box';

interface Props {
  children: ReactNode;
}

export function RequireAuth({ children }: Props): JSX.Element {
  return (
    <RequireIdaasAuth loading={<PageLoading />} notSignedIn={<SignInBox />}>
      {children}
    </RequireIdaasAuth>
  );
}

export default RequireAuth;
