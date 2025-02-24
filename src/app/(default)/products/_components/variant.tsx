import Link from 'next/link';
import Stripe from 'stripe';

import { cn } from '@/lib/utils';

type VariantProps = {
    variant: Stripe.Price | undefined;
    isActive: boolean;
    href: string;
};

export function Variant({ variant, isActive, href }: VariantProps) {
    const unavailable = !variant?.metadata || !!variant.metadata.available;

    return (
        <Link
            href={href}
            prefetch={false}
            scroll={false}
            className={cn(
                'relative flex h-[40px] min-w-[80px] cursor-pointer items-center justify-center rounded-md border border-black bg-white p-1.5 text-[11px] font-medium transition-colors hover:bg-neutral-800 hover:text-white',
                { 'bg-neutral-800 text-white': isActive },
                { 'stroke-black opacity-80 hover:bg-transparent hover:text-black': unavailable }
            )}
        >
            {variant?.nickname}
            {unavailable && (
                <svg className={'absolute inset-0 block size-full'}>
                    <line x1='0' y1='100%' x2='100%' y2='0'></line>
                </svg>
            )}
        </Link>
    );
}
