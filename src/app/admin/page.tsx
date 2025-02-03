import { getUser } from '@/lib/auth';

export default async function AdminPage() {
    const user = await getUser();
    return <div>{JSON.stringify(user)}</div>;
}
