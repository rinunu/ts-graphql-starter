import { VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode[];
}

export function PostList({ children }: Props) {
  return <VStack alignItems="stretch">{children}</VStack>;
}
