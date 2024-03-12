import type { ReactNode } from 'react';
import BottomNavigation from './BottomNavigation';

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="px-3 pt-3 pb-[5rem]">
      {children}
      <BottomNavigation />
    </main>
  );
}
