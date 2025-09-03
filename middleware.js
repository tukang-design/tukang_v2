import { NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';

const locales = ['en', 'ms'];
const defaultLocale = 'en';

function getLocale(request) {
  const acceptLang = request.headers.get('accept-language');
  if (!acceptLang) return defaultLocale;
  const languages = acceptLang.split(',').map(l => l.split(';')[0]);
  return match(languages, locales, defaultLocale);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
    // Only redirect if path is exactly '/' and not already at a locale
    if (pathname === '/') {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }
  
    // If already at /en or /ms, do not redirect
    if (locales.some(loc => pathname.startsWith(`/${loc}`))) {
      return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
