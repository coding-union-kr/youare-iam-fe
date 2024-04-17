import { ACCESS_TOKEN, USER_STATUS } from '@/constants/cookie';
import { COUPLE_WAITING_USER, NON_COUPLE_USER } from '@/constants/userStatus';
import { getUserStatus } from '@/hooks/queries/useUserStatus';
import { createServerSideInstance } from '@/libs/serversideApi';
import { removeServersideAccessToken } from '@/libs/token';
import type { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

export const checkAuthAndRedirect = async (
  context: GetServerSidePropsContext
) => {
  const api = createServerSideInstance(context);

  const path = context.resolvedUrl;
  const cookies = parseCookies(context);
  const accessToken = cookies[ACCESS_TOKEN];
  let userStatus = cookies[USER_STATUS];

  //checkAuth
  if (!accessToken) {
    return '/';
  }

  // getUserStatus
  if (!userStatus) {
    try {
      const data = await getUserStatus(api);

      userStatus = data.userStatus;

      context.res.setHeader(
        'Set-Cookie',
        `${USER_STATUS}=${userStatus}; Path=/; Secure; `
      );
    } catch (error) {
      console.error(error);
      removeServersideAccessToken(context);
      return '/';
    }
  }

  //redirect
  if (userStatus === NON_COUPLE_USER) {
    return '/onboarding';
  }

  if (path.includes('/onboarding') && userStatus !== NON_COUPLE_USER) {
    return '/chatroom';
  }

  if (path.includes('/answer') && userStatus === COUPLE_WAITING_USER) {
    return '/chatroom';
  }

  if (path.includes('/my-info') && userStatus === COUPLE_WAITING_USER) {
    return '/chatroom';
  }

  return null;
};
