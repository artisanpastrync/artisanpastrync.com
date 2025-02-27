import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

// import { CartProvider } from '../cart/cart-context';
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
                {children}
                {/* <CartProvider>{children}</CartProvider> */}
            </ThemeProvider>
        </SessionProvider>
    );
}
