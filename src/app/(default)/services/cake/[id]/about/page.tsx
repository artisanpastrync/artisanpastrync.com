"use client"
import { supabase } from "@/lib/utils"
import { useParams } from "next/navigation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

// export default async function AboutProductPage() {
//     const { id } =useParams()
//     let { data: product, error } = await supabase
//         .from('product')
//         .select('id, name, description, price_in_cents')
//         .eq('id', id)
//         .single()
//     if ( product === null) return <div>No product found</div>
//     return (
//         <div>
//             <h1>About Product</h1>
//             <h2>{product.name}</h2>
//         </div>
//     )
// }
interface Product {
  id: number;
  name: string;
  price_in_cents: number;
  description: string;
  image_path: string;
}

export default function AboutProductPage() {
    const { id } = useParams()
    const [ error, setError ] = useState<string | null>(null)
    const [ loading, setLoading ] = useState(true)
    const [ product, setProducts ] = useState<Product | null>(null)
    useEffect(() => {
        const fetchAboutProduct = async () => {
            try {
                let { data: product, error } = await supabase
                    .from('product')
                    .select('id, name, description, price_in_cents, image_path')
                    .eq('id', id)
                    .single()
                if ( product === null) return <div>No product found</div>
                setProducts(product)
            } catch (error) {
                setError('Failed to fetch product')
            } finally {
                setLoading(false)
            }
        }

        fetchAboutProduct()
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (product === null) {
        return <div>No products found</div>;
    }

    return (
        <div>
            <h1>About Product</h1>
            <h2>{product.name}</h2>
        </div>
    )
}
