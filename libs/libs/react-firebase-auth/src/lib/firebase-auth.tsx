/**
 * 前提
 *
 * - setupFirebaseAuth は SSR の邪魔をしないこと
 *   つまり、初期化されていなくても、 render は継続すること
 *
 * - useUser を使うコンポーネントは CSR される
 * - useUser は状態が変わると re-render すること
 */

import React, { ReactNode, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import firebase from 'firebase/compat';

/**
 * 認証において、ユーザーの有無が確定しているかどうか
 *
 * 起動直後などは、どちらでもないようなケースがあり、その場合は false となる
 */
const initializedAtom = atom({
  key: 'firebase-auth-initialized',
  default: false,
});

/**
 * 設定されるのは app も含めたログイン処理が完了後
 */
const fbUserAtom = atom<User | null>({
  key: 'firebase-user',
  default: null,
  dangerouslyAllowMutability: true,
});

interface UseSetupFirebaseAuthParams {
  onSignedOut?: () => Promise<void>;
  appSignIn?: () => Promise<void>;
}

type State = 'signedOut' | 'signingIn' | 'signedIn';

const stateAtom = atom<State>({
  key: 'auth-state',
  default: 'signedOut',
});

/**
 * firebase auth の初期化を行う
 */
function useSetupFirebaseAuth({
  onSignedOut,
  appSignIn,
}: UseSetupFirebaseAuthParams) {
  const setInitialized = useSetRecoilState(initializedAtom);
  const setFbUser = useSetRecoilState(fbUserAtom);
  const setState = useSetRecoilState(stateAtom);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setState('signingIn');
        console.log('useSetupFirebaseAuth', 'sign in post process : start');
        if (appSignIn) {
          console.log('app sign in : start');
          await appSignIn();
          console.log('app sign in : done');
        }
        console.log('useSetupFirebaseAuth', 'sign in post process : done');
        setState('signedIn');
        setFbUser(user);
      } else {
        setFbUser(null);
        onSignedOut && (await onSignedOut());
        console.log('useSetupFirebaseAuth', 'signed out');
        setState('signedOut');
      }
      setInitialized(true);
    });
    return () => {
      unsubscribe();
    };
  }, [onSignedOut, setInitialized, setFbUser, appSignIn, setState]);

  return;
}

interface Props {
  appSignIn?: () => Promise<void>;
  onSignedOut?: () => Promise<void>;
  children: ReactNode;
}

/**
 * firebase の初期化は別途行っておくこと
 */
export function AuthProvider({
  children,
  appSignIn,
  onSignedOut,
}: Props): JSX.Element {
  useSetupFirebaseAuth({
    appSignIn,
    onSignedOut,
  });
  return <>{children}</>;
}

/**
 * firebase auth の初期化が完了しているかどうかを確認する
 * 初期化が終わるまで、 [useFirebaseUser] 等は使用しない方が良い
 */
export function useFirebaseAuthInitialized(): boolean {
  return useRecoilValue(initializedAtom);
}

/**
 * 状態が変化すると re-render される
 *
 * 初期化完了前に呼び出すと null を返す。
 * ゆえに null を返したからといって、ログイン処理をしてはならない。
 * なぜなら、ログインは終わっているが、初期化が完了していないケースがあるため。
 *
 * この処理が user を返す場合、 app のログインも完了している
 */
export function useFirebaseUser(): User | null {
  return useRecoilValue(fbUserAtom);
}

/**
 * 認証されていない場合は null
 */
export async function getToken(): Promise<string | null> {
  const currentUser = getAuth().currentUser;
  if (!currentUser) {
    return null;
  }
  return await currentUser.getIdToken(false);
}

export function useAuthState(): State {
  return useRecoilValue(stateAtom);
}

export function useSetAuthState() {
  return useSetRecoilState(stateAtom);
}

export async function signOut() {
  const auth = getAuth();
  await auth.signOut();
}

// eslint-disable-next-line
export function isFirebaseError(e?: any | null): e is firebase.FirebaseError {
  return e?.name === 'FirebaseError';
}
