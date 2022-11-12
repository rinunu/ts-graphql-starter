import { AuthConfig } from '@urql/exchange-auth';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat';
import { makeOperation } from 'urql';

interface AuthState {
  tokenResult: firebase.auth.IdTokenResult;
}

type MyAuthConfig = AuthConfig<AuthState>;

const getAppAuth: MyAuthConfig['getAuth'] = async () => {
  const auth = getAuth();

  const tokenResult = await auth.currentUser?.getIdTokenResult();
  console.log('urql getAuth', tokenResult?.token ? 'has token' : 'no token');

  return tokenResult ? { tokenResult } : null;
};

const willAuthError: MyAuthConfig['willAuthError'] = ({ authState }) => {
  const expirationTime = authState?.tokenResult.expirationTime;
  if (expirationTime) {
    const expirationDate = new Date(expirationTime);
    console.log('urql willAuthError expirationDate: ', expirationDate);

    const expirationDateWithBuffer = new Date(
      expirationDate.getTime() + 5 * 60 * 1000
    );

    return expirationDateWithBuffer < new Date();
  } else {
    console.log('urql willAuthError');
  }

  return !authState || !authState.tokenResult.token;
};

const addAuthToOperation: MyAuthConfig['addAuthToOperation'] = ({
  authState,
  operation,
}) => {
  if (!authState) {
    return operation;
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${authState.tokenResult.token}`,
      },
    },
  });
};

export function createUrqlFirebaseAuthConfig(): MyAuthConfig {
  return {
    getAuth: getAppAuth,
    willAuthError,
    addAuthToOperation,
  };
}
