'use client';

import { signOut, useSession } from 'next-auth/react';

import { Button } from '@/components/Button';

export function AuthButton() {
    const { data: session, status } = useSession();

    if (status === 'loading') return <Button disabled>Sign in</Button>;

    if (!session?.user) return <Button href='/login'>Sign in</Button>;

    return (
        <Button variant='inverted' onClick={signOut}>
            Sign Out
        </Button>
    );
}
