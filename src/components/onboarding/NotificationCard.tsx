import type { ReactNode } from 'react';
import Image from 'next/image';

type Props = {
  children: ReactNode;
};

export default function NotificationCard({ children }: Props) {
  return (
    <article className="flex flex-col items-center p-8 mx-8 rounded-lg shadow-md bg-opacity-60 bg-secondary">
      <Image
        src="/logo-removebg.png"
        priority
        alt="service-logo"
        width="100"
        height="100"
        className="mb-5"
      />
      {children}
    </article>
  );
}
