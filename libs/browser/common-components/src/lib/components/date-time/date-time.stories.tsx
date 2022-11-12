import { ComponentMeta, Story } from '@storybook/react';
import { ComponentProps } from 'react';
import { DateTime } from './date-time';
import {
  defaultStorybookConfig,
  titlePrefix,
} from '../../../../.storybook/docs';

export default {
  ...defaultStorybookConfig,
  component: DateTime,
  title: titlePrefix + 'DateTime',
} as ComponentMeta<typeof DateTime>;

const Template: Story<ComponentProps<typeof DateTime>> = (args) => (
  <DateTime {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  value: '2022-12-01T12:23:34.000+09:00',
};
