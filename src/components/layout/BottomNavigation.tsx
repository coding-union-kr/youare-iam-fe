import { memo, type ComponentProps } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getNavItemStatus } from '@/util/route';
import BoardIcon from '../icons/BoardIcon';
import ChatRoomIcon from '../icons/ChatRoomIcon';
import SelectIcon from '../icons/SelectIcon';

export const navIconColors = {
  default: '#BDBDBD',
  selected: '#FF9081',
} as const;

export type NavIconProps = ComponentProps<'svg'> & {
  color: (typeof navIconColors)[keyof typeof navIconColors];
};

const NAV_ITEMS = [
  { href: '/chatroom', Icon: ChatRoomIcon, label: '대화상세' },
  { href: '/questions', Icon: SelectIcon, label: '질문선택' },
  // { href: '/status', Icon: BoardIcon, label: '질문현황' },
];

type NavItemProps = (typeof NAV_ITEMS)[number];

const NavItem = memo(({ href, Icon, label }: NavItemProps) => {
  const router = useRouter();
  const color = navIconColors[getNavItemStatus(router.pathname, href)];

  return (
    <Link href={href}>
      <Icon color={color} />
      <span className="text-xs">{label}</span>
    </Link>
  );
});
NavItem.displayName = 'NavItem';

export default function BottomNavigation() {
  return (
    <nav className="btm-nav btm-nav-lg max-w-[512px] mx-auto z-20">
      {NAV_ITEMS.map((navItem) => (
        <NavItem key={navItem.href} {...navItem} />
      ))}
    </nav>
  );
}
