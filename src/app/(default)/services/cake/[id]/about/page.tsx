"use client"
import { supabase } from "@/lib/utils"
import { useParams } from "next/navigation"
import { useRouter } from "next/router"

export default async function AboutProductPage() {
    const { id } =useParams()
    let { data: product, error } = await supabase
        .from('product')
        .select('id, name, description, price_in_cents')
        .eq('id', id)
        .single()
    if ( product === null) return <div>No product found</div>
    return (
        <div>
            <h1>About Product</h1>
            <h2>{product.name}</h2>
        </div>
    )
}

// async function ProductDescription({
//     params: { id },
// }: { params: { id: string } }
// ) {
//     let { data: product, error } = await supabase
//         .from('product')
//         .select('name, description, price_in_cents')
//     if ( product === null) return <div>No product found</div>
//     return (
//         <div>
//             <h1>{product.name}</h1>
//             <p></p>
//         </div>
//     )
// }
