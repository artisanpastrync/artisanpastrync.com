import { Button, ButtonProps } from '@/components/Button';
import { GoogleIcon } from '@/components/icons';
import { signIn } from '@/lib/auth';

async function googleSignInAction(formData: FormData) {
    'use server';
    const redirectTo = formData.get('redirectTo') as string;
    await signIn('google', { redirectTo });
}

export interface GoogleLoginButtonProps extends Omit<ButtonProps, 'children'> {
    redirectTo?: string;
}

export function GoogleLoginButton({ redirectTo = '/', ...props }: GoogleLoginButtonProps) {
    return (
        <form action={googleSignInAction}>
            <input name='redirectTo' value={redirectTo} readOnly hidden />
            <Button type='submit' className='flex flex-row gap-2' {...props}>
                <GoogleIcon className='fill-primary-900' />
                Continue with Google
            </Button>
        </form>
    );
}
