import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';
import './globals.css';
import { Nav, NavLink } from '@/components/Nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Artisan Pastry',
    description: 'Fine Baked Goods from Wake Forest, North Carolina',
};

export default function RootLayout({ children }: PropsWithChildren<object>) {
    return (
        <>
            <Nav>
                <NavLink href='/'>Home</NavLink>
                <NavLink href='/menu'>Menu</NavLink>
                <NavLink href='/about'>About</NavLink>
                <NavLink href='/contact'>Contact</NavLink>
                <NavLink href='/order'>Order</NavLink>
            </Nav>
            <body className={inter.className}>{children}</body>
        </>
    );
}
