'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, ReactNode, useEffect, useState } from 'react';

import { AuthButton } from '@/components/auth/auth-button';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { LINKS, NavLink } from '@/constants/navigation';
import { CartView } from '../cart/cart-view';
import './navbar.css';

export type NavButton = Pick<ButtonProps, 'onClick' | 'variant' | 'className'> & {
    label: string;
};

export interface NavbarProps {
    links?: NavLink[];
    enableScroll?: boolean;
    className?: string;
    serverButtons?: ReactNode;
}

export const Navbar: FC<NavbarProps> = ({ className, links = LINKS, enableScroll }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    // by default, enable scroll on landing page only
    enableScroll ??= pathname === '/';

    useEffect(() => {
        const updateIsScrolled = () => {
            setIsScrolled(window.scrollY > 50);
        };

        updateIsScrolled();

        const handleScroll = () => {
            updateIsScrolled();
        };

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        enableScroll && window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [enableScroll]);

    const isSolid = !enableScroll || isMenuOpen || isScrolled;
    return (
        <header
            className={cn(
                'navbar group bg-primary-50 shadow-md',
                isSolid ? 'solid' : 'transparent bg-transparent shadow-none',
                isScrolled ? 'scrolled' : 'not-scrolled',
                isMenuOpen ? 'menu-open' : 'menu-closed',
                enableScroll ? 'fixed' : 'relative',
                className
            )}
        >
            <div className='h-full container mx-auto px-4 py-4 flex justify-between items-center'>
                <div className='flex items-center grow'>
                    <div className='links hidden lg:flex space-x-4'>
                        {links.map(({ label, href, icon }) => (
                            <Button
                                variant='default'
                                asChild
                                className='text-base text-primary-900 bg-transparent hover:text-primary-700 transition-colors duration-500 group-[.transparent]:text-primary-100 group-[.transparent]:hover:text-primary-300 gap-2'
                                key={href}
                            >
                                <Link href={href}>
                                    {icon}
                                    {label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
                <Link href='/' className='absolute left-1/2 -translate-x-1/2'>
                    <Logo className='duration-500 transition-transform origin-top' />
                </Link>
                <div className='flex items-center grow justify-end'>
                    <div className='hidden lg:flex space-x-4'>
                        <ThemeToggle
                            variant='default'
                            className='text-primary-900 bg-transparent hover:text-primary-700 transition-colors group-[.transparent]:text-primary-100 group-[.transparent]:hover:text-primary-300'
                        />
                        <AuthButton
                            variant='default'
                            className='text-primary-900 bg-transparent hover:text-primary-700 transition-colors duration-500 group-[.transparent]:text-primary-100 group-[.transparent]:hover:text-primary-300 gap-2'
                        />
                        <CartView />
                    </div>
                    <div className='lg:hidden flex'>
                        <button
                            onClick={() => setIsMenuOpen((open) => !open)}
                            aria-label={
                                isMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'
                            }
                        >
                            <div className={cn('hamburger', { open: isMenuOpen })}>
                                <span className='bar'></span>
                                <span className='bar'></span>
                                <span className='bar'></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={cn(
                    'menu-overlay -z-10 lg:hidden fixed inset-0 bg-primary-50 bg-opacity-90 flex transition-[opacity,transform] duration-500 ease-in-out overflow-hidden opacity-0'
                )}
                style={{
                    transform: isMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
                    opacity: isMenuOpen ? 1 : 0,
                }}
                aria-hidden={!isMenuOpen}
            >
                <div className='container mx-auto mt-16 px-4 pt-4 overflow-y-auto'>
                    <nav className='space-y-4'>
                        <div className='links flex flex-col items-end gap-4 space'>
                            <AuthButton variant='outline' />
                            {links.map(({ label, href }) => (
                                <Button
                                    key={label}
                                    onClick={() => setIsMenuOpen(false)}
                                    variant='link'
                                    tabIndex={isMenuOpen ? 0 : -1}
                                    asChild
                                >
                                    <Link href={href}>{label}</Link>
                                </Button>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

// export function checkMenuStatusClick() {
//     const [isMenuOpen, setIsMenuOpen] = useState(false)
//     return () => setIsMenuOpen(false);
// }

// export function checkMenuStatusTab() {
//     const [isMenuOpen] = useState(false)
//     return isMenuOpen ? 0 : -1;
// }
