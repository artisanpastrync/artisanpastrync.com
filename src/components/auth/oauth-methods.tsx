'use client';

import { FormEvent } from 'react';

import { OAuthButton, OAuthButtonProps } from '@/components/auth/oauth-button';
import { GoogleIcon } from '@/components/icons';
import { signInWithOAuth } from '@/lib/auth/client';
import { cn } from '@/lib/utils';

export interface OAuthSignInProps {
    providers?: OAuthButtonProps[];
    className?: string;
}

const defaultProviders: OAuthButtonProps[] = [
    {
        name: 'google',
        displayName: 'Continue with Google',
        icon: <GoogleIcon />,
    },
];

export function OAuthSignInMethods({ providers = defaultProviders, className }: OAuthSignInProps) {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        await signInWithOAuth(e);
    };

    return (
        <div className={cn('flex flex-col gap-4', className)}>
            {providers.map((provider) => (
                <form key={provider.name} onSubmit={handleSubmit}>
                    <input type='hidden' name='provider' value={provider.name} />
                    <OAuthButton {...provider} key={provider.name} />
                </form>
            ))}
        </div>
    );
}
