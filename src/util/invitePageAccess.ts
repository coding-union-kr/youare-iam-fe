import { createServerSideInstance, fetchData } from '@/libs/serversideApi';
import { ACCESS_TOKEN } from '@/constants/cookie';
import { parseCookies } from 'nookies';
import { QueryClient } from '@tanstack/react-query';
import type { GetServerSidePropsContext } from 'next';
import { queryKeys } from '@/constants/queryKeys';
import { getUserStatus } from '@/hooks/queries/useUserStatus';

type UserStatus = {
  userStatus: string;
  linkKey: string;
};

export const invitePageAccess = async (context: GetServerSidePropsContext) => {
  const api = createServerSideInstance(context);
  const queryClient = new QueryClient();

  const cookies = parseCookies(context);
  const accessToken = cookies[ACCESS_TOKEN];

  if (accessToken) {
    try {
      const data: UserStatus = await queryClient.fetchQuery({
        queryKey: queryKeys.userStatus,
        queryFn: () => getUserStatus(api),
      });
      if (data.userStatus === 'COUPLE_USER') {
        return {
          redirect: {
            permanent: false,
            destination: '/chatroom',
          },
          props: {},
        };
      }
    } catch (error) {
      throw error;
    }
  }
};
