import { ACCESS_TOKEN } from '@/constants/auth';
import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

export async function checkAuth(context: GetServerSidePropsContext) {
  const cookies = parseCookies(context);
  const accessToken = cookies[ACCESS_TOKEN];

  if (!accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return null;
}
