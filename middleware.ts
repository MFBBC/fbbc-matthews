import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AB_COOKIES } from './lib/flags';

/** Assign sticky 50/50 A/B cookies on first visit. */
export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  Object.values(AB_COOKIES).forEach((name) => {
    if (!req.cookies.get(name)) {
      res.cookies.set(name, Math.random() < 0.5 ? 'a' : 'b', {
        maxAge: 60 * 60 * 24 * 90, // 90 days
        path: '/',
        sameSite: 'lax',
      });
    }
  });
  return res;
}

export const config = {
  matcher: ['/((?!_next|api|images|favicon.ico|robots.txt|sitemap.xml).*)'],
};
