import { redirect } from 'next/navigation';

import { getUser } from '@/lib/auth';

export default async function ProtectedPage() {
    const user = await getUser();

    if (!user) return redirect('/login');

    return (
        <div className='flex-1 w-full flex flex-col gap-20 items-center'>
            <div className='w-full'>
                <div className='py-6 font-bold bg-red-950 text-center'>
                    This is a protected page that you can only see as an authenticated user
                </div>
                <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
                    <div className='w-full max-w-4xl flex justify-between items-center p-3 text-sm'></div>
                </nav>
            </div>
        </div>
    );
}
