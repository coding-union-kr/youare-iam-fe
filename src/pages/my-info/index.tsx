import type { NextPageWithLayout } from '@/types/page';
import MainLayout from '@/components/layout/MainLayout';
import { getMyInfo } from '@/hooks/queries/useMyInfo';
import { GetServerSidePropsContext } from 'next';
import { createServerSideInstance } from '@/libs/serversideApi';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { MyInfo } from '@/types/api';

type Props = {
  myInfo: MyInfo;
};

const Page: NextPageWithLayout<Props> = ({ myInfo }) => {
  return <section></section>;
};

Page.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const api = createServerSideInstance(context);
  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: queryKeys.myInfo,
    queryFn: () => getMyInfo(api),
  });

  return {
    props: {
      myInfo: data,
      initialState: dehydrate(queryClient),
    },
  };
}

export default Page;
