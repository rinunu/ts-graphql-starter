import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export async function signInWithGoogle() {
  const auth = getAuth();
  console.log(auth);
  const provider = new GoogleAuthProvider();

  await signInWithPopup(auth, provider);
}
