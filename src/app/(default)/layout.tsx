import { PropsWithChildren } from 'react';

import { AuthButton } from '@/components/auth/auth-button';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

export default function DefaultLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Navbar serverButtons={<AuthButton />}></Navbar>
            {children}
            <Footer />
        </>
    );
}
