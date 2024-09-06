'use server';

import { AuthError } from '@supabase/supabase-js';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getURL, objectToPojo } from '@/lib/utils';

export interface AuthReturn {
    error?: AuthError | null;
    data?: { [key: string]: unknown } | null;
}

export async function signOut(_formData: FormData): Promise<AuthReturn> {
    console.log(_formData);

    const supabase = createSupabaseServerClient();

    const result = await supabase.auth.signOut();

    return objectToPojo(result);
}

export async function signInWithLink(formData: FormData): Promise<AuthReturn> {
    const emailRedirectTo = String(formData.get('callback') ?? '') || getURL('/auth/callback');

    const email = String(formData.get('email')).trim();

    const supabase = createSupabaseServerClient();

    const result = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo } });

    return objectToPojo(result);
}

export async function requestPasswordUpdate(formData: FormData): Promise<AuthReturn> {
    const redirectTo = getURL('/auth/callback?next=/reset');

    const email = String(formData.get('email')).trim();

    const supabase = createSupabaseServerClient();

    const result = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

    return objectToPojo(result);

    // if (error) throw error;
    // if (error) {
    // redirectPath = getErrorRedirect(
    //     '/signin/forgot_password',
    //     error.message,
    //     'Please try again.'
    // );
    // } else if (data) {
    // redirectPath = getStatusRedirect(
    //     '/signin/forgot_password',
    //     'Success!',
    //     'Please check your email for a password reset link. You may now close this tab.',
    //     true
    // );
    // } else {
    // redirectPath = getErrorRedirect(
    //     '/signin/forgot_password',
    //     'Hmm... Something went wrong.',
    //     'Password reset email could not be sent.'
    // );
    // }
}

export async function signInWithPassword(formData: FormData): Promise<AuthReturn> {
    const email = String(formData.get('email')).trim();
    const password = String(formData.get('password')).trim();

    const supabase = createSupabaseServerClient();

    const result = await supabase.auth.signInWithPassword({ email, password });

    return objectToPojo(result);

    // console.log(Object.getOwnPropertyNames(error));

    // console.log(error?.message);

    // console.log(Object.keys(error ?? {}));

    // return { data, error: JSON.parse(JSON.stringify(error)) };

    // if (error) throw error;
    // todo: how to ensure redirect?

    // if (error) {
    // redirectPath = getErrorRedirect(
    //     '/signin/password_signin',
    //     'Sign in failed.',
    //     error.message
    // );
    // } else if (data.user) {
    // cookieStore.set('preferredSignInView', 'password_signin', { path: '/' });
    // redirectPath = getStatusRedirect('/', 'Success!', 'You are now signed in.');
    // } else {
    // redirectPath = getErrorRedirect(
    //     '/signin/password_signin',
    //     'Hmm... Something went wrong.',
    //     'You could not be signed in.'
    // );
    // }
}

export async function signUp(formData: FormData): Promise<AuthReturn> {
    const emailRedirectTo = String(formData.get('callback') ?? '') || getURL('/auth/callback');

    const email = String(formData.get('email')).trim();
    const password = String(formData.get('password')).trim();

    const supabase = createSupabaseServerClient();

    const result = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo },
    });

    return objectToPojo(result);

    // if (error) throw error;
    // if (error) {
    // redirectPath = getErrorRedirect('/signin/signup', 'Sign up failed.', error.message);
    // } else if (data.session) {
    // redirectPath = getStatusRedirect('/', 'Success!', 'You are now signed in.');
    // } else if (data.user && data.user.identities && data.user.identities.length == 0) {
    // redirectPath = getErrorRedirect(
    //     '/signin/signup',
    //     'Sign up failed.',
    //     'There is already an account associated with this email address. Try resetting your password.'
    // );
    // } else if (data.user) {
    // redirectPath = getStatusRedirect(
    //     '/',
    //     'Success!',
    //     'Please check your email for a confirmation link. You may now close this tab.'
    // );
    // } else {
    // redirectPath = getErrorRedirect(
    //     '/signin/signup',
    //     'Hmm... Something went wrong.',
    //     'You could not be signed up.'
    // );
    // }
}

export async function updateEmail(formData: FormData): Promise<AuthReturn> {
    const emailRedirectTo = String(formData.get('callback') ?? '') || getURL('/auth/callback');

    const newEmail = String(formData.get('newEmail')).trim();

    const supabase = createSupabaseServerClient();

    const result = await supabase.auth.updateUser({ email: newEmail }, { emailRedirectTo });

    return objectToPojo(result);

    // if (error) throw error;
    // const callbackUrl = getURL(
    //     getStatusRedirect('/account', 'Success!', 'Your email has been updated.');
    // );
    // if (error) {
    //     return getErrorRedirect('/account', 'Your email could not be updated.', error.message);
    // } else {
    //     return getStatusRedirect(
    //         '/account',
    //         'Confirmation emails sent.',
    //         `You will need to confirm the update by clicking the links sent to both the old and new email addresses.`
    //     );
    // }
}

export async function updatePassword(formData: FormData): Promise<AuthReturn> {
    const password = String(formData.get('password'));

    const supabase = createSupabaseServerClient();

    const result = await supabase.auth.updateUser({ password });

    return objectToPojo(result);
}

export async function updateName(formData: FormData): Promise<AuthReturn> {
    const full_name = String(formData.get('fullName')).trim();

    const supabase = createSupabaseServerClient();

    const result = await supabase.auth.updateUser({ data: { full_name } });

    return objectToPojo(result);

    // if (error) throw error;
    // if (error) {
    // return getErrorRedirect('/account', 'Your name could not be updated.', error.message);
    // } else if (data.user) {
    // return getStatusRedirect('/account', 'Success!', 'Your name has been updated.');
    // } else {
    // return getErrorRedirect(
    //     '/account',
    //     'Hmm... Something went wrong.',
    //     'Your name could not be updated.'
    // );
    // }
}
