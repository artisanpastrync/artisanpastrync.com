'use server';

import { Button } from '@/components/Button';
import { signOut } from '@/lib/auth/server';
import { getSupabaseUserServer } from '@/lib/supabase/server';

export async function AuthButton() {
    const user = await getSupabaseUserServer();

    if (!user) return <Button href='/login'>Sign in</Button>;

    return (
        <form action={signOut}>
            <Button variant='inverted'>Sign Out</Button>
        </form>
    );
}
