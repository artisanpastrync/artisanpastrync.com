'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/config/environment';

export async function createSupabaseServerClient() {
    const cookieStore = cookies();

    return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    );
                } catch {
                    // The `setAll` method was called from a Server Component.
                    // This can be ignored if you have middleware refreshing
                    // user sessions.
                }
            },
        },
    });
}

export async function createSupabaseMiddlewareClient(req: NextRequest, res: NextResponse) {
    return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
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

export const getSupabaseSessionServer = async () =>
    (await createSupabaseServerClient()).auth
        .getSession()
        .then((response) => response.data.session)
        .catch((_error) => null);

export const getSupabaseUserServer = async () =>
    (await createSupabaseServerClient()).auth
        .getUser()
        .then((response) => response.data.user)
        .catch((_error) => null);
