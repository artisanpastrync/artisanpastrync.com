import { unauthorized } from 'next/navigation';

import { getUser } from '@/lib/auth';

export default async function ProfilePage() {
    const user = await getUser();

    if (!user) return unauthorized();

    return JSON.stringify(user);
}
