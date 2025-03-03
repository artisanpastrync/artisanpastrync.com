import { getUser } from '@/lib/auth';
import { forbidden } from 'next/navigation';

export default async function AdminPage() {
    const user = await getUser();
    const isAdmin = user?.isAdmin;
    if (!isAdmin) return forbidden();

    return <div>{JSON.stringify(user)}</div>;
}
