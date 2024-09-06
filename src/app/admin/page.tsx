import { createSupabaseServerClient } from '@/lib/supabase/server';
import { get_my_claims } from '@/queries/claims';

export default async function AdminPage() {
    const supabase = createSupabaseServerClient();

    const { user } = await supabase.auth.getUser().then((res) => res.data);

    const { data: profiles } = await supabase.from('profiles').select().throwOnError();

    const claims = await get_my_claims();

    return (
        <div>
            <h1>Admin Page</h1>
            <h2>User Data</h2>
            <pre>{JSON.stringify(user, null, 4)}</pre>
            <h2>Profiles</h2>
            <pre>{JSON.stringify(profiles, null, 4)}</pre>
            <h2>Claims</h2>
            <code>{JSON.stringify(claims, null, 4)}</code>
        </div>
    );
}
