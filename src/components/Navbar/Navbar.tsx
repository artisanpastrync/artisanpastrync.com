'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, ReactNode, useEffect, useState } from 'react';

import { AuthButton } from '@/components/auth/auth-button';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Button, ButtonProps } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';

import './navbar.css';

const defaultLinks: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Products', href: '/products' },
    // { label: 'Contact Us', href: '/contact' },
];

export type NavButton = Pick<ButtonProps, 'href' | 'onClick' | 'variant' | 'className'> & {
    label: string;
};

export interface NavLink {
    label: string;
    href: string;
}

export interface NavbarProps {
    links?: NavLink[];
    enableScroll?: boolean;
    className?: string;
    serverButtons?: ReactNode;
}

export const Navbar: FC<NavbarProps> = ({ className, links = defaultLinks, enableScroll }) => {
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
                'navbar bg-primary-50 shadow-md',
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
                        {links.map(({ label, href }) => (
                            <Link href={href} key={label}>
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
                <Link href='/' className='absolute left-1/2 -translate-x-1/2'>
                    <Logo className='duration-500 transition-transform origin-top' />
                </Link>
                <div className='flex items-center grow justify-end'>
                    <div className='hidden lg:flex space-x-4'>
                        <ThemeToggle />
                        <AuthButton />
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
                            <AuthButton />
                            {links.map(({ label, href }) => (
                                <Button
                                    href={href}
                                    key={label}
                                    onClick={() => setIsMenuOpen(false)}
                                    variant='text'
                                    tabIndex={isMenuOpen ? 0 : -1}
                                >
                                    {label}
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
