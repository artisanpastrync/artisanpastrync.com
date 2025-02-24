'use client';

import { cn } from '@/lib/utils';
import { useCartContext } from './cart-context';
import { ShoppingBasketIcon } from 'lucide-react';

interface CartProps {
    className?: string;
}

function OpenCartButton() {
    const { openCart } = useCartContext();

    return (
        <button className='absolute inset-0 size-full bg-transparent' onClick={() => openCart()}>
            <span className='sr-only'>open cart</span>
        </button>
    );
}

export function OpenCart({ className }: CartProps) {
    const { cart, preloadSheet } = useCartContext();

    return (
        <div
            className={cn(
                'relative size-8 cursor-pointer items-center justify-center fill-none transition-transform hover:scale-105',
                className
            )}
            onMouseOver={preloadSheet}
        >
            <ShoppingBasketIcon className='text-black' />
            {!!cart?.totalQuantity && (
                <div className='absolute bottom-0 right-0 flex size-4 items-center justify-center rounded-full bg-black text-[11px] text-white'>
                    {cart?.totalQuantity}
                </div>
            )}
            <OpenCartButton />
        </div>
    );
}
