'use client';

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';

import { getStripe } from '@/lib/stripe/client';

export function EmbeddedCheckoutForm({ clientSecret }: { clientSecret: string }) {
    const stripePromise = getStripe();

    return (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
            <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
    );
}
