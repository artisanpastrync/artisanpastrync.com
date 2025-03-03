import Link from 'next/link';
import Stripe from 'stripe';

import { Button } from '@/components/ui/button';
import { Ban } from 'lucide-react';
import { formatPrices } from '@/lib/stripe/utils';
import { cn } from '@/lib/utils';

type VariantProps = {
    variant: Stripe.Price;
    isActive: boolean;
    href: string;
};

export function Variant({ variant, isActive, href }: VariantProps) {
    const unavailable = !variant?.metadata || !!variant.metadata.available;

    return (
        <Button
            asChild
            variant='secondary'
            className={cn`gap-2 outline-transparent bg-primary-200 dark:bg-primary-950 outline-4 ${isActive && 'outline-primary'}`}
        >
            <Link href={href} prefetch={false} scroll={false}>
                {unavailable && <Ban />}
                {variant?.nickname} - {formatPrices([variant])}
            </Link>
        </Button>
    );
}
