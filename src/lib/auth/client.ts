'use client';

import { Provider } from '@supabase/supabase-js';

import { AuthReturn } from '@/lib/auth/server';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

/** gets `next` path from query parameters. */
export const getNextPath = () => {
    'use client';
    const { search } = window.location;
    const searchParams = new URLSearchParams(search);
    const nextPath = searchParams.get('next') || '';
    return nextPath;
};

/** only use in callbacks due to use of `window`.
 * @param {string} [route=/auth/callback] - Path to redirect to. must start with a `/`. Defaults to `/auth/callback`
 * @returns {string} Auth Callback with `next` query parameter.
 */
export const getCallbackUrl = (route: string = '/auth/callback'): string => {
    'use client';
    const { origin } = window.location;
    const nextPath = getNextPath();
    const redirectUrl = `${origin}${route}${nextPath ? `?next=${nextPath}` : ''}`;
    return redirectUrl;
};

// https://github.com/vercel/nextjs-subscription-payments/blob/main/utils/auth-helpers/client.ts
export async function handleAuthRequest(
    formData: FormData,
    requestFunc: (formData: FormData) => Promise<AuthReturn>
    // e: React.FormEvent<HTMLFormElement>,
    // router: ReturnType<typeof useRouter> | null = null
) {
    const callbackUrl = getCallbackUrl();
    // append the callback url to the formData
    formData.append('callback', callbackUrl);

    return await requestFunc(formData);
}

// todo: make consistent with other methods
export async function signInWithOAuth(e: React.FormEvent<HTMLFormElement>) {
    // Prevent default form submission refresh
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const provider = String(formData.get('provider')).trim() as Provider;

    // Create client-side supabase client and call signInWithOAuth
    const supabase = createSupabaseBrowserClient();

    const redirectTo = getCallbackUrl();

    await supabase.auth.signInWithOAuth({ provider, options: { redirectTo } });
}
