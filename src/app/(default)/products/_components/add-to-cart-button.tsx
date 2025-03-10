'use client';

import { ShoppingBasketIcon } from 'lucide-react';
import { toast } from 'sonner';
import Stripe from 'stripe';

import { addCartItemAction } from '@/components/cart/actions';
import { useCartContext } from '@/components/cart/cart-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface AddToCartProps {
    className?: string;
    variant?: Stripe.Price;
}

export function AddToCartButton({ className, variant }: AddToCartProps) {
    const { refresh, setCheckoutReady } = useCartContext();

    const unavailable = !variant?.metadata || !!variant.metadata.unavailable;

    const handleClick = async () => {
        if (!variant?.id) return;

        setCheckoutReady(false);
        const { ok, message } = await addCartItemAction(null, variant.id);

        if (!ok) toast.error(message);

        setCheckoutReady(true);
        refresh();
    };

    return (
        <Button
            onClick={handleClick}
            disabled={unavailable}
            variant='default'
            className={cn(
                'mx-auto w-full rounded-md p-10 py-4 transition-all hover:opacity-75 md:w-full md:rounded-md md:py-4',
                className
            )}
        >
            <ShoppingBasketIcon className='mr-2 size-5' />
            Add to Basket
        </Button>
    );
}

// todo: add feedback tooltip
// tell user to select a variant
// tell user that the variant is unavailable
