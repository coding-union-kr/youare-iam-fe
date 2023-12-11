import type { ReactNode } from 'react';

type BasicLayoutProps = {
  children: ReactNode;
};

export default function BasicLayout({ children }: BasicLayoutProps) {
  return <main className="p-6">{children}</main>;
}
