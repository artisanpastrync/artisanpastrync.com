'use client';

import { createBrowserClient } from '@supabase/ssr';
import { Session, User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/config/environment';

export function createSupabaseBrowserClient() {
    return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export function useSupabaseUser() {
    const [user, setUser] = useState<User | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(false);
        const supabase = createSupabaseBrowserClient();

        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            setUser(user);
        };

        getUser().finally(() => setLoaded(true));
    }, []);

    return { loaded, user };
}

// https://github.com/SamuelSackey/nextjs-supabase-example/blob/main/src/lib/supabase/use-session.ts
export function useSupabaseSession() {
    const [session, setSession] = useState<Session | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(false);
        const supabase = createSupabaseBrowserClient();

        const getSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            setSession(session);
        };

        getSession().finally(() => setLoaded(true));
    }, []);

    return { session, loaded };
}
