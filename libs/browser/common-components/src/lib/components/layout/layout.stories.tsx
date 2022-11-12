import { ComponentMeta, Story } from '@storybook/react';
import { ComponentProps } from 'react';
import { titlePrefix } from '../../../../.storybook/docs';
import { Layout } from './layout';
import { Box } from '@chakra-ui/react';
import { makeUser } from '@browser/fixtures';

export default {
  component: Layout,
  title: titlePrefix + 'Layout',
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Layout>;

const Template: Story<ComponentProps<typeof Layout>> = (args) => (
  <Layout {...args}>
    <Box>Hello</Box>
  </Layout>
);

export const Basic = Template.bind({});
Basic.storyName = '認証済み';
Basic.parameters = {
  urql: () => ({
    data: {
      me: makeUser({
        name: 'me@example.com',
      }),
    },
  }),
};
