import type { NextPageWithLayout } from '@/types/page';
import BasicLayout from '@/components/layout/BasicLayout';
import Image from 'next/image';
import ListItem from '@/components/ui/ListItem';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';

const question = '같이 해보고 싶은 버킷리스트가 있나요?';
const Page: NextPageWithLayout = () => {
  return (
    <>
      <div className="mt-10">
        <div>
          {'{'}memberName{'}'}이
        </div>
        <div>초대 링크를 보냈어요!</div>
      </div>
      <ListItem question={question} className="bg-white mt-5" />
      <Image
        src="/logo.png"
        priority
        alt="service-logo"
        width="100"
        height="100"
        style={{ margin: '1rem' }}
      />
      <div className="mb-5">
        <div>답변을 작성해 볼까요?</div>
      </div>
      <TextArea value="" onChange={() => {}} className="min-h-[15rem]" />
      <Button variant="primary" size="wide" className="mt-5">
        답변 등록
      </Button>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return (
    <BasicLayout className="bg-[#F7CBC3] justify-center">{page}</BasicLayout>
  );
};

export default Page;
