import Products from "@/components/Products/products"
import { supabase } from "@/lib/utils"
import { error } from "console"
import { GetServerSideProps } from "next"
import { cache } from "react"



export default async function BreadPage() {
    const products = await supabase.from('products').select('name, description, price_in_cents')
    return (
        <div>
            <h1>Cake Page</h1>
            <Products />
        </div>
    )
}
