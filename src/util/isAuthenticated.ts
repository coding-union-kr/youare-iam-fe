import { ACCESS_TOKEN } from '@/constants/auth';
import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

export async function isAuthenticated(context: GetServerSidePropsContext) {
  const cookies = parseCookies(context);
  const accessToken = cookies[ACCESS_TOKEN];

  return {
    authStatus: !!accessToken,
  };
}
