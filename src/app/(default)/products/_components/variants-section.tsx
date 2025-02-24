'use client';

import Stripe from 'stripe';

import { cn, nameToSlug } from '@/lib/utils';

import { Variant } from './variant';

interface VariantsSectionProps {
    product: Stripe.Product;
    variants: Stripe.Price[];
    className?: string;
    selectedVariant: Stripe.Price | undefined;
}

const getVariantPath = (productName: string, variantName: string | null): string => {
    return `/products/${nameToSlug(productName)}${variantName ? '/' + nameToSlug(variantName) : ''}`;
};

export function VariantsSection({
    product,
    variants,
    className,
    selectedVariant,
}: VariantsSectionProps) {
    return (
        <div className={cn('flex flex-col gap-4', className)}>
            <p className='text-center text-sm text-neutral-500 md:text-left'>Select variant</p>
            <div className='relative flex w-full flex-wrap justify-center gap-2 md:justify-start'>
                {variants.map((variant) => (
                    <Variant
                        key={variant.id}
                        href={getVariantPath(product.name, variant?.nickname)}
                        variant={variant}
                        isActive={variant.id === selectedVariant?.id}
                    />
                ))}
            </div>
        </div>
    );
}
