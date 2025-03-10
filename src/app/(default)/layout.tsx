import { PropsWithChildren } from 'react';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

export default function DefaultLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
