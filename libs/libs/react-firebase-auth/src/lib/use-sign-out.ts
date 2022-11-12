import { useMutation } from '@tanstack/react-query';
import { signOut } from './firebase-auth';

export function useSignOut() {
  const { isLoading, isError, mutate } = useMutation(() => signOut());

  return {
    signOut: mutate,
    isLoading,
    isError,
  };
}
