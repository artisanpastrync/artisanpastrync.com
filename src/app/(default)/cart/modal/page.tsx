import Image from 'next/image';
import Link from 'next/link';

import { CartAsideContainer } from '@/components/cart/cart-aside';
import { Button } from '@/components/ui/button';
import { getCartItems } from '@/services/cart';
import { formatStripeAmountForDisplay } from '@/lib/stripe/utils';

async function getCartItemsAction() {
    'use server';
    return await getCartItems();
}

export default async function CartModalPage() {
    const cart = await getCartItemsAction();

    if (!cart || !cart.length) return null;

    return (
        <CartAsideContainer>
            <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-lg font-semibold text-neutral-700'>This is the cart</h2>
                    <Link replace href='/cart' className='text-sm text-muted-foreground underline'>
                        Open full cart
                    </Link>
                </div>

                <div className='mt-8'>
                    <ul role='list' className='-my-6 divide-y divide-neutral-200'>
                        {cart.map((item) => (
                            <li
                                key={item.product.id}
                                className='grid grid-cols-[4rem_1fr_max-content] grid-rows-[auto_auto] gap-x-4 gap-y-2 py-6'
                            >
                                {item.product.images[0] ? (
                                    <div className='col-span-1 row-span-2 bg-neutral-100'>
                                        <Image
                                            className='aspect-square rounded-md object-cover'
                                            src={item.product.images[0]}
                                            width={80}
                                            height={80}
                                            alt=''
                                        />
                                    </div>
                                ) : (
                                    <div className='col-span-1 row-span-2' />
                                )}

                                <h3 className='-mt-1 font-semibold leading-tight'>
                                    {/* {formatProductName(
                                        item.product.name,
                                        item.product.metadata.variant
                                    )} */}
                                    {item.product.name}
                                    {item.variant.nickname}
                                </h3>
                                <p className='text-sm font-medium leading-none'>
                                    {formatStripeAmountForDisplay(
                                        item.variant.unit_amount ?? 0,
                                        item.variant.currency
                                    )}
                                </p>
                                <p className='self-end text-sm font-medium text-muted-foreground'>
                                    {item.quantity}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className='border-t border-neutral-200 px-4 py-6 sm:px-6'>
                <div
                    id='cart-overlay-description'
                    className='flex justify-between text-base font-medium text-neutral-900'
                >
                    <p>Le totale</p>
                    {/* <p>{formatStripeAmountForDisplay(total, currency)}</p> */}
                </div>
                <p className='mt-0.5 text-sm text-neutral-500'>{'shippingAndTaxesInfo'}</p>
                <Button asChild={true} size={'lg'} className='mt-6 w-full rounded-full text-lg'>
                    <Link href='/cart'>Time to PAY</Link>
                </Button>
            </div>
        </CartAsideContainer>
    );
}
