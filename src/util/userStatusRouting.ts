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

  const inviteRegex =
    /^\/invite\/[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/;
  const answerRegex = /^\/answer\/\d*$/;

  const unauthorizedPagesForCoupleUser = ['/onboarding', '/invite/[id]'];
  const unauthorizedPagesForCoupleWaitingUser = [
    '/onboarding',
    '/invite/[id]',
    '/answer/[id]',
  ];
  const unauthorizedPagesForNonCoupleUser = [
    '/answer/[id]',
    '/questions',
    // '/chatroom', -> chatroom에 들어가면 onboarding으로 리다이렉트되기 때문에 넣으면 안됨
  ];

  const path = context.resolvedUrl;

  switch (res.data.userStatus) {
    case 'COUPLE_USER':
      if (
        unauthorizedPagesForCoupleUser.includes(path) ||
        inviteRegex.test(path)
      ) {
        return {
          redirect: {
            permanent: false,
            destination: '/',
          },
        };
      }
      break;
    case 'COUPLE_WAITING_USER':
      if (
        unauthorizedPagesForCoupleWaitingUser.includes(path) ||
        inviteRegex.test(path) ||
        answerRegex.test(path)
      ) {
        return {
          redirect: {
            permanent: false,
            destination: '/',
          },
        };
      }
      break;
    case 'NON_COUPLE_USER':
      if (
        unauthorizedPagesForNonCoupleUser.includes(path) ||
        answerRegex.test(path)
      ) {
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
