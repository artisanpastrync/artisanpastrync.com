'use client';

import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { getCartItemsAction } from './actions';

interface CartStore {
    isOpen: boolean;
    isSheetLoaded: boolean;
    lastUpdatedAt: number;
    cart: any;
    checkoutReady: boolean;

    openCart: () => void;
    closeCart: () => void;
    preloadSheet: () => void;
    updateCart: (cart: any) => void;
    setCheckoutReady: (ready: boolean) => void;
    setCart: (cart: any) => void;
    refresh: () => void;
}

const CartContext = createContext<CartStore | undefined>(undefined);

export const CartProvider = ({ children }: PropsWithChildren) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSheetLoaded, setIsSheetLoaded] = useState(false);
    const [lastUpdatedAt, setLastUpdatedAt] = useState(Date.now());
    const [cart, setCart] = useState<unknown | null>(null);
    const [checkoutReady, setCheckoutReady] = useState(true);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const refresh = () => {
        setLastUpdatedAt(Date.now());
    };

    useEffect(() => {
        const syncCart = async () => {
            const cartItems = await getCartItemsAction();
            setCart(cartItems);
        };
        syncCart();
    }, [lastUpdatedAt]);

    return (
        <CartContext.Provider
            value={{
                isOpen,
                isSheetLoaded,
                lastUpdatedAt,
                cart,
                checkoutReady,
                openCart,
                closeCart,
                // preloadSheet,
                refresh,
                setCart,
                setCheckoutReady,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = (): CartStore => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
