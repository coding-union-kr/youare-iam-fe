import { useRouter } from 'next/router';
import Button from './Button';

export default function StartServiceButton() {
  const router = useRouter();
  const handelClick = () => {
    router.push('/chatroom');
  };

  return (
    <Button onClick={handelClick} size="wide" variant="primary">
      서비스 시작하기
    </Button>
  );
}
