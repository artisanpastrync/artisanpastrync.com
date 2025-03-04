'use client';

import { clearCartAction } from '@/components/cart-old/actions';

export default function CartPage() {
    return (
        <form action={clearCartAction}>
            <button>Clear!</button>
        </form>
    );
}
