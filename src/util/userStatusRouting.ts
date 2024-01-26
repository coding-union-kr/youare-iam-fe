import axios from 'axios';
import { parseCookies } from 'nookies';
import { ACCESS_TOKEN } from '@/constants/auth';
import { setAuthHeader } from '@/libs/token';
import { GetServerSidePropsContext } from 'next';

export const userStatusRouting = async (context: GetServerSidePropsContext) => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 15000,
  });

  const cookies = parseCookies(context);
  const accessToken = cookies[ACCESS_TOKEN];
  setAuthHeader(instance, accessToken);

  const res = await instance.get(`/api/v1/members/user-status`);

  const unauthorizedPagesForCoupleUser = ['/onboarding', '/invite'];
  const unauthorizedPagesForCoupleWaitingUser = [
    '/onboarding',
    '/invite',
    '/answer',
  ];
  const unauthorizedPagesForNonCoupleUser = [
    '/answer',
    '/questions',
    // '/chatroom', -> chatroom에 들어가면 onboarding으로 리다이렉트되기 때문에 넣으면 안됨
  ];

  const path = context.resolvedUrl;

  switch (res.data.userStatus) {
    case 'COUPLE_USER':
      if (unauthorizedPagesForCoupleUser.includes(path)) {
        return {
          redirect: {
            permanent: false,
            destination: '/',
          },
        };
      }
      break;
    case 'COUPLE_WAITING_USER':
      if (unauthorizedPagesForCoupleWaitingUser.includes(path)) {
        return {
          redirect: {
            permanent: false,
            destination: '/',
          },
        };
      }
      break;
    case 'NON_COUPLE_USER':
      if (unauthorizedPagesForNonCoupleUser.includes(path)) {
        return {
          redirect: {
            permanent: false,
            destination: '/',
          },
        };
      }

      break;
  }
};
