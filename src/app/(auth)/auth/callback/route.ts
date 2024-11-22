import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/lib/supabase/server';

// https://supabase.com/docs/guides/auth/social-login/auth-google
// The `/auth/callback` route is required for the server-side auth flow implemented
// by the `@supabase/ssr` package. It exchanges an auth code for the user's session.
export async function GET(request: Request) {
    const { origin, searchParams } = new URL(request.url);

    const code = searchParams.get('code');

    // if "next" is in param, use it in the redirect URL
    const next = searchParams.get('next') ?? '/';

    if (!code) return NextResponse.redirect(`${origin}/login?next=${next}&error=Missing auth code`);

    const supabase = createSupabaseServerClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) return NextResponse.redirect(`${origin}/login?next=${next}&error=${error.message}`);

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(`${origin}${next}`);
}
