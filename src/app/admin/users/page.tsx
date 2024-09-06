import { createSupabaseAdminClient } from '@/lib/supabase/admin';

import { UserTableRow } from './_components/user-table';

export default async function AdminUsersPage() {
    const supabaseAdmin = createSupabaseAdminClient();

    const { users } = await supabaseAdmin.auth.admin.listUsers().then((res) => res.data);

    return (
        <div className='table'>
            {users?.map((user) => <UserTableRow user={user} key={user.id} />)}
        </div>
    );
}
