'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { useCartModal } from './cart-modal';

export function CartButton() {
    const { setOpen } = useCartModal();

    return (
        <Button asChild>
            <Link
                href='/cart'
                onClick={(e) => {
                    e.preventDefault();
                    setOpen(true);
                }}
            >
                Cart
            </Link>
        </Button>
    );
}
