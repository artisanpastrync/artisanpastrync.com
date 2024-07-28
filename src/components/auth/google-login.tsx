'use client';
import { Button, ButtonProps } from '@/components/Button';
import { GoogleIcon } from '@/components/icons';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export const getRedirectToUrl = () => {
    'use client';
    const { origin, search } = window.location;
    const searchParams = new URLSearchParams(search);
    const nextPath = encodeURIComponent(searchParams.get('next') || '');
    const redirectTo = `${origin}/auth/callback${nextPath ? `?next=${nextPath}` : ''}`;
    return redirectTo;
};

export async function signInWithGoogle(redirectTo: string) {
    const supabase = createSupabaseBrowserClient();
    const result = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo },
    });
    return result;
}

export interface GoogleLoginButtonProps extends Omit<ButtonProps, 'children'> {
    onError?: (error: unknown) => Promise<void>;
}

export function GoogleLoginButton({ onError, ...props }: GoogleLoginButtonProps) {
    const handleLogin = async () => {
        const redirectTo = getRedirectToUrl();
        const { error } = await signInWithGoogle(redirectTo);
        if (error) return onError?.(error);
    };

    return (
        <Button onClick={handleLogin} className='flex flex-row gap-2' {...props}>
            <GoogleIcon className='fill-primary-900' />
            Continue with Google
        </Button>
    );
}
