'use server';

import { Section, SectionContent } from '@/components';
import { getUser, signOut } from '@/lib/auth';
import { GoogleLoginButton } from '@/components/auth/google-login';

async function signOutAction() {
    'use server';
    await signOut();
}

// https://nextjs.org/docs/app/api-reference/file-conventions/page
export default async function LoginPage() {
    const user = await getUser();

    return (
        <Section>
            <SectionContent>
                {user ? (
                    <form action={signOutAction}>
                        <button>Sign Out</button>
                    </form>
                ) : (
                    <GoogleLoginButton />
                )}
                <p>session: {JSON.stringify(user)}</p>
            </SectionContent>
        </Section>
    );
}
