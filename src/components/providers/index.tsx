import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

import { CartModalProvider } from '@/components/cart/cart-modal';
import { ThemeProvider } from './theme-provider';

export function Providers({ children }: PropsWithChildren) {
    return (
        <SessionProvider>
            <ThemeProvider
                attribute='class'
                defaultTheme='system'
                enableSystem
                disableTransitionOnChange
            >
                <CartModalProvider>{children}</CartModalProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}
