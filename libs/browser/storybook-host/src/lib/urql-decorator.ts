import { addDecorator } from '@storybook/react';
import { createClient, Provider } from 'urql';
import { devtoolsExchange } from '@urql/devtools';
import { getStorybookExchange } from 'fixed-urql-storybook-addon';
import { createElement } from 'react';
import { errorExchange } from '@browser/urql';

export const urqlDecorator: Parameters<typeof addDecorator>[0] = (
  Story,
  context
) => {
  const client = createClient({
    url: 'storehhh',
    suspense: true,
    exchanges: [devtoolsExchange, errorExchange, getStorybookExchange(context)],
  });

  return createElement(Provider, { value: client }, Story(context));
};
