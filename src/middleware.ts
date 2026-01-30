import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('hiremind_session_token');
  const { pathname } = req.nextUrl;

  if ((pathname === '/auth/login' || pathname === '/auth/signup') && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}
