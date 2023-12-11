import type { NextPageWithLayout } from '@/types/page';
import BasicLayout from '@/components/layout/BasicLayout';
import KakaoLoginButton from '@/components/ui/KakaoLoginButton';
import Image from 'next/image';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <div className="h-[80%] flex flex-col justify-center">
        <h2 className="block mb-10 text-2xl font-bold text-center font-neo"></h2>
        <Image
          src="/logo.png"
          priority
          alt="service-logo"
          width="250"
          height="250"
        />
        <h1 className="block text-4xl font-extrabold text-center font-neo">
          너는, 나는
        </h1>
      </div>
      <KakaoLoginButton />
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return (
    <BasicLayout className="bg-[#F7CBC3] justify-center">{page}</BasicLayout>
  );
};

export default Home;
