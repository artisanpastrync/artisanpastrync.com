import 'server-only';

import Stripe from 'stripe';

import pkg from '../../../package.json';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    // https://github.com/stripe/stripe-node#configuration
    // https://stripe.com/docs/api/versioning
    apiVersion: '2024-06-20',
    appInfo: { name: pkg.name, version: pkg.version },
    telemetry: false,
    typescript: true,
});
