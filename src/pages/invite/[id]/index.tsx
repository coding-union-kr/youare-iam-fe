import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import type { GetServerSidePropsContext } from 'next';
import { useQueryClient } from '@tanstack/react-query';
import BasicLayout from '@/components/layout/BasicLayout';
import type { NextPageWithLayout } from '@/types/page';
import ListItem from '@/components/ui/ListItem';
import { KAKAO_AUTH_URL } from '@/constants/kakaoAuth';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorageKeys';
import usePostInviteAnswer from '@/hooks/queries/usePostInviteAnswer';
import { get } from '@/libs/clientSideApi';
import useAuth from '@/hooks/auth/useAuth';
import { invitePageAccess } from '@/util/invitePageAccess';
import { queryKeys } from '@/constants/queryKeys';
import SEO from '@/components/SEO/SEO';
import Form from '@/components/ui/Form';
import useInput from '@/hooks/common/useInput';
import { COUPLE_USER } from '@/constants/userStatus';
import { revalidateUserStatusCookie } from '@/util/revalidateUserStautCookie';

type InviteData = {
  data: {
    question: string;
    invitedPersonName: string;
  };
  id: string;
};

const Page: NextPageWithLayout<InviteData> = ({ data, id }) => {
  const [text, onChange, error, setText] = useInput('');
  const router = useRouter();
  const { mutate: postInviteAnswer } = usePostInviteAnswer();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.TEXT_AREA_CONTENT, text);

    if (!!error) {
      return;
    }

    if (!isAuthenticated) {
      window.location.href = KAKAO_AUTH_URL;
      window.localStorage.setItem(LOCAL_STORAGE_KEYS.PREV_URL, router.asPath);
    } else {
      postInviteAnswer(
        { linkKey: id, answer: text },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.letters });
            queryClient.invalidateQueries({ queryKey: queryKeys.userStatus });
            window.localStorage.removeItem(
              LOCAL_STORAGE_KEYS.TEXT_AREA_CONTENT
            );
            revalidateUserStatusCookie(COUPLE_USER);
            router.push('/chatroom');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SEO
        title={`${data.invitedPersonName}님의 초대 페이지`}
        description={`${data.question} - ${data.invitedPersonName}님이 보낸 질문에 답변해보세요!`}
      />
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
      <Form
        inputValue={text}
        onChange={onChange}
        errorMessage={error}
        handleSubmit={handleSubmitAnswer}
        isLoading={false}
        textAreaSize="min-h-[15rem]"
      />
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return (
    <BasicLayout className="bg-[#F7CBC3] justify-center pb-10">
      {page}
    </BasicLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;

  const checkAccess = await invitePageAccess(context);
  if (checkAccess) {
    return checkAccess;
  }

  try {
    const response = await get(`/api/v1/members/invite/info/${id}`);
    const data = response.data;
    return { props: { data, id } };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {},
    };
  }
};

export default Page;
