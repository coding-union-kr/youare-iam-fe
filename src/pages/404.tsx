import SEO from '@/components/SEO/SEO';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <>
      <SEO />
      <section>
        <div className="flex flex-col items-center justify-between h-screen py-20">
          <div className="mb-4 text-2xl font-neo text-gray-dark">
            앗, 오류가 발생했어요!
          </div>
          <div>
            <div className="mb-4 text-4xl font-neo text-primary">
              404 Page Not Found
            </div>
            <div className="mb-4 text-lg font-neo">
              원하시는 페이지를 찾을 수 없습니다.
            </div>
          </div>
          <Link href="/" className="flex items-center justify-center w-full">
            <Button variant="primary" size="wide">
              홈으로 돌아가기
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Custom404;
