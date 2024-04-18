import type { GetServerSidePropsContext } from 'next';
import Cookies from 'js-cookie';
import { USER_STATUS } from '@/constants/cookie';
import { UserStatus } from '@/types/api';

export const revalidateUserStatusCookie = (
  userStatus: UserStatus,
  context?: GetServerSidePropsContext
) => {
  if (typeof window !== 'undefined') {
    Cookies.set(USER_STATUS, userStatus, {
      path: '/',
      secure: true,
    });
    return;
  }

  if (context && context.res) {
    context.res.setHeader(
      'Set-Cookie',
      `${USER_STATUS}=${userStatus}; Path=/; Secure;`
    );
    return;
  }
};
