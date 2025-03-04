import { getUserOrders } from '@/services/order';

export default async function ProfileOrdersPage() {
    const orders = await getUserOrders();

    return JSON.stringify(orders);
}
