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
  console.log('res.data.userStatus: ', res.data.userStatus);

  console.log('path: ', path);
  // TODO: userStatus에 따라 라우팅 불가하게끔 해야 함
  switch (res.data.userStatus) {
    case 'COUPLE_USER':
      console.log('coupleuser 임');

      if (unauthorizedPagesForCoupleUser.includes(path)) {
        console.log('coupleuser 페이지 접근 불가 처리됨');
        return {
          redirect: {
            permanent: false,
            destination: '/',
          },
        };
      }
      break;
    case 'COUPLE_WAITING_USER':
      console.log('couplewaitinguser 임');
      if (unauthorizedPagesForCoupleWaitingUser.includes(path)) {
        console.log('couplewaitinguser 페이지 접근 불가 처리됨');
        return {
          redirect: {
            permanent: false,
            destination: '/',
          },
        };
      }
      break;
    case 'NON_COUPLE_USER':
      console.log('noncoupleuser 임');
      if (unauthorizedPagesForNonCoupleUser.includes(path)) {
        console.log('noncoupleuser 페이지 접근 불가 처리됨');
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
