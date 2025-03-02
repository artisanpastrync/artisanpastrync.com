import Image from 'next/image';
import Link from 'next/link';
import Stripe from 'stripe';

import { formatPrices } from '@/lib/stripe/utils';
import { nameToSlug } from '@/lib/utils';
import { getAllProductPrices } from '@/services/product';

export const ProductList = ({ products }: { products: Stripe.Product[] }) => {
    return (
        <ul className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {products.map((product) => (
                <li key={product.id}>
                    <ProductCard key={product.id} product={product} />
                </li>
            ))}
        </ul>
    );
};

export const ProductCard = async ({ product }: { product: Stripe.Product }) => {
    const prices = await getAllProductPrices(product.id);

    return (
        <Link href={`/products/${nameToSlug(product.name)}`}>
            <article className='group rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-950 dark:text-primary-100 overflow-hidden'>
                {product.images[0] && (
                    <div className='relative aspect-square w-full overflow-hidden'>
                        <Image
                            className='hover-perspective w-full h-full object-cover object-center transition-opacity group-hover:opacity-75 p-4 pb-0'
                            src={product.images[0]}
                            fill
                            alt={product.name}
                        />
                    </div>
                )}
                <div className='p-4 flex flex-row justify-between items-center gap-2'>
                    <h2 className='text-xl font-medium'>{product.name}</h2>
                    <p>{formatPrices(prices)}</p>
                </div>
            </article>
        </Link>
    );
};
