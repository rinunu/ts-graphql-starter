import { ComponentMeta, Story } from '@storybook/react';
import { ComponentProps } from 'react';
import { titlePrefix } from '../../../../.storybook/docs';
import { PageLoading } from './page-loading';

export default {
  component: PageLoading,
  title: titlePrefix + 'PageLoading',
} as ComponentMeta<typeof PageLoading>;

const Template: Story<ComponentProps<typeof PageLoading>> = () => (
  <PageLoading />
);

export const Basic = Template.bind({});
