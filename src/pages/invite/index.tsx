import type { NextPageWithLayout } from '@/types/page';
import BasicLayout from '@/components/layout/BasicLayout';
import Image from 'next/image';
import ListItem from '@/components/ui/ListItem';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import axios from 'axios';

const question = '같이 해보고 싶은 버킷리스트가 있나요?';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const path = '/api/v1/members/invite/info';
const apiEndpoint = `${baseURL}${path}`;

type InviteInfo = {
  selectedQuestionId: number;
  invitedPersonName: string;
};

const Page: NextPageWithLayout<InviteInfo> = ({ inviteInfo }) => {
  console.log('inviteInfo: ', inviteInfo);
  return (
    <>
      <div className="mt-10">
        <div>{inviteInfo?.invitedPersonName}이</div>
        <div>초대 링크를 보냈어요!</div>
      </div>
      {/* <ListItem question={question} className="mt-5 bg-white" /> */}
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

export const getStaticProps = async () => {
  try {
    const response = await axios.get(apiEndpoint);
    const inviteInfo = response.data;
    console.log('inviteInfo: ', inviteInfo);
    return { props: { inviteInfo } };
  } catch (error) {
    console.error('Error fetching data:', (error as Error).message);
    return { props: { inviteInfo: [] } };
  }
};

export default Page;
