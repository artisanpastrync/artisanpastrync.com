import { Button } from '@/components/Button';
import { getUser, signOut } from '@/lib/auth';

async function signOutAction() {
    'use server';
    await signOut();
}

export async function AuthButton() {
    const user = await getUser();

    if (!user) return <Button href='/login'>Sign in</Button>;

    return (
        <form action={signOutAction}>
            <Button variant='inverted'>Sign Out</Button>
        </form>
    );
}
