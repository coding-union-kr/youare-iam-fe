import type { ReactNode } from 'react';

type BasicLayoutProps = {
  children: ReactNode;
  className?: string;
};

export default function BasicLayout({ children, className }: BasicLayoutProps) {
  return (
    <main className={`${className} flex flex-col items-center h-screen`}>
      {children}
    </main>
  );
}
