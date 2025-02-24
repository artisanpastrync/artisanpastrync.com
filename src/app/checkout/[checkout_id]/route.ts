import { NextRequest } from 'next/server';
import { forbidden, redirect } from 'next/navigation';

import { getUser } from '@/lib/auth';
import { stripe } from '@/lib/stripe/server';
import { clearCart } from '@/services/cart';

export interface GetCheckoutSessionResultProps {
    params: Promise<{ checkout_id: string }>;
}

export async function GET(_req: NextRequest, { params }: GetCheckoutSessionResultProps) {
    const { checkout_id } = await params;

    const session = await stripe.checkout.sessions.retrieve(checkout_id);
    // todo: display error, handle 'unpaid' or delayed payment status
    if (session.payment_status !== 'paid') return redirect('/checkout');

    const user = await getUser();
    // only allow users to see their own orders
    if (session.customer !== user?.stripeCustomerId) return forbidden();
    // clear user cart cookie
    await clearCart();

    return redirect(`/checkout/${checkout_id}/success`);
}
