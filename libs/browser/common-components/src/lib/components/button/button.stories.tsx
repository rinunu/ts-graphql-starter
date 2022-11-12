import { ComponentMeta, Story } from '@storybook/react';
import { Button } from './button';
import { ComponentProps } from 'react';
import { titlePrefix } from '../../../../.storybook/docs';
import { HStack, Text, VStack } from '@chakra-ui/react';

export default {
  component: Button,
  title: titlePrefix + 'Button',
} as ComponentMeta<typeof Button>;

const Template: Story<ComponentProps<typeof Button>> = (args) => (
  <VStack>
    <HStack>
      <Button variant="solid">ボタン</Button>
      <Button variant="quiet">ボタン</Button>
    </HStack>

    <Text>Size: xs</Text>
    <HStack>
      <Button variant="solid" size="xs">
        ボタン
      </Button>
      <Button variant="quiet" size="xs">
        ボタン
      </Button>
    </HStack>

    <Text>isDisabled</Text>
    <HStack>
      <Button variant="solid" isDisabled>
        ボタン
      </Button>
      <Button variant="quiet" isDisabled>
        ボタン
      </Button>
    </HStack>

    <Text>isLoading</Text>
    <HStack>
      <Button variant="solid" isLoading>
        ボタン
      </Button>
      <Button variant="quiet" isLoading>
        ボタン
      </Button>
    </HStack>
  </VStack>
);

export const Basic = Template.bind({});
