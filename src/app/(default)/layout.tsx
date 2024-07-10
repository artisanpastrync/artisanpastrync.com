import { PropsWithChildren } from 'react';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import AuthButton from '@/components/Authentification/auth';

export default function DefaultLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Navbar>
                <AuthButton />
            </Navbar>
            {children}
            <Footer />
        </>
    );
}
