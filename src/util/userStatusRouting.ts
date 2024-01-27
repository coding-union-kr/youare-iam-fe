import axios from 'axios';
import { parseCookies } from 'nookies';
import { ACCESS_TOKEN } from '@/constants/auth';
import { setAuthHeader } from '@/libs/token';
import { GetServerSidePropsContext } from 'next';

type DisallowMap = {
  [key: string]: RegExp[];
};

export const userStatusRouting = async (context: GetServerSidePropsContext) => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 15000,
  });

  const cookies = parseCookies(context);
  const accessToken = cookies[ACCESS_TOKEN];
  setAuthHeader(instance, accessToken);

  const res = await instance.get(`/api/v1/members/user-status`);

  const path = context.resolvedUrl;
  const disallowMap: DisallowMap = {
    COUPLE_USER: [
      /\/onboarding/,
      /\/invite\/[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}/,
    ],
    COUPLE_WAITING_USER: [
      /\/onboarding/,
      /\/invite\/[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}/,
      /\/answer\/\d*/,
    ],
    NON_COUPLE_USER: [/\/answer\/\d*/, /\/questions/], // checkAuth 때문에 동작하지 않음
  };

  if (
    disallowMap[res.data.userStatus]?.some((regex: RegExp) => regex.test(path))
  ) {
    console.log('리다이렉트5');
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
};
