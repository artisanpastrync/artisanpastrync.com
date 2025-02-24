import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { ChevronRightIcon } from 'lucide-react';
import Link, { type LinkProps } from 'next/link';

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
            className={cn(
                'text-muted-foreground flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5',
                className
            )}
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
            className={cn('hover:text-foreground transition-colors', className)}
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
        <Breadcrumb className={className}>
            <BreadcrumbList className='flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-xs md:text-base/[18px]'>
                {Object.entries(items).map(([title, href], idx) => {
                    const isLast = idx + 1 === Object.keys(items).length;

                    return (
                        <React.Fragment key={title + href}>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    prefetch={false}
                                    aria-current={isLast ? 'page' : undefined}
                                    className={cn(
                                        'text-sm text-neutral-500 hover:underline',
                                        isLast && 'font-medium underline'
                                    )}
                                    href={href}
                                >
                                    {title}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {!isLast && (
                                <BreadcrumbSeparator className='text-transparent [&>svg]:size-4 [&>svg]:fill-black' />
                            )}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
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
