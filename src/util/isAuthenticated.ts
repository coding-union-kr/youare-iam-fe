import { ACCESS_TOKEN } from '@/constants/cookie';
import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

export function isAuthenticated(context: GetServerSidePropsContext) {
  const cookies = parseCookies(context);
  const accessToken = cookies[ACCESS_TOKEN];

  return {
    authStatus: !!accessToken,
  };
}
