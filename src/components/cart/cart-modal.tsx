'use client';

import { usePathname } from 'next/navigation';
import { type ReactNode, createContext, use, useEffect, useState } from 'react';

type CartModalProviderValue = { open: boolean; setOpen: (open: boolean) => void };
const CartModalContext = createContext<CartModalProviderValue | null>(null);

export const CartModalProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    useEffect(() => {
        setOpen(false);
    }, [pathname]);
    return (
        <CartModalContext.Provider value={{ open, setOpen }}>{children}</CartModalContext.Provider>
    );
};

export const useCartModal = () => {
    const ctx = use(CartModalContext);

    if (!ctx) throw new Error('useCartModal must be used within a provider');

    return ctx;
};
