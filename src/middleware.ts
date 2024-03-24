import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_TOKEN, USER_STATUS } from './constants/cookie';

import { COUPLE_WAITING_USER, NON_COUPLE_USER } from './constants/userStatus';

export async function middleware(req: NextRequest, res: NextResponse) {
  // checkAuth
  const accessToken = req.cookies.get(ACCESS_TOKEN)?.value;
  if (!accessToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const response = NextResponse.next();

  // disallowAccess
  const path = req.nextUrl.pathname;
  const userStatus = req.cookies.get(USER_STATUS)?.value;

  if (!userStatus) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/user-status`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await res.json();

      response.cookies.set({
        name: USER_STATUS,
        value: data.userStatus,
        path: '/',
      });

      return response;
    } catch (error) {
      return response;
    }
  }

  if (path.startsWith('/chatroom') && userStatus === NON_COUPLE_USER) {
    return NextResponse.redirect(new URL('/onboarding', req.url));
  }

  if (path.startsWith('/onboarding') && userStatus !== NON_COUPLE_USER) {
    return NextResponse.redirect(new URL('/chatroom', req.url));
  }

  if (path.startsWith('/answer') && userStatus === COUPLE_WAITING_USER) {
    return NextResponse.redirect(new URL('/chatroom', req.url));
  }

  if (path.startsWith('/answer') && userStatus === NON_COUPLE_USER) {
    return NextResponse.redirect(new URL('/onboarding', req.url));
  }

  if (path.startsWith('/questions') && userStatus === NON_COUPLE_USER) {
    return NextResponse.redirect(new URL('/onboarding', req.url));
  }

  if (path.startsWith('/status') && userStatus === NON_COUPLE_USER) {
    return NextResponse.redirect(new URL('/onboarding', req.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/onboarding/:path*',
    '/chatroom/:path*',
    '/questions/:path*',
    '/answer/:path*',
    '/status/:path*',
  ],
};
