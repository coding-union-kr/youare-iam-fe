import SEO from '@/components/SEO/SEO';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/router';

const Custom500 = () => {
  const router = useRouter();
  return (
    <>
      <SEO />
      <section>
        <div className="flex flex-col items-center justify-between h-screen py-20 text-center">
          <div className="mb-4 text-2xl font-neo text-gray-dark">
            앗, 오류가 발생했어요!
          </div>
          <div>
            <div className="mb-4 text-4xl font-neo text-primary">
              500 Server Error
            </div>
            <div className="mb-4 text-lg font-neo">
              현재 서비스에 접속할 수 없습니다.
            </div>
          </div>
          <Button onClick={() => router.reload()} variant="primary" size="wide">
            새로고침하기
          </Button>
        </div>
      </section>
    </>
  );
};

export default Custom500;
