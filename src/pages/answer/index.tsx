import type { NextPageWithLayout } from '@/types/page';

import PageLayoutWithTitle from '@/components/layout/PageLayoutWithTitle';
import ListItem from '@/components/ui/ListItem';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';

const Page: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <ListItem question={question} />
      <TextArea value="" onChange={() => {}} />
      <Button variant="primary" size="wide">
        등록하기
      </Button>
    </div>
  );
};

const question = '같이 해보고 싶은 버킷리스트가 있나요?';

Page.getLayout = function getLayout(page) {
  return (
    <>
      <PageLayoutWithTitle title="답변 등록하기">{page}</PageLayoutWithTitle>
    </>
  );
};

export default Page;
