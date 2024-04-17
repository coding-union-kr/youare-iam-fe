import type { NextPageWithLayout } from '@/types/page';
import MainLayout from '@/components/layout/MainLayout';
import { getMyInfo } from '@/hooks/queries/useMyInfo';
import { GetServerSidePropsContext } from 'next';
import { createServerSideInstance } from '@/libs/serversideApi';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { MyInfo } from '@/types/api';
import StatisticsCard from '@/components/myInfo/StatisticsCard';
import UnansweredQuestionsList from '@/components/myInfo/UnansweredQuestionsList';
import InfoTitle from '@/components/myInfo/InfoTitle';
import LogoutButton from '@/components/myInfo/LogoutButton';
import CopyMemberId from '@/components/myInfo/CopyMemberId';
import { checkAuthAndRedirect } from '@/util/checkAuthAndRedirect';

type Props = {
  myInfo: MyInfo;
};

const Page: NextPageWithLayout<Props> = ({ myInfo }) => {
  return (
    <section className="w-11/12 mx-auto">
      <InfoTitle>서비스 이용 통계</InfoTitle>
      <StatisticsCard
        periodOfUse={myInfo.periodOfUse}
        perfectAnswer={myInfo.perfectAnswer}
      />
      <InfoTitle>답변 대기 중인 질문</InfoTitle>
      <UnansweredQuestionsList questions={myInfo.waitingAnswerList} />
      <InfoTitle>계정 설정</InfoTitle>
      <CopyMemberId memberId={myInfo.memberId} />
      <LogoutButton />
    </section>
  );
};

Page.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const redirectPath = await checkAuthAndRedirect(context);

  if (redirectPath) {
    return {
      redirect: {
        destination: redirectPath,
        permanent: false,
      },
    };
  }
  const api = createServerSideInstance(context);
  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: queryKeys.myInfo,
    queryFn: () => getMyInfo(api),
  });

  console.log('my-info', data.memberId);

  return {
    props: {
      myInfo: data,
      initialState: dehydrate(queryClient),
    },
  };
}

export default Page;
