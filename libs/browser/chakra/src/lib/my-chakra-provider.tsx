import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { theme } from './theme';

interface Props {
  children: ReactNode;
}

export function MyChakraProvider({ children }: Props) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
