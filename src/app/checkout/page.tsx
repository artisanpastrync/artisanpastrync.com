import { redirect, unauthorized } from 'next/navigation';

import { getUser } from '@/lib/auth';
import { stripe } from '@/lib/stripe/server';
import { getURL } from '@/lib/utils';
import { getCartStripeLineItems } from '@/services/cart';

import { EmbeddedCheckoutForm } from './_components/embedded-checkout';

export default async function CheckoutPage() {
    const user = await getUser();

    if (!user?.stripeCustomerId) return unauthorized();

    const line_items = await getCartStripeLineItems();

    if (!line_items || !line_items.length) return redirect('/cart');

    // next n days excluding today, saturdays, and sundays
    const dates = Array.from({ length: 21 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i + 1);
        date.setMilliseconds(0);
        date.setSeconds(0);
        date.setMinutes(0);
        date.setHours(12);
        return date;
    }).filter((date) => ![0, 6].includes(date.getDay()));

    // Pickup Date Dropdown Options
    const options = dates.map((date) => ({
        label: date.toDateString(),
        value: date.getTime().toString(),
    }));

    const shipping_options = (await stripe.shippingRates.list({ active: true })).data
        .sort((a, b) => (a.fixed_amount?.amount ?? 0) - (b.fixed_amount?.amount ?? 0))
        .map((rate) => ({ shipping_rate: rate.id }));

    const checkout = await stripe.checkout.sessions.create({
        mode: 'payment',
        ui_mode: 'embedded',
        customer: user.stripeCustomerId,
        // https://docs.stripe.com/payments/checkout/custom-success-page?payment-ui=embedded-form&client=react#return-url
        return_url: getURL('/checkout/{CHECKOUT_SESSION_ID}'),
        line_items,
        billing_address_collection: 'auto',
        phone_number_collection: { enabled: true },
        shipping_address_collection: { allowed_countries: ['US'] },
        shipping_options,
        custom_fields: [
            {
                key: 'date',
                label: { type: 'custom', custom: 'Pickup/Delivery Date' },
                type: 'dropdown',
                dropdown: { options },
            },
            {
                key: 'other',
                label: { type: 'custom', custom: 'Additional Details' },
                type: 'text',
                optional: true,
            },
        ],
        custom_text: {
            submit: { message: 'We will be in touch to confirm the details of your order' },
        },
        metadata: {
            status: 'processing',
        },
    });

    if (!checkout.client_secret) throw new Error('Checkout creation failed');

    return <EmbeddedCheckoutForm clientSecret={checkout.client_secret} />;
}
