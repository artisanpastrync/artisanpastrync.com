import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/config/environment';
import type { Database } from '@/database.types';

/** Use this for dynamic server-side rendering. Has user, uses RLS */
export function createSupabaseServerClient() {
    const cookieStore = cookies();

    return createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
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

export const getSupabaseSessionServer = async () =>
    createSupabaseServerClient()
        .auth.getSession()
        .then((response) => response.data.session);

export const getSupabaseUserServer = async () =>
    createSupabaseServerClient()
        .auth.getUser()
        .then((response) => response.data.user);
