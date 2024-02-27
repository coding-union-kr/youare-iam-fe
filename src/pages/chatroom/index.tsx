import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import type { NextPageWithLayout } from '@/types/page';
import MainLayout from '@/components/layout/MainLayout';
import Modal from '@/components/chatroom/Modal';
import { checkAuth } from '@/util/checkAuth';
import { disallowAccess } from '@/util/disallowAccess';
import { createServerSideInstance, fetchData } from '@/libs/serversideApi';
import type { UserData } from '@/types/api';
import ShareInviteLink from '@/components/onboarding/ShareInviteLink';
import ChatList from '@/components/chatroom/ChatList';
import SEO from '@/components/SEO/SEO';

type ModalInfo = {
  actionText: string;
  cancelText: string;
  bodyText: string;
  handleAction: () => void;
};

const Page: NextPageWithLayout<UserData> = (userData) => {
  const { userStatus, linkKey } = userData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    actionText: '',
    cancelText: '',
    bodyText: '',
    handleAction: () => {},
  });

  return (
    <>
      <SEO title="대화 상세" />
      <div>
        {/* 모달이 열리면 보일 부분 */}
        {isModalOpen && (
          <Modal
            modalInfo={modalInfo}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        )}
        {userStatus === 'COUPLE_USER' && (
          <ChatList
            setModalInfo={setModalInfo}
            setIsModalOpen={setIsModalOpen}
          />
        )}

        {userStatus === 'COUPLE_WAITING_USER' && (
          <ShareInviteLink linkKey={linkKey} />
        )}
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const authCheck = await checkAuth(context);
  if (authCheck) {
    return authCheck;
  }

  const api = createServerSideInstance(context);

  const getUserData = async () => {
    const data = await fetchData<UserData>(api, `/api/v1/members/user-status`);
    return data;
  };

  const redirection = await disallowAccess(context);

  if (redirection) {
    return redirection;
  }

  try {
    const userData = await getUserData();

    if (userData.userStatus === 'NON_COUPLE_USER') {
      return {
        redirect: {
          destination: '/onboarding',
          permanent: false,
        },
      };
    }

    return { props: userData };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}
export default Page;
