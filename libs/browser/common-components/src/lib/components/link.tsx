import Impl from 'next/link';
import { ReactNode } from 'react';

interface Props {
  href: string;
  children: ReactNode;
}

export function Link({ href, children }: Props) {
  return <Impl href={href}>{children}</Impl>;
}
