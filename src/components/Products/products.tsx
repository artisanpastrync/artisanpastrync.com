import { supabase } from "@/lib/utils"
import Image from 'next/image'
import { Button } from "../Button"
interface Product {
    id: number
    name: string
    price_in_cents: number
    description: string
    // image: string
}

// export const getProduct = async (): Promise<Product[]> => {
//     const { data: product, error } = await supabase
//         .from('product')
//         .select('id, name, description, price_in_cents')

//     if (error) {
//         throw error
//     }

//     return product
// }
export async function Products() {

    let { data: product, error } = await supabase
        .from('product')
        .select('name, id, price_in_cents, image_path')


    if (product === null) {
        return <div>No products found</div>
    }
    console.log(product)
    return (
        <div>
            <ul>
                {product.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price_in_cents / 100}
                    <img src={product.image_path} alt={product.name} width={100} height={100} />
                    <Button>Add to Cart</Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
