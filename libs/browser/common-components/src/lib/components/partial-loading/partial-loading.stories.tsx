import { ComponentMeta, Story } from '@storybook/react';
import { ComponentProps } from 'react';
import { titlePrefix } from '../../../../.storybook/docs';
import { PartialLoading } from './partial-loading';
import { NoAuthLayout } from '../no-auth-layout';

export default {
  component: PartialLoading,
  title: titlePrefix + 'PartialLoading',
} as ComponentMeta<typeof PartialLoading>;

const Template: Story<ComponentProps<typeof PartialLoading>> = () => (
  <NoAuthLayout>
    <PartialLoading />
  </NoAuthLayout>
);

export const Basic = Template.bind({});
