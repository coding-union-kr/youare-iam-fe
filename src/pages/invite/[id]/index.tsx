import Image from 'next/image';
import BasicLayout from '@/components/layout/BasicLayout';
import type { NextPageWithLayout } from '@/types/page';
import ListItem from '@/components/ui/ListItem';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import { useState, useEffect } from 'react';
import { KAKAO_AUTH_URL } from '@/constants/kakaoAuth';
import { useRouter } from 'next/router';
import type { GetServerSidePropsContext } from 'next';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorageKeys';
import usePostInviteAnswer from '@/hooks/queries/usePostInviteAnswer';
import { useQueryClient } from '@tanstack/react-query';
import { get } from '@/libs/api';
import useAuth from '@/hooks/auth/useAuth';

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
  const { mutate: postInviteAnswer } = usePostInviteAnswer();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmitAnswer = () => {
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.TEXT_AREA_CONTENT, text);

    if (!isAuthenticated) {
      window.location.href = KAKAO_AUTH_URL;
      window.localStorage.setItem(LOCAL_STORAGE_KEYS.PREV_URL, router.asPath);
    } else {
      postInviteAnswer(
        { linkKey: id, answer: text },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['letters'] });
            window.localStorage.removeItem(
              LOCAL_STORAGE_KEYS.TEXT_AREA_CONTENT
            );
            router.push('/chatroom');
          },
          onError: (error) => {
            throw error;
          },
        }
      );
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

  return (
    <>
      <div className="flex flex-col items-center mt-10">
        <div>{data?.invitedPersonName} 님이</div>
        <div>초대 링크를 보냈어요!</div>
      </div>
      <ListItem
        question={data?.question}
        className="flex items-center justify-center mt-5 text-lg bg-white"
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
  const { id } = context.query;

  try {
    const response = await get(`/api/v1/members/invite/info/${id}`);
    const data = response.data;
    return { props: { data, id } };
  } catch (error) {
    console.error('Error fetching data:', (error as Error).message);
    return { props: { invitedName: [] } };
  }
};

export default Page;
