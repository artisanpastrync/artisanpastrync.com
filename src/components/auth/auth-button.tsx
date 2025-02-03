import { Button } from '@/components/Button';
import { auth, signOut } from '@/lib/auth';

async function signOutAction() {
    'use server';
    await signOut();
}

export async function AuthButton() {
    const session = await auth();

    if (!session) return <Button href='/login'>Sign in</Button>;

    return (
        <form action={signOutAction}>
            <Button variant='inverted'>Sign Out</Button>
        </form>
    );
}
