import { NextResponse } from 'next/server';

const locales = ['en'];
const defaultLocale = 'en';

export function middleware(request) {
  const { pathname } = request.nextUrl;
    // Only redirect if path is exactly '/' and not already at a locale
    if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }
  
    // If already at /en, do not redirect
    if (locales.some(loc => pathname.startsWith(`/${loc}`))) {
      return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
