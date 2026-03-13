// middleware.ts (at project root)
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const access = request.cookies.get('access_token')?.value;

  if (!access && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Optional: refresh logic here (but avoid heavy logic in middleware)
  // Better: refresh only when API call fails with 401 in your fetch wrapper

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/projects/:path*'], // protect these
};