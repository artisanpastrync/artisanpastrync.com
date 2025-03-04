import { PropsWithChildren } from 'react';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import CartModalPage from './cart/modal/page';

export default function DefaultLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Navbar />
            {children}
            <CartModalPage />
            <Footer />
        </>
    );
}
