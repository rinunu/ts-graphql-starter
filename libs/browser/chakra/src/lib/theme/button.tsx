import { ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
  baseStyle: {
    boxSizing: 'border-box',
  },

  sizes: {
    md: {
      fontSize: '19px',
      height: '40px',
    },
  },

  variants: {
    quiet: {
      bg: 'orange.50',
      fontWeight: 'bold',
      color: 'orange.500',
      _hover: {
        bg: 'orange.100',
      },
    },
  },
};
