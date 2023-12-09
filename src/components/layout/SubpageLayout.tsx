import type { ReactNode } from 'react';
import BottomNavigation from './BottomNavigation';

type SubpageLayout = {
  children: ReactNode;
};

export default function SubpageLayout({ children }: SubpageLayout) {
  return (
    <main className="px-3 pt-24">
      {children}
      <BottomNavigation />
    </main>
  );
}
