import { ComponentMeta, Story } from '@storybook/react';
import { ComponentProps } from 'react';
import { titlePrefix } from '../../../../.storybook/docs';
import { PostListPage } from './post-list-page';
import { makeErrors, makePost } from '@browser/fixtures';
import { userEvent, within, screen } from '@storybook/testing-library';
import '@urql/storybook-addon';
import { urqlParameters } from 'urql-storybook-helper';
import { expect } from '@storybook/jest';

export default {
  component: PostListPage,
  title: titlePrefix + 'PostListPage',
} as ComponentMeta<typeof PostListPage>;

const Template: Story<ComponentProps<typeof PostListPage>> = () => (
  <PostListPage />
);

export const Basic = Template.bind({});
Basic.parameters = {
  chromatic: { disableSnapshot: false },
};
Basic.parameters = {
  ...urqlParameters(() => ({
    data: {
      posts: [
        makePost(),
        makePost({
          content: 'コンテンツだよ！！',
        }),
      ],
    },
  })),
};

export const PostError = Template.bind({});
PostError.parameters = {
  ...urqlParameters((op) => {
    if (op.kind === 'mutation') {
      return makeErrors();
    } else {
      return {
        data: {
          posts: [makePost()],
        },
      };
    }
  }),
  chromatic: { disableSnapshot: false },
};

PostError.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByRole('textbox'), 'コンテンツだよ！！！');

  await userEvent.click(canvas.getByRole('button'));

  expect(await screen.findByText(/エラー/)).toBeTruthy();
};
