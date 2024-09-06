import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/config/environment';
import type { Database } from '@/database.types';

/** Use this for the NextJS Middleware. Manages cookies for use by server client. */
export async function createSupabaseMiddlewareClient(req: NextRequest, res: NextResponse) {
    return createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
        cookies: {
            getAll() {
                return req.cookies.getAll();
            },
            setAll(cookiesToSet) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                cookiesToSet.forEach(({ name, value, options }) => req.cookies.set(name, value));
                res = NextResponse.next({
                    request: req,
                });
                cookiesToSet.forEach(({ name, value, options }) =>
                    res?.cookies.set(name, value, options)
                );
            },
        },
    });
}
