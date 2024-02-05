import { createServerSideInstance, fetchData } from '@/libs/serversideApi';
import { ACCESS_TOKEN } from '@/constants/auth';
import { parseCookies } from 'nookies';
import { QueryClient } from '@tanstack/react-query';
import type { GetServerSidePropsContext } from 'next';

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
        queryKey: ['user-status'],
        queryFn: () => fetchData(api, '/api/v1/members/user-status'),
      });
      if (
        data.userStatus === 'COUPLE_USER' ||
        data.userStatus === 'COUPLE_WAITING_USER'
      ) {
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
