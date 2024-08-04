'use client';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

import { createSupabaseBrowserClient } from '@/lib/supabase/client';

import { Button } from '../Button';

/** this is so broken */
export interface AuthButtonClientProps {
    session: Session | null;
}

// https://stackoverflow.com/questions/77400265/how-can-i-handle-these-user-sessions-of-the-logout-button-in-next-js-to-render-i
export function AuthButtonClient({ session }: AuthButtonClientProps) {
    const router = useRouter();
    const supabase = createSupabaseBrowserClient();
    const user = session?.user;

    const handleSignout = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    if (!user) return <Button href='/login'>Sign in</Button>;
    return <Button onClick={handleSignout}>Sign out</Button>;
}
