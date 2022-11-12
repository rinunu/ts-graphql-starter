import { ComponentMeta, Story } from '@storybook/react';
import { ComponentProps } from 'react';
import { SignInBox } from './sign-in-box';
import { titlePrefix } from '../../../../.storybook/docs';

export default {
  component: SignInBox,
  title: titlePrefix + 'SignInBox',
} as ComponentMeta<typeof SignInBox>;

const Template: Story<ComponentProps<typeof SignInBox>> = (args) => (
  <SignInBox />
);

export const Basic = Template.bind({});
