"use client";
import { useShoppingList } from "@/components/Cart/CartContext";
import { supabase } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ShoppingCart {
    id: number;
    name: string;
    price_in_cents: number;
    image_path: string;
}

interface ProductListProps {
    product: ShoppingCart[];
    selectIds: number[];
}
export default function CartPage() {
    const { shoppingList } = useShoppingList();
    const [products, setProducts] = useState<ShoppingCart[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchCart = async () => {
            try {
                let { data: product, error } = await supabase
                    .from('product')
                    .select('name, id, price_in_cents, description, image_path, product_type')
                if (error) throw error;
                setProducts(product);
            } catch (error) {
                setError('Failed to fetch products');
            } finally {
                setLoading(false);
            }
        }
        fetchCart();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
      }

      if (error) {
        return <div>{error}</div>;
      }

      if (products === null || products.length === 0) {
        return <div>No products found</div>;
      }

    // Filter the products to only include those whose IDs are in selectedIds
    const filteredProducts = shoppingList.map((id) =>
        products.find((p) => p.id === id)
        ).filter((p) => p !== undefined) as ShoppingCart[];
    const shoppingListArray = [1,2,3,2,1,3];
    return (
        <div>
            <h1>Cart Page</h1>
            <h1>{shoppingList}</h1>
            {filteredProducts.map((product, index) => (
                <ul>
          <li key={product.id}>
            {product.name} - ${product.price_in_cents / 100}
            <img src={product.image_path} alt={product.name} width={100} height={100} />
            </li>
            </ul>
            ))}
        </div>
    )
}
