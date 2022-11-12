// https://storybook.js.org/docs/react/configure/overview

import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import * as React from 'react';
import { RecoilRoot } from 'recoil';
import { MyChakraProvider } from '@browser/chakra';
import { addDecorator } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { urqlDecorator } from '../src/lib/urql-decorator';

const queryClient = new QueryClient();

addDecorator(urqlDecorator);

/**
 * https://qiita.com/feb19/items/4a245aedf5cbad207d82
 */
const customViewports = {
  iPhone11: {
    name: 'iPhone 11 Pro Max/XS Max/11/XR',
    styles: {
      width: '414px',
      height: '896px',
    },
  },
  iPhoneX: {
    name: 'iPhone 11 Pro/XS/X',
    styles: {
      width: '375px',
      height: '812px',
    },
  },
  iPhone8: {
    name: 'iPhone 6/7/8',
    styles: {
      width: '375px',
      height: '667px',
    },
  },
  Pixel3XL: {
    name: 'Pixel 3XL/3a',
    styles: {
      width: '411px',
      height: '846px',
    },
  },
};

/**
 * @type {import('@storybook/csf').Parameters}
 */
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },

  // controls: {
  //   matchers: {
  //     color: /(background|color)$/i,
  //     date: /Date$/,
  //   },
  // },

  /**
   * パディングが入るのを抑制
   */
  // layout: 'fullscreen',
  viewport: {
    viewports: {
      ...customViewports,
      ...MINIMAL_VIEWPORTS,
    },
    // defaultViewport: 'iPhone8',
  },

  chromatic: { disableSnapshot: true },

  // chromatic: {
  //   viewports: [375],
  // },
};

export const decorators = [
  (Story) => (
    <MyChakraProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Story />
        </RecoilRoot>
      </QueryClientProvider>
    </MyChakraProvider>
  ),
];
