import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_TOKEN, USER_STATUS } from './constants/cookie';

import { COUPLE_WAITING_USER, NON_COUPLE_USER } from './constants/userStatus';

export function middleware(req: NextRequest, res: NextResponse) {
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
    // Todo: userStatus가 없으면 서버에서 받아오기
    return response;
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

// cache? - token처럼 userStatus도 캐싱해야할까? - cookie
// 저장 시점 - userStatus 받아올때마다 새로운 값을 저장하기 (로그인, 초대 수락, 초대링크 생성, chatroom 페이지 렌더링)
// 저장 위치 - 쿠키

// 저장된 값을 조회 - middleware에서 조회
// 저장된 값이 없으면 - userStatus 받아오기
// 저장된 값이 있으면 - userStatus 반환
