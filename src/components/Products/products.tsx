import { supabase } from "@/lib/utils"
import { Button } from "../Button"
import Link from "next/link"

interface Product {
    id: number
    name: string
    price_in_cents: number
    description: string
    // image: string
}


export async function Products() {

    let { data: product, error } = await supabase
        .from('product')
        .select('name, id, price_in_cents, image_path, product_type')


    if (product === null) {
        return <div>No products found</div>
    }

    return (
        <div>
            <ul>
                {product.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price_in_cents / 100}
                    <img src={product.image_path} alt={product.name} width={100} height={100} />
                    <Button>
                        <Link href={`/services/cake/${product.id}/about`}>About</Link>
                    </Button>
                    <Button>Add to Cart</Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
