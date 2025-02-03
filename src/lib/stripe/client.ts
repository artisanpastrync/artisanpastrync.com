import { loadStripe, Stripe } from '@stripe/stripe-js';

import { STRIPE_PUBLISHABLE_KEY } from '@/config/environment';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY ?? '');
    }

    return stripePromise;
};
