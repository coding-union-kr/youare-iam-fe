import type { NextPageWithLayout } from '@/types/page';

import PageLayoutWithTitle from '@/components/layout/PageLayoutWithTitle';
import ListItem from '@/components/ui/ListItem';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';

const Page: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <ListItem question={question} />
      <TextArea value="" onChange={() => {}} />
      <Button variant="primary" size="wide">
        등록하기
      </Button>
    </div>
  );
};

const question = '상대방의 사랑스러운 점을 한가지 말해 주세요.';

Page.getLayout = function getLayout(page) {
  return (
    <>
      <PageLayoutWithTitle title="답변 등록하기">{page}</PageLayoutWithTitle>
    </>
  );
};

export default Page;

// mutate -> queryKey
