import { auth } from '@/lib/auth';

export default async function AdminPage() {
    const session = await auth();
    return <div>{JSON.stringify(session)}</div>;
}
