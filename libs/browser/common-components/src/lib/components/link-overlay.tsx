import NextLink from 'next/link';
import { ReactNode } from 'react';
import { LinkOverlay as LinkOverLayImpl } from '@chakra-ui/react';

interface Props {
  href: string;
  children: ReactNode;
}

export function LinkOverlay({ href, children }: Props) {
  return (
    <NextLink href={href} passHref>
      <LinkOverLayImpl>{children}</LinkOverLayImpl>
    </NextLink>
  );
}
