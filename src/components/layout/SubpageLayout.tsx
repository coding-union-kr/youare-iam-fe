import type { ReactNode } from 'react';
import PageTitle from './PageTitle';
import BottomNavigation from './BottomNavigation';

type PageLayoutProps = {
  title: string;
  children: ReactNode;
};

export default function SubpageLayout({ title, children }: PageLayoutProps) {
  return (
    <main className="h-screen px-3 pt-24 pb-[6rem]">
      <PageTitle title={title} />
      {children}
      <BottomNavigation />
    </main>
  );
}
