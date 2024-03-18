import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import type { NextPageWithLayout } from '@/types/page';
import BasicLayout from '@/components/layout/BasicLayout';
import KakaoLoginButton from '@/components/ui/KakaoLoginButton';
import StartServiceButton from '@/components/ui/ StartServiceButton';
import SEO from '@/components/SEO/SEO';
import { isAuthenticated } from '@/util/isAuthenticated';

const Home: NextPageWithLayout<{ isAuthenticated: boolean }> = ({
  isAuthenticated,
}) => {
  return (
    <>
      <SEO />
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
      {isAuthenticated ? <StartServiceButton /> : <KakaoLoginButton />}
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return (
    <BasicLayout className="bg-[#F7CBC3] justify-center">{page}</BasicLayout>
  );
};

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { authStatus } = isAuthenticated(context);

  return {
    props: {
      isAuthenticated: authStatus,
    },
  };
}

export default Home;
