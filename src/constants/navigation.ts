import { House, Info, ShoppingBasket } from 'lucide-react';
import { createElement, ReactNode } from 'react';

export interface NavLink {
    label: string;
    href: string;
    icon?: ReactNode;
}

export const LINKS: NavLink[] = [
    { label: 'Home', href: '/', icon: createElement(House) },
    { label: 'About', href: '/about', icon: createElement(Info) },
    { label: 'Products', href: '/products', icon: createElement(ShoppingBasket) },
    // { label: 'Contact Us', href: '/contact' },
];
