import type { NextPageWithLayout } from '@/types/page';
import MainLayout from '@/components/layout/MainLayout';

const Page: NextPageWithLayout = () => {
  return <section>status</section>;
};

Page.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Page;
