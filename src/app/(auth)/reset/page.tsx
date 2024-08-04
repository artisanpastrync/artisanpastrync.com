import { redirect } from 'next/navigation';

import { ResetPasswordForm } from '@/components/auth/reset-password';
import { getSupabaseUserServer } from '@/lib/supabase/server';

export default async function ResetPasswordPage() {
    const user = await getSupabaseUserServer();

    if (!user) return redirect('/login');

    return <ResetPasswordForm />;
}
