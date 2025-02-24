import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import Stripe from 'stripe';

import { STRIPE_WEBHOOK_SECRET } from '@/constants/environment';
import { stripe } from '@/lib/stripe/server';
import { getCustomerById } from '@/services/customer';
import { TAGS } from '@/constants/cache-tags';

const success = new Response(null, { status: 200 });

// https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local
// https://github.com/shadcn-ui/taxonomy/blob/main/app/api/webhooks/stripe/route.ts
export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        // @ts-expect-error unknown type
        console.error(err.message);
        // @ts-expect-error unknown type
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object;
            const customerId = session.customer as string;
            if (!customerId) throw new Error('No customer associated with session!');

            const checkout = await stripe.checkout.sessions.retrieve(session.id, {
                expand: ['line_items'],
            });
            const _customer = await getCustomerById(customerId);

            console.log(checkout.line_items); // todo: email customer

            return success;
        }
        case 'product.created':
        case 'product.updated':
        case 'product.deleted':
        case 'price.created':
        case 'price.updated':
        case 'price.deleted': {
            revalidateTag(TAGS.products);
            return success;
        }
        default: {
            console.log(event.type, JSON.stringify(event.data.object));
        }
    }

    return success;
}
