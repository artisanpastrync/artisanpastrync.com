// used for testing context
import { useShoppingList } from '@/components/Cart/CartContext';
import { CheckoutForm } from './_components/CheckoutForm';
import { Stripe } from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
const product = [
  { id: 1, name: 'Product 1', price: 10, image: 'product1.jpg', quantity: 2 },
  { id: 2, name: 'Product 2', price: 20, image: 'product2.jpg', quantity: 1 },
];

export default async function PurchasePage(
  {
  params: { id },
}: { params: { id: string } }) {
  // const { shoppingList } = useShoppingList();

  // const filteredProducts = shoppingList.map((id) =>
  //   products.find((product) => product.id === id)
  // ).filter((p) => p !== undefined) as ShoppingCart[];

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000,
      currency: 'usd',
      metadata: { productID: id },
    })

    if (paymentIntent.client_secret === null){
      throw new Error('Client secret is null')
    }
  return (
    <div>
      <h1>Checkout Page</h1>
      <CheckoutForm product={product}
      clientSecret={paymentIntent.client_secret} />
      {/* {filteredProducts.map((product, index) => (
        <ul>
          <li key={product.id}>
            {product.name} - ${product.price_in_cents / 100}
          </li>
        </ul>
      ))} */}
    </div>
  )
}
