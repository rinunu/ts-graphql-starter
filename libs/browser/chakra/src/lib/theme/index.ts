import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultSize,
} from '@chakra-ui/react';
import { Button } from './button';
import { global } from './global';

// font は _app.tsx にて設定している

export const theme = extendTheme(
  withDefaultColorScheme({
    colorScheme: 'orange',
  }),
  withDefaultSize({
    size: 'lg',
    components: ['Radio', 'Checkbox'],
  }),
  {
    styles: {
      global,
    },

    components: {
      Button,
    },
  }
);
