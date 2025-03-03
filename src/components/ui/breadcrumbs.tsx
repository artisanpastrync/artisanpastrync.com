import { Slot } from '@radix-ui/react-slot';
import { ChevronRightIcon } from 'lucide-react';
import Link, { type LinkProps } from 'next/link';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Breadcrumb = React.forwardRef<
    HTMLElement,
    React.ComponentPropsWithoutRef<'nav'> & {
        separator?: React.ReactNode;
    }
>(({ ...props }, ref) => <nav ref={ref} aria-label='breadcrumb' {...props} />);
Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<'ol'>>(
    ({ className, ...props }, ref) => (
        <ol
            ref={ref}
            className={cn('flex flex-wrap items-center gap-2 break-words text-sm ', className)}
            {...props}
        />
    )
);
BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
    ({ className, ...props }, ref) => (
        <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
    )
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = React.forwardRef<
    HTMLAnchorElement,
    LinkProps & {
        asChild?: boolean;
        className?: string;
        children: React.ReactNode;
    }
>(({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : Link;

    return (
        <Comp
            ref={ref}
            className={cn('hover:opacity-75 transition-opacity', className)}
            {...props}
        />
    );
});
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
    ({ className, ...props }, ref) => (
        <span
            ref={ref}
            role='link'
            aria-disabled='true'
            aria-current='page'
            className={cn('text-foreground font-normal', className)}
            {...props}
        />
    )
);
BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<'li'>) => (
    <li
        role='presentation'
        aria-hidden='true'
        className={cn('[&>svg]:size-4', className)}
        {...props}
    >
        {children ?? <ChevronRightIcon />}
    </li>
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

interface BreadcrumbsProps {
    items: Record<string, string>;
    className?: string;
}

function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    return (
        <BreadcrumbList className={cn`flex items-center whitespace-nowrap gap-0 ${className}`}>
            {Object.entries(items).map(([title, href], idx) => {
                const isLast = idx + 1 === Object.keys(items).length;

                return (
                    <React.Fragment key={title + href}>
                        <Button
                            asChild
                            variant='link'
                            className={cn`text-current font-light ${isLast && 'font-bold'}`}
                        >
                            <Link href={href}>{title}</Link>
                        </Button>
                        {!isLast && <BreadcrumbSeparator className='text-primary' />}
                    </React.Fragment>
                );
            })}
        </BreadcrumbList>
    );
}

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Breadcrumbs,
};
