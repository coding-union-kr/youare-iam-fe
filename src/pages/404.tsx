import Button from '@/components/ui/Button';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <section>
      <div className="h-screen flex flex-col items-center py-20 justify-between">
        <div>
          <div className="font-neo text-4xl mb-4 text-primary">
            404 Page Not Found
          </div>
          <div className="font-neo text-lg mb-4">
            원하시는 페이지를 찾을 수 없습니다.
          </div>
        </div>
        <Link href="/" className="w-full flex items-center justify-center">
          <Button variant="primary" size="wide">
            홈으로 돌아가기
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Custom404;
