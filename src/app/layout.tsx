import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Section } from '@/components';
import { Button } from '@/components/Button';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Artisan Pastry',
    description: 'Fine Baked Goods from Wake Forest, North Carolina',
};

export default function RootLayout({ children }: PropsWithChildren<object>) {
    return (
<>
        <html lang='en'>
            <Navbar />
            <Section className='h-screen'>
                <Section.Background video='/assets/hero-video.mp4' />
                <Section.Overlay className='bg-primary-900' opacity={0.5} />
                <Section.Content className='pt-20 text-primary-100 flex flex-col align-center justify-center gap-4'>
                   {children} 
                </Section.Content>
            </Section>
            <Section style={{ height: '1000px' }}>
                <Section.Background color='' />
                <Section.Overlay
                    opacity={1}
                    className='bg-gradient-to-tr from-primary-200 to-primary-800'
                />
                <Section.Content></Section.Content>
            </Section>
            <Footer />
            </html>
        </>
    );
}
