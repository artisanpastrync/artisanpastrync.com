import Stripe from 'stripe';

import { stripe } from '@/lib/stripe/server';
import { getUserStripeCustomerId } from './customer';

export type OrderStatus = 'processing' | 'prepared' | 'canceled' | 'fulfilled' | 'unknown';

export async function getAllOrdersByCustomer(customer: string): Promise<Stripe.Checkout.Session[]> {
    // return Array.fromAsync(stripe.checkout.sessions.list({ customer, status: 'complete' }));
    const orders: Stripe.Checkout.Session[] = [];

    for await (const order of stripe.checkout.sessions.list({ customer, status: 'complete' })) {
        orders.push(order);
    }

    return orders;
}

export async function getUserOrders() {
    const customerId = await getUserStripeCustomerId();

    if (!customerId) return [];

    return await getAllOrdersByCustomer(customerId);
}

export async function getOrderById(orderId: string): Promise<Stripe.Checkout.Session> {
    return await stripe.checkout.sessions.retrieve(orderId, { expand: ['line_items'] });
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    await stripe.checkout.sessions.update(orderId, { metadata: { status } });
}

export async function getOrderStatus(orderId: string): Promise<OrderStatus> {
    const order = await stripe.checkout.sessions.retrieve(orderId);

    return (order?.metadata?.status ?? 'unknown') as OrderStatus;
}
