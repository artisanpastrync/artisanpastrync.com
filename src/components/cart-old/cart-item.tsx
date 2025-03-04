import Image from 'next/image';
import Link from 'next/link';

import { cn, nameToSlug } from '@/lib/utils';
import { type CartItem } from '@/services/cart';

import { ChangeQuantityButton } from './change-quantity-button';
import { DeleteButton } from './delete-button';

interface CartItemProps extends CartItem {
    onProductClick: () => void;
    className?: string;
}

export function CartItem({ product, variant, quantity, className, onProductClick }: CartItemProps) {
    const productPath = `/products/${nameToSlug(product.name)}${variant?.nickname ? '/' + nameToSlug(variant.nickname!) : ''}`;
    return (
        <li className={cn('flex items-center justify-between gap-6 py-2', className)}>
            {product.images?.length && (
                <div className='flex h-[115px] w-[90px] shrink-0 items-center bg-neutral-100'>
                    <Image
                        src={product.images[0]}
                        alt={product.name + ' - ' + variant.nickname}
                        width={115}
                        height={90}
                        sizes='100px'
                    />
                </div>
            )}
            <div className='flex flex-1 flex-col items-start justify-around gap-0.5 text-[13px]'>
                <Link href={productPath} onClick={onProductClick}>
                    <h2 className='line-clamp-1 hover:underline'>{product.name}</h2>
                    <p className='line-clamp-1 text-neutral-500'>{variant.nickname}</p>
                </Link>
                <p className='py-2 font-bold'>
                    {variant.unit_amount + ' ' + variant.currency.toUpperCase()}
                </p>
                <div className='flex w-full items-center justify-between'>
                    <DeleteButton variantId={variant.id} />

                    <div className='boder-black flex h-[32px] w-[100px] justify-between border p-4 text-[14px] text-neutral-500'>
                        <ChangeQuantityButton
                            variantId={variant.id}
                            quantity={quantity - 1}
                            children={'-'}
                        />
                        <div className='flex cursor-not-allowed items-center gap-2 text-black'>
                            {quantity}
                        </div>
                        <ChangeQuantityButton
                            variantId={variant.id}
                            quantity={quantity + 1}
                            children={'+'}
                        />
                    </div>
                </div>
            </div>
        </li>
    );
}
