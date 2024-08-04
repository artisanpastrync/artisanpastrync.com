import { NextResponse, type NextRequest } from 'next/server';

import { createSupabaseMiddlewareClient } from '@/lib/supabase/server';

const PROTECTED_ROUTES = ['/admin'];

export default async function middleware(request: NextRequest) {
    const response = NextResponse.next({ request });
    const { pathname, searchParams } = request.nextUrl;

    const supabase = await createSupabaseMiddlewareClient(request, response);
    // refreshing the auth token
    const user = await supabase.auth.getUser().then((res) => res.data?.user);

    if (!user && PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
        // const nextPath = encodeURIComponent(pathname + '?' + searchParams.toString());
        const nextParams = searchParams.toString();
        // append ?{nextParams} if it exists
        const nextPath = pathname + (nextParams ? `?${nextParams}` : '');
        // append nextPath if it exists
        const loginUrl = new URL('/login' + (nextPath ? `?next=${nextPath}` : ''), request.url);
        // nextPath handled by auth callback redirectTo
        return NextResponse.redirect(loginUrl);
    }

    // Not necessary. Handled by the signin callbacks.
    // const nextPath = searchParams.get('next');
    // if (user && nextPath) {
    //     return NextResponse.redirect(new URL(decodeURIComponent(nextPath), request.url));
    // }

    return response;
}

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
