import Link from 'next/link';
import { forbidden, unauthorized } from 'next/navigation';

import { OrderSummaryCard } from '@/components/checkout/order-summary';
import { Button } from '@/components/ui/button';
import { stripe } from '@/lib/stripe/server';
import { getUserStripeCustomer } from '@/services/customer';

export interface CheckoutDetailsPageProps {
    params: Promise<{ checkout_id: string }>;
}

export default async function CheckoutDetailsPage({ params }: CheckoutDetailsPageProps) {
    const { checkout_id } = await params;

    const customer = await getUserStripeCustomer();

    if (!customer) return unauthorized();

    const checkout = await stripe.checkout.sessions.retrieve(checkout_id, {
        expand: ['line_items'],
    });

    if (checkout.customer !== customer.id) return forbidden();

    if (checkout.payment_status === 'unpaid') throw new Error('Order not paid for.');

    const customerName = customer?.name?.split(' ')?.[0];

    return (
        <div className='p-4 lg:p-16 grid lg:grid-cols-2 gap-8'>
            <div className='h-full flex flex-col gap-4 justify-center'>
                <h2 className='text-5xl font-bold'>
                    {customerName
                        ? `Thank you for your purchase, ${customerName}!`
                        : 'Thank you for your purchase!'}
                </h2>
                <p className='text-xl'>
                    We&apos;ll get to your order and confirm details with you as soon as possible.
                </p>
                <div className='flex gap-4'>
                    <Button asChild className='text-lg'>
                        <Link href='/'>Back to Home</Link>
                    </Button>
                    <Button asChild variant='secondary' className='text-lg'>
                        <Link href='/profile/orders'>View my Orders</Link>
                    </Button>
                </div>
            </div>
            <div>
                <OrderSummaryCard checkout={checkout} />
            </div>
            {/* <pre className='overflow-auto'>{JSON.stringify(checkout, null, 4)}</pre> */}
        </div>
    );
}
