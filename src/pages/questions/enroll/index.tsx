import type { NextPageWithLayout } from '@/types/page';
import SubpageLayout from '@/components/layout/SubpageLayout';
import PageTitle from '@/components/layout/PageTitle';

const Page: NextPageWithLayout = () => {
  return <section>questionList</section>;
};

Page.getLayout = function getLayout(page) {
  return (
    <SubpageLayout>
      <PageTitle title="질문 등록하기" />
      {page}
    </SubpageLayout>
  );
};

export default Page;
