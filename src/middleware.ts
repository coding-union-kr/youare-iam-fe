import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_TOKEN } from './constants/auth';

export function middleware(req: NextRequest, res: NextResponse) {
  // checkAuth
  const accessToken = req.cookies.get(ACCESS_TOKEN)?.value;
  if (!accessToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }
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
