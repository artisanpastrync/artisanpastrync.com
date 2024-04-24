import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Artisan Pastry',
    description: 'Fine Baked Goods from Wake Forest, North Carolina',
};

export default function RootLayout({ children }: PropsWithChildren<object>) {
    return (
        <html lang='en'>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
