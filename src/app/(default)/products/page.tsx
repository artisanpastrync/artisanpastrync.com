import { unstable_cache } from 'next/cache';
import Link from 'next/link';

import { TAGS } from '@/constants/cache-tags';
import { nameToSlug } from '@/lib/utils';
import { getAllProducts } from '@/services/product';
import { ProductList } from './_components/product-list';

const getProductsCached = unstable_cache(() => getAllProducts(), [], { tags: [TAGS.products] });

export default async function ProductsPage() {
    const products = await getProductsCached();

    // return (
    //     <div>
    //         <ul>
    //             {products.map((product) => (
    //                 <li key={product.id}>
    //                     <Link href={`/products/${nameToSlug(product.name)}`}>{product.name}</Link>
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // );

    return <ProductList products={products} />;
}
