"use client";
import { Button } from "@/components/Button";
import { useShoppingList } from "@/components/Cart/CartContext";
import { supabase } from "@/lib/utils";
import { Elements, LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useEffect, useState } from "react";

type CheckoutFormProps = {
    product: {};
    clientSecret: string;
}

interface ShoppingCart {
    id: number;
    name: string;
    price_in_cents: number;
    image_path: string;
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string); //need to fix, doesn't recognize as String but works if you manually put in the variable

export function CheckoutForm({ product, clientSecret } : CheckoutFormProps) {
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

    const totalPriceInCents = filteredProducts.reduce((total, product) => {
        return total + product.price_in_cents;
    }, 0)

    const totalPriceInDollars = totalPriceInCents / 100;
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
        <Elements options={{ clientSecret}} stripe={stripePromise}>
            <Form totalDollars={totalPriceInDollars}/>
        </Elements>
        </div>
    )
}

function Form({totalDollars}: {totalDollars: number}) {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>();
    const [email, setEmail] = useState<string>('');

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        if (stripe == null || elements == null || email == null) return

        setIsLoading(true)

        // Check for existing order

        stripe.confirmPayment({ elements, confirmParams:
            {return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`}
        }).then(({error}) => {
            if (error.type === 'card_error' || error.type === 'validation_error') {
                console.error('Card error:', error.message)
            } else {
                setErrorMessage('An unknown error occurred')
            }
    }).finally(() => setIsLoading(false))
    }
    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <LinkAuthenticationElement onChange={e => setEmail(e.value.email)}/>
            <Button
                disabled={stripe == null || elements == null || isLoading}
            >
                {isLoading ? "Purchasing..." : `Purchase - ${totalDollars}`}
            </Button>
        </form>
    )
}
