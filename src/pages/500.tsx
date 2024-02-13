import Button from '@/components/ui/Button';
import { useRouter } from 'next/router';

const Custom500 = () => {
  const router = useRouter();
  return (
    <section>
      <div className="h-screen flex flex-col items-center py-20 justify-between text-center">
        <div className="font-neo text-2xl mb-4 text-gray-dark">
          앗, 오류가 발생했어요!
        </div>
        <div>
          <div className="font-neo text-4xl mb-4 text-primary">
            500 Server Error
          </div>
          <div className="font-neo text-lg mb-4">
            현재 서비스에 접속할 수 없습니다.
          </div>
        </div>
        <Button onClick={() => router.reload()} variant="primary" size="wide">
          새로고침하기
        </Button>
      </div>
    </section>
  );
};

export default Custom500;
