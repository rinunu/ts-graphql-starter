import { HStack, StackDivider } from '@chakra-ui/react';
import { Link } from './link';
import {
  sampleDevToolsPageRoute,
  sampleNoAuthRoute,
  samplePostListPageRoute,
} from '@browser/route';

export function Menu() {
  return (
    <HStack divider={<StackDivider borderColor="gray.200" />}>
      <Link href={sampleNoAuthRoute()}>認証なし</Link>
      <Link href={samplePostListPageRoute()}>Posts</Link>
      <Link href={sampleDevToolsPageRoute()}>Dev Tools</Link>
    </HStack>
  );
}
