import Image from 'next/image';
import BasicLayout from '@/components/layout/BasicLayout';
import type { NextPageWithLayout } from '@/types/page';
import ListItem from '@/components/ui/ListItem';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { KAKAO_AUTH_URL } from '@/constants/kakaoAuth';
import { useRouter } from 'next/router';
import type { GetServerSidePropsContext } from 'next';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorageKeys';

type Data = {
  data: {
    question: string;
    invitedPersonName: string;
  };
  id: string;
};

const Page: NextPageWithLayout<Data> = ({ data, id }) => {
  const [text, setText] = useState('');
  const router = useRouter();

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmitAnswer = () => {
    const isLogin = window.localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.TEXT_AREA_CONTENT, text);
    if (!isLogin) {
      window.location.href = KAKAO_AUTH_URL;
    } else {
      const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const path = '/api/v1/members/invite/accept';
      const apiEndpoint = `${baseURL}${path}`;
      const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
      // console.log(accessToken);
      axios
        .post(
          apiEndpoint,
          {
            linkKey: id,
            answer: text,
          },
          {
            headers: {
              Authorization: accessToken,
            },
          }
        )
        .then(function (response) {
          console.log(response.data.selectedQuestionId);
          router.push('/chatroom');
        });
    }
  };

  useEffect(() => {
    const storedText = window.localStorage.getItem(
      LOCAL_STORAGE_KEYS.TEXT_AREA_CONTENT
    );
    if (storedText) {
      setText(storedText);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.PREV_URL, router.asPath);
  }, [router.asPath]);

  return (
    <>
      <div className="mt-10 flex flex-col items-center">
        <div>{data?.invitedPersonName} 님이</div>
        <div>초대 링크를 보냈어요!</div>
      </div>
      <ListItem
        question={data?.question}
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
      <TextArea
        value={text}
        onChange={handleChangeText}
        className="min-h-[15rem]"
      />
      <Button
        onClick={handleSubmitAnswer}
        variant="primary"
        size="wide"
        className="mt-5"
      >
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  console.log('context:  ', context);
  const { id } = context.query;
  console.log('id:  ', id);
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const path = '/api/v1/members/invite/info/';
  const apiEndpoint = `${baseURL}${path}${id}`;

  try {
    const response = await axios.get(apiEndpoint, {
      params: {
        linkKey: id,
      },
    });

    const data = response.data;
    return { props: { data, id } };
  } catch (error) {
    console.error('Error fetching data:', (error as Error).message);
    return { props: { invitedName: [] } };
  }
};

export default Page;
