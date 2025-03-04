import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { Fragment, Suspense } from 'react';
import Stripe from 'stripe';

import { BackButton } from '@/components/shared/back-button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { TAGS } from '@/constants/cache-tags';
import { formatPrices, formatStripeAmountForDisplay } from '@/lib/stripe/utils';
import { nameToSlug } from '@/lib/utils';
import { getProductBySlug, getAllProducts, getAllProductVariants } from '@/services/product';

import { VariantsSection } from '../_components/variants-section';
import { ProductTitle } from '../_components/product-title';
import { ProductImages } from '../_components/product-images';
import { AddToCartButton } from '../_components/add-to-cart-button';
import { Section } from '@/components';

const getProductBySlugCached = unstable_cache((slug: string) => getProductBySlug(slug), [], {
    tags: [TAGS.products],
});

// import { SimilarProductsSection } from 'app/product/_components/similar-products-section';
// import { SimilarProductsSectionSkeleton } from 'app/product/_components/similar-product-section-skeleton';
// import { FaqSection } from 'app/product/_components/faq-section';
// import { ReviewsSection } from 'app/product/_components/reviews-section';

export interface ProductDetailsPageProps {
    params: Promise<{ slugs: string[] }>;
}

export async function generateStaticParams() {
    const products = await getAllProducts();

    return products.map((product) => ({ name: nameToSlug(product.name) }));
}

export default async function Product({ params }: ProductDetailsPageProps) {
    const { slugs } = await params;

    const [productSlug, variantSlug] = slugs;

    const product = await getProductBySlugCached(productSlug);

    if (!product) return notFound();

    const variants = await getAllProductVariants(product.id);

    const selected =
        variants.length > 1
            ? variants.find((variant) => nameToSlug(variant.nickname ?? '') === variantSlug)
            : variants[0];

    // const [product, variant] = await getProductAndVariantBySlug(...slugs);

    const hasOnlyOneVariant = variants.length <= 1;
    const selectedPrice = selected ? formatPrices([selected]) : null;
    const priceRange = formatPrices(variants);

    return (
        <Fragment>
            <Section
                as='nav'
                className='bg-primary-100 dark:bg-primary-950 text-primary-950 dark:text-primary-50'
            >
                <Section.Content className='flex flex-row justify-between py-4'>
                    <Breadcrumbs items={makeBreadcrumbs(product)} />
                </Section.Content>
            </Section>
            <Section as='main' className='bg-primary-50 dark:bg-primary-900'>
                <Section.Content className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <div className='flex flex-col gap-4'>
                        <ProductTitle title={product.name} price={priceRange} />
                        {!hasOnlyOneVariant && (
                            <VariantsSection
                                product={product}
                                variants={variants}
                                selectedVariant={selected}
                            />
                        )}

                        <p>{product.description}</p>

                        <AddToCartButton variant={selected} />
                    </div>

                    <div className='flex flex-col gap-4 lg:row-start-1'>
                        <ProductImages images={product.images} />
                        {/* todo: reviews section */}
                    </div>
                </Section.Content>
            </Section>
        </Fragment>
    );
}

function makeBreadcrumbs(product: Stripe.Product) {
    return {
        Home: '/',
        Products: '/products',
        [product.name]: '',
    };
}

// todo: variant descriptions, images, etc
