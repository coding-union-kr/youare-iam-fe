import type { ReactNode } from 'react';

type BasicLayoutProps = {
  children: ReactNode;
};

export default function SubpageLayout({ children }: BasicLayoutProps) {
  return <main className="p-6">{children}</main>;
}
