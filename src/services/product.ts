import Stripe from 'stripe';

import { stripe } from '@/lib/stripe/server';
import { nameToSlug } from '@/lib/utils';

export async function getAllProducts(): Promise<Stripe.Product[]> {
    // return Array.fromAsync(stripe.products.list({ active: true, limit: 100 }));
    const products: Stripe.Product[] = [];

    for await (const product of stripe.products.list({ active: true })) {
        products.push(product);
    }

    return products;
}

export async function getAllProductPrices(product: string): Promise<Stripe.Price[]> {
    // return Array.fromAsync(stripe.prices.list({ active: true, product: productId, limit: 100 }));
    const prices: Stripe.Price[] = [];

    for await (const price of stripe.prices.list({ active: true, product })) {
        prices.push(price);
    }

    return prices;
}

export async function getProductsWithPrices() {
    const products = await getAllProducts();

    const productsWithPrices = await Promise.all(
        products.map(async (product) => ({
            ...product,
            price:
                typeof product.default_price === 'string'
                    ? await stripe.prices.retrieve(product.default_price)
                    : undefined,
        }))
    );

    return productsWithPrices;
}

export async function getProductById(productId: string): Promise<Stripe.Product> {
    return await stripe.products.retrieve(productId);
}

export async function getProductByName(name: string) {
    const product = (await stripe.products.search({ limit: 1, query: `name: "${name}"` }))
        .data?.[0];
    return product;
}

export async function getProductBySlug(slug: string): Promise<Stripe.Product | undefined> {
    const products = await getAllProducts();

    return products.find(({ name }) => nameToSlug(name) === slug);
}

// export async function getProductAndVariantBySlug(
//     ...slugs: string[]
// ): Promise<[Stripe.Product, Stripe.Price | undefined]> {
//     const product = await stripe.products.retrieve(slugs[0]);

//     const prices = await getAllProductPrices(product.id);

//     const variant = prices.find((price) => nameToSlug(price.nickname ?? '') === slugs[1]);

//     return [product, variant];
// }

export async function createProduct(params: Stripe.ProductCreateParams): Promise<Stripe.Product> {
    const product = await stripe.products.create(params);

    return product;
}

export async function updateProduct(
    productId: string,
    params: Stripe.ProductUpdateParams
): Promise<void> {
    await stripe.products.update(productId, params);
}

export async function canDeleteProduct(productId: string): Promise<boolean> {
    const prices = await getAllProductPrices(productId);

    return !prices?.length;
}

export async function deleteProduct(productId: string): Promise<void> {
    const canDelete = await canDeleteProduct(productId);

    if (!canDelete) return;

    await stripe.products.del(productId);
}

export async function archiveProduct(productId: string): Promise<void> {
    await stripe.products.update(productId, { active: false });
}

export async function unarchiveProduct(productId: string): Promise<void> {
    await stripe.products.update(productId, { active: false });
}

export async function getVariantById(variantId: string): Promise<Stripe.Price> {
    return await stripe.prices.retrieve(variantId);
}
