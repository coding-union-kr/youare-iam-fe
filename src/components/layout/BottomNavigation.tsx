import Link from 'next/link';
import { useRouter } from 'next/router';
import BoardIcon from '../icons/BoardIcon';
import ChatRoomIcon from '../icons/ChatRoomIcon';
import SelectIcon from '../icons/SelectIcon';
import { isSelected } from '@/util/route';

const NAV_ITEMS = [
  { href: '/chatroom', Icon: ChatRoomIcon, label: '대화상세' },
  { href: '/questions', Icon: SelectIcon, label: '질문선택' },
  { href: '/status', Icon: BoardIcon, label: '질문현황' },
];

export default function BottomNavigation() {
  const router = useRouter();
  return (
    <nav className="btm-nav btm-nav-lg max-w-[512px] mx-auto">
      {NAV_ITEMS.map(({ href, Icon, label }) => (
        <Link key={href} href={href}>
          <Icon color={isSelected(router.pathname, href)} />
          <span className="text-xs">{label}</span>
        </Link>
      ))}
    </nav>
  );
}
