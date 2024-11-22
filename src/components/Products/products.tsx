'use client'

import { useState, useEffect } from "react";
import { supabase } from "@/lib/utils";
import { Button } from "../Button";
import Link from "next/link";
import useCounter, { useShoppingList } from "../Cart/CartContext";

interface Product {
  id: number;
  name: string;
  price_in_cents: number;
  description: string;
  image_path: string;
}

const Products = () => {
  const { increment } = useCounter();
  const { addToList, shoppingList } = useShoppingList();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let { data: product, error } = await supabase
          .from('product')
          .select('name, id, price_in_cents, description, image_path, product_type');

        if (error) throw error;
        setProducts(product);
      } catch (error) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // The empty dependency array ensures this only runs once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (products === null || products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div>
        <h1>{shoppingList}</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price_in_cents / 100}
            <img src={product.image_path} alt={product.name} width={100} height={100} />
            <Button>
              <Link href={`/services/cake/${product.id}/about`}>About</Link>
            </Button>
            <Button onClick={() => addToList(product.id)}>Add to Cart</Button>
            {/* <Button onClick={increment}>Add to Cart</Button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
