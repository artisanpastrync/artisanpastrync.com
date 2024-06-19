'use client';

import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

import { Button, ButtonProps } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';

import './navbar.css';

const defaultLinks: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact Us', href: '/contact' },
];

const defaultButtons: NavButton[] = [
    { label: 'Sign up', variant: 'inverted' },
    { label: 'Log in' },
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
    buttons?: NavButton[];
    enableScroll?: boolean;
    className?: string;
}

export const Navbar: FC<NavbarProps> = ({
    className,
    buttons = defaultButtons,
    links = defaultLinks,
    enableScroll = false,
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const updateIsScrolled = () => {
            setIsScrolled(window.scrollY > 50);
        };

        updateIsScrolled();

        const handleScroll = () => {
            updateIsScrolled();
        };

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
                isSolid ? 'solid' : 'transparent',
                isScrolled ? 'scrolled' : 'not-scrolled',
                isMenuOpen ? 'menu-open' : 'menu-closed',
                enableScroll ? 'fixed' : 'relative',
                className
            )}
        >
            <div className='h-full container mx-auto px-4 py-4 flex justify-between items-center'>
                <div className='flex items-center flex-grow'>
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
                <div className='flex items-center flex-grow justify-end'>
                    <div className='hidden lg:flex space-x-4'>
                        {buttons.map(({ label, ...buttonProps }) => (
                            <Button {...buttonProps} key={label}>
                                {label}
                            </Button>
                        ))}
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
                    'menu-overlay -z-10 lg:hidden fixed inset-0 bg-primary-50 bg-opacity-90 flex transition-[opacity,transform] duration-500 ease-in-out overflow-hidden opacity-0 -translate-y-full'
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
                            {buttons.map(({ label, ...buttonProps }) => (
                                <Button
                                    {...buttonProps}
                                    key={label}
                                    onClick={() => setIsMenuOpen(false)}
                                    tabIndex={isMenuOpen ? 0 : -1}
                                >
                                    {label}
                                </Button>
                            ))}
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
