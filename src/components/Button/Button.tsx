import Link from 'next/link';
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type BaseProps = {
    children: React.ReactNode;
    href?: string;
    className?: string;
    disabled?: boolean;
    variant?: keyof typeof variantClasses;
};

export type ButtonProps = BaseProps &
    AnchorHTMLAttributes<HTMLAnchorElement> &
    ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses = {
    solid: 'bg-primary text-primary-950 hover:bg-primary-300 hover:text-primary-800',
    outlined:
        'border-primary border-4 text-primary hover:border-primary-300 hover:text-primary-300',
    text: 'p-0 shadow-none text-primary-950 hover:text-primary-800',
    inverted: 'bg-primary-50 text-primary-950 hover:bg-primary-100 hover:text-primary-800',
};

export function Button({
    children,
    className,
    href,
    variant = 'solid',
    disabled = false,
    ...rest
}: ButtonProps) {
    const classNames = cn(
        `button button-${variant}`,
        'font-bold py-2 px-4 shadow-lg text-center transition-colors',
        variantClasses[variant],
        disabled && 'opacity-50',
        className
    );

    if (href) {
        return (
            <Link
                className={classNames}
                href={href}
                {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                {children}
            </Link>
        );
    }

    return (
        <button className={classNames} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
            {children}
        </button>
    );
}
