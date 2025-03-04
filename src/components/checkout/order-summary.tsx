import Stripe from 'stripe';

import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatStripeAmountForDisplay } from '@/lib/stripe/utils';
import { type OrderStatus } from '@/services/order';

export interface OrderSummaryCardProps {
    checkout: Stripe.Checkout.Session;
}

export function OrderSummary({ checkout }: OrderSummaryCardProps) {
    const createdDate = new Date(checkout.created * 1000);
    const ready = checkout.custom_fields?.find(({ key }) => key === 'date')?.dropdown?.value ?? '';
    const readyDate = new Date(parseInt(ready));
    const fulfillment = checkout.shipping_cost?.amount_subtotal ? 'Delivery' : 'Pickup';
    const moreInfo = checkout.custom_fields?.find(({ key }) => key === 'other')?.text?.value ?? '';
    const _status = (checkout.metadata?.['status'] ?? 'unknown') as OrderStatus;

    return (
        <>
            <div className='grid gap-3'>
                <h2 className='font-semibold'>Order Summary</h2>
                <p>Order Date: {createdDate.toDateString()}</p>
                <p>Order Type: {fulfillment}</p>
                <p>
                    {fulfillment} Date: {readyDate.toDateString()}
                </p>
                {moreInfo && <p>Notes: {moreInfo}</p>}
                <Separator className='my-2' />
                <h2 className='font-semibold'>Order Details</h2>
                <ul className='grid gap-3'>
                    {checkout.line_items?.data?.map((item) => (
                        <li className='flex items-center justify-between' key={item.id}>
                            <span className='text-muted-foreground'>
                                {item.description} x <span>{item.quantity}</span>
                            </span>
                            <span>
                                {formatStripeAmountForDisplay(item.amount_subtotal, item.currency)}
                            </span>
                        </li>
                    ))}
                </ul>
                <Separator className='my-2' />
                <ul className='grid gap-3'>
                    <li className='flex items-center justify-between'>
                        <span className='text-muted-foreground'>Subtotal</span>
                        <span>
                            {formatStripeAmountForDisplay(
                                checkout.amount_subtotal,
                                checkout.currency
                            )}
                        </span>
                    </li>
                    <li className='flex items-center justify-between'>
                        <span className='text-muted-foreground'>{fulfillment}</span>
                        <span>
                            {formatStripeAmountForDisplay(
                                checkout.total_details?.amount_shipping,
                                checkout.currency
                            )}
                        </span>
                    </li>
                    <li className='flex items-center justify-between'>
                        <span className='text-muted-foreground'>Tax</span>
                        <span>
                            {formatStripeAmountForDisplay(
                                checkout.total_details?.amount_tax,
                                checkout.currency
                            )}
                        </span>
                    </li>
                    <li className='flex items-center justify-between font-semibold'>
                        <span className='text-muted-foreground'>Total</span>
                        <span>
                            {formatStripeAmountForDisplay(checkout.amount_total, checkout.currency)}
                        </span>
                    </li>
                </ul>
            </div>
            <Separator className='my-4' />
            <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-3'>
                    <div className='font-semibold'>Shipping Information</div>
                    <address className='grid gap-0.5 not-italic text-muted-foreground'>
                        <span>{checkout.shipping_details?.name}</span>
                        <span>{checkout.shipping_details?.address?.line1}</span>
                        {checkout.shipping_details?.address?.line2 && (
                            <span>{checkout.shipping_details?.address?.line2}</span>
                        )}
                        <span>
                            {checkout.shipping_details?.address?.city}
                            {', '}
                            {checkout.shipping_details?.address?.state}{' '}
                            {checkout.shipping_details?.address?.postal_code}
                        </span>
                    </address>
                </div>
                <div className='grid auto-rows-max gap-3'>
                    <div className='font-semibold'>Billing Information</div>
                    <address className='grid gap-0.5 not-italic text-muted-foreground'>
                        <span>{checkout.customer_details?.name}</span>
                        <span>{checkout.customer_details?.address?.line1}</span>
                        {checkout.customer_details?.address?.line2 && (
                            <span>{checkout.customer_details?.address?.line2}</span>
                        )}
                        <span>
                            {checkout.customer_details?.address?.city}
                            {', '}
                            {checkout.customer_details?.address?.state}{' '}
                            {checkout.customer_details?.address?.postal_code}
                        </span>
                    </address>
                </div>
            </div>
            <Separator className='my-4' />
            <div className='grid gap-3'>
                <div className='font-semibold'>Customer Information</div>
                <dl className='grid gap-3'>
                    <div className='flex items-center justify-between'>
                        <dt className='text-muted-foreground'>Name</dt>
                        <dd>{checkout.customer_details?.name}</dd>
                    </div>
                    <div className='flex items-center justify-between'>
                        <dt className='text-muted-foreground'>Email</dt>
                        <dd>
                            <a href={`mailto:${checkout.customer_details?.email}`}>
                                {checkout.customer_details?.email}
                            </a>
                        </dd>
                    </div>
                    <div className='flex items-center justify-between'>
                        <dt className='text-muted-foreground'>Phone</dt>
                        <dd>
                            <a href='tel:'>{checkout.customer_details?.phone}</a>
                        </dd>
                    </div>
                </dl>
            </div>
        </>
    );
}

export function OrderSummaryCard({ checkout }: OrderSummaryCardProps) {
    return (
        <Card className='overflow-hidden'>
            <CardContent className='p-6 text-sm'>
                <OrderSummary checkout={checkout} />
            </CardContent>
        </Card>
    );
}
