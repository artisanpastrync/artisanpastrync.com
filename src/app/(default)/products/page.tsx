import { unstable_cache } from 'next/cache';

import { Section } from '@/components/Section';
import { TAGS } from '@/constants/cache-tags';
import { getAllProducts } from '@/services/product';

import { ProductList } from './_components/product-list';

const getProductsCached = unstable_cache(() => getAllProducts(), [], { tags: [TAGS.products] });

export default async function ProductsPage() {
    const products = await getProductsCached();

    return (
        <Section className='bg-primary-50 dark:bg-primary-900 text-primary-900 dark:text-primary-50'>
            <Section.Content>
                <ProductList products={products} />
            </Section.Content>
        </Section>
    );
}
