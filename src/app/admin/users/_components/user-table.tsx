import { User } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

import { delete_claim, set_claim } from '@/queries/claims';

export const setAdminClaimAction = async (data: FormData) => {
    'use server';
    await set_claim(data.get('uid') as string, 'claims_admin', true);
    revalidatePath('/');
};

export const removeAdminClaimAction = async (data: FormData) => {
    'use server';
    await delete_claim(data.get('uid') as string, 'claims_admin');
    revalidatePath('/');
};

export function UserTableRow({ user }: { user: User }) {
    return (
        <form className='table-row'>
            <div className='table-cell'>
                <input type='text' name='uid' value={user.id} readOnly />
            </div>
            <div className='table-cell'>{user.email}</div>
            <div className='table-cell'>{user.user_metadata.name}</div>
            <div className='table-cell'>
                {user.app_metadata['claims_admin'] ? (
                    <button formAction={removeAdminClaimAction}>Unset Admin</button>
                ) : (
                    <button formAction={setAdminClaimAction}>Set Admin</button>
                )}
            </div>
        </form>
    );
}
