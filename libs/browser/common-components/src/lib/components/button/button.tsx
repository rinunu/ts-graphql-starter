import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

interface Props {
  children: string;
  variant: 'solid' | 'quiet';
  size?: 'xs';
  onClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export function Button({ children, ...rest }: Props) {
  return <ChakraButton {...rest}>{children}</ChakraButton>;
}
