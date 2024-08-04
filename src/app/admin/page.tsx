import { getSupabaseUserServer } from '@/lib/supabase/server';

export default async function AdminPage() {
    const user = await getSupabaseUserServer();
    return <div>{JSON.stringify(user)}</div>;
}
