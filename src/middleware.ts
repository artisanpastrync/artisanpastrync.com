import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';

const PROTECTED_ROUTES = ['/admin', '/checkout', '/profile'];

const NEXT_COOKIE = 'nextPath';

export default auth(async function middleware(request, _context) {
    const response = NextResponse.next({ request });
    const user = request.auth?.user;
    const { pathname, searchParams } = request.nextUrl;

    if (!user && PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
        const nextParams = searchParams.toString();

        const nextPath = pathname + (nextParams ? `?${nextParams}` : '');

        const loginUrl = new URL('/login', request.url);

        const redirectResponse = NextResponse.redirect(loginUrl);

        redirectResponse.cookies.set(NEXT_COOKIE, nextPath, {
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
        });

        return redirectResponse;
    }

    // Redirect to next path and delete cookie if authenticated
    const nextPath = request.cookies.get(NEXT_COOKIE)?.value;
    if (user && nextPath) {
        const nextUrl = new URL(nextPath, request.url);
        const nextResponse = NextResponse.redirect(nextUrl);
        nextResponse.cookies.delete(NEXT_COOKIE);
        return nextResponse;
    }

    return response;
});

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
