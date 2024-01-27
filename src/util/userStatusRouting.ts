import axios from 'axios';
import { parseCookies } from 'nookies';
import { ACCESS_TOKEN } from '@/constants/auth';
import { setAuthHeader } from '@/libs/token';
import { GetServerSidePropsContext } from 'next';

type UserStatus = 'COUPLE_USER' | 'COUPLE_WAITING_USER' | 'NON_COUPLE_USER';

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

  const pathPatterns = {
    onboarding: /^\/onboarding$/,
    invite: /^\/invite\/[\da-z]{8}(-[\da-z]{4}){3}-[0-9a-z]{12}$/,
    answer: /^\/answer\/\d*$/,
    questions: /^\/questions$/,
  };

  const disallowedPaths: Record<UserStatus, RegExp[]> = {
    COUPLE_USER: [pathPatterns.onboarding, pathPatterns.invite],
    COUPLE_WAITING_USER: [
      pathPatterns.onboarding,
      pathPatterns.questions,
      pathPatterns.answer,
    ],
    NON_COUPLE_USER: [pathPatterns.questions, pathPatterns.answer], // checkAuth 때문에 동작하지 않음
  };

  const userStatus = res.data.userStatus as UserStatus;
  if (disallowedPaths[userStatus]?.some((pattern) => pattern.test(path))) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
};
