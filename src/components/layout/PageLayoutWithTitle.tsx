import type { ReactNode } from 'react';
import PageTitle from './PageTitle';

type PageLayoutProps = {
  title: string;
  children: ReactNode;
};

export default function PageLayoutWithTitle({
  title,
  children,
}: PageLayoutProps) {
  return (
    <main className="h-screen px-3 pt-24 pb-6">
      <PageTitle title={title} />
      {children}
    </main>
  );
}
