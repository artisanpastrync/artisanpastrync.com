'use server';

import { redirect } from 'next/navigation';

import { Section, SectionContent } from '@/components';
import { ForgotPasswordForm } from '@/components/auth/forgot-password';
import { LinkLogin } from '@/components/auth/link-login';
import { OAuthSignInMethods } from '@/components/auth/oauth-methods';
import { PasswordLoginForm } from '@/components/auth/password-login';
import { SignUpForm } from '@/components/auth/sign-up-form';
import { getSupabaseUserServer } from '@/lib/supabase/server';
import { getSingleQueryParam, SearchParams } from '@/lib/utils';

export interface LoginPageProps {
    searchParams: SearchParams;
}

// https://nextjs.org/docs/app/api-reference/file-conventions/page
export default async function LoginPage({ searchParams }: LoginPageProps) {
    const next = getSingleQueryParam(searchParams, 'next') ?? '/';
    if (await getSupabaseUserServer()) return redirect(next);

    return (
        <Section>
            <SectionContent>
                <div className='grid grid-flow-col gap-8'>
                    <SignUpForm />
                    <PasswordLoginForm />
                    <ForgotPasswordForm />
                    {/* <LinkLogin /> */}
                    <OAuthSignInMethods />
                </div>
            </SectionContent>
        </Section>
    );
}
