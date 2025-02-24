'use client';

import dynamic from 'next/dynamic';

import { useCartContext } from './cart-context';

const CartSheet = dynamic(() =>
    import('@/components/cart/cart-sheet').then((mod) => mod.CartSheet)
);

export function CartView() {
    const { isOpen, isSheetLoaded, openCart, closeCart, cart } = useCartContext();

    return (
        // isSheetLoaded && (
        <CartSheet
            isOpen={isOpen}
            onCartOpen={openCart}
            cartItems={cart!}
            onCartClose={closeCart}
        />
    );
}
