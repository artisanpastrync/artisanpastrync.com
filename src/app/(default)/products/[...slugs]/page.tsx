import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Stripe from 'stripe';

import { BackButton } from '@/components/shared/back-button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { TAGS } from '@/constants/cache-tags';
import { nameToSlug } from '@/lib/utils';
import { getProductBySlug, getAllProducts, getAllProductPrices } from '@/services/product';

import { VariantsSection } from '../_components/variants-section';
import { ProductTitle } from '../_components/product-title';
import { ProductImages } from '../_components/product-images';
import { RightSection } from '../_components/right-section';
import { AddToCartButton } from '../_components/add-to-cart-button';
import { formatStripeAmountForDisplay } from '@/lib/stripe/utils';

const getProductBySlugCached = unstable_cache((slug: string) => getProductBySlug(slug), [], {
    tags: [TAGS.products],
});

// import { SimilarProductsSection } from 'app/product/_components/similar-products-section';
// import { SimilarProductsSectionSkeleton } from 'app/product/_components/similar-product-section-skeleton';
// import { FaqSection } from 'app/product/_components/faq-section';
// import { ReviewsSection } from 'app/product/_components/reviews-section';

export const revalidate = 86400;
export const dynamic = 'force-static';
export const dynamicParams = true;

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

    const variants = await getAllProductPrices(product.id);

    const selected = variants.find((variant) => nameToSlug(variant.nickname ?? '') === variantSlug);

    // const [product, variant] = await getProductAndVariantBySlug(...slugs);

    const hasOnlyOneVariant = variants.length <= 1;
    const price = selected?.unit_amount || null;

    return (
        <div className='relative mx-auto max-w-container-md px-4 xl:px-0'>
            <div className='mb:pb-8 relative flex w-full items-center justify-center gap-10 py-4 md:pt-12'>
                {/* <BackButton className='left-2 mb-8 hidden md:block xl:absolute' /> */}
                <div className='mx-auto w-full max-w-container-sm'>
                    <Breadcrumbs className='mb-8' items={makeBreadcrumbs(product)} />
                </div>
            </div>
            <main className='mx-auto max-w-container-sm'>
                <div className='grid grid-cols-1 gap-4 md:mx-auto md:max-w-screen-xl md:grid-cols-12 md:gap-8'>
                    <ProductTitle
                        className='md:hidden'
                        title={product.name}
                        price={formatStripeAmountForDisplay(price, selected?.currency)}
                    />
                    <ProductImages images={product.images} />
                    <RightSection className='md:col-span-6 md:col-start-8 md:mt-0'>
                        <ProductTitle
                            className='hidden md:col-span-4 md:col-start-9 md:block'
                            title={product.name}
                            price={formatStripeAmountForDisplay(price, selected?.currency)}
                        />
                        {!hasOnlyOneVariant && (
                            <VariantsSection
                                product={product}
                                variants={variants}
                                selectedVariant={selected}
                            />
                        )}
                        <p>{product.description}</p>
                        <AddToCartButton className='mt-4' variant={selected} />
                        {/* <FavoriteMarker handle={product.handle} /> */}
                        {/* <FaqSection /> */}
                    </RightSection>
                </div>
                {/* <Suspense>
                    <ReviewsSection
                        avgRating={product.avgRating}
                        productHandle={product.handle}
                        productId={product.id}
                        slug={slugs}
                        summary={product.reviewsSummary}
                    />
                </Suspense> */}
                {/* <Suspense fallback={<SimilarProductsSectionSkeleton />}>
                    <SimilarProductsSection objectID={product.objectID} slug={slugs} />
                </Suspense> */}
            </main>
        </div>
    );
}

function makeBreadcrumbs(product: Stripe.Product) {
    return {
        Home: '/',
        Products: '/products',
        [product.name]: '',
    };
}
