import Image from 'next/image';
import BasicLayout from '@/components/layout/BasicLayout';
import type { NextPageWithLayout } from '@/types/page';
import ListItem from '@/components/ui/ListItem';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import axios from 'axios';
import { get } from 'http';
import { useEffect } from 'react';

const question = '같이 해보고 싶은 버킷리스트가 있나요?';

const config = {
  linkKey: process.env.NEXT_PUBLIC_LINK_KEY,
};

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const path = '/api/v1/members/invite/info/';
const apiEndpoint = `${baseURL}${path}${config.linkKey}`;

type InvitedName = {
  invitedName: string;
};

const Page: NextPageWithLayout<InvitedName> = ({ invitedName }) => {
  return (
    <>
      <div className="mt-10 flex flex-col items-center">
        <div>{invitedName} 님이</div>
        <div>초대 링크를 보냈어요!</div>
      </div>
      <ListItem
        question={question}
        className="mt-5 bg-white flex justify-center items-center text-lg"
      />
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
    const response = await axios.get(apiEndpoint, {
      params: {
        linkKey: config.linkKey,
      },
    });

    const invitedName = response.data.invitedPersonName;
    return { props: { invitedName } };
  } catch (error) {
    console.error('Error fetching data:', (error as Error).message);
    return { props: { invitedName: [] } };
  }
};

export default Page;
