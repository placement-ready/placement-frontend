import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard'];
const authRoutes = ['/auth/login', '/auth/signup', '/auth'];

function getSessionToken(request: NextRequest): string | undefined {
  const secureToken = request.cookies.get('__Secure-better-auth.session_token');
  if (secureToken?.value) return secureToken.value;

  const standardToken = request.cookies.get('better-auth.session_token');
  if (standardToken?.value) return standardToken.value;

  return undefined;
}

export function middleware(request: NextRequest) {
  const sessionToken = getSessionToken(request);
  const { pathname, searchParams } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/'),
  );

  if (isProtectedRoute && !sessionToken) {
    const loginUrl = new URL('/auth/login', request.url);
    if (pathname !== '/dashboard') {
      loginUrl.searchParams.set('redirect', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && sessionToken) {
    const redirectTo = searchParams.get('redirect') || '/dashboard';
    const safeRedirect = redirectTo.startsWith('/') ? redirectTo : '/dashboard';
    return NextResponse.redirect(new URL(safeRedirect, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};
