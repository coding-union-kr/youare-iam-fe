import { useLogout } from '@/hooks/queries/useLogout';
import LogoutIcon from '../icons/ LogoutIcon';
import Button from '../ui/Button';

export default function LogoutButton() {
  const { mutate: logout } = useLogout();

  return (
    <Button
      onClick={() => logout()}
      variant="ghost"
      size="wide"
      className="text-gray-dark"
    >
      로그아웃
      <LogoutIcon className="inline w-6 ml-1" />
    </Button>
  );
}
