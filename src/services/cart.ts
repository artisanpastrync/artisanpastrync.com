import { stripe } from '@/lib/stripe/server';
import { cookies } from 'next/headers';
import Stripe from 'stripe';

const CART_COOKIE_NAME = 'cart';
const maxAge = 28 * 24 * 60 * 60;

export interface CartEntry {
    priceId: string;
    quantity: number;
}

async function getCartEntries(): Promise<CartEntry[]> {
    const cookieStore = await cookies();
    const cart = cookieStore.get(CART_COOKIE_NAME)?.value;

    try {
        return cart ? JSON.parse(cart) : [];
    } catch {
        return [];
    }
}

async function saveCartEntries(cartItems: CartEntry[]): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.set(CART_COOKIE_NAME, JSON.stringify(cartItems), { maxAge });
}

export interface CartItem {
    product: Stripe.Product;
    variant: Stripe.Price;
    quantity: number;
}

export async function getCartItems(): Promise<CartItem[]> {
    const entries = await getCartEntries();

    const items = (
        await Promise.all(
            entries.map(async ({ quantity, priceId }) => {
                const variant = await stripe.prices.retrieve(priceId);
                if (!variant) return;
                const product = await stripe.products.retrieve(variant.product as string);
                return { product, variant, quantity };
            })
        )
    ).filter(Boolean);

    return JSON.parse(JSON.stringify(items)) as CartItem[];
}

export async function addItemToCart(priceId: string, quantity: number): Promise<void> {
    const cartItems = await getCartEntries();

    const existingItem = cartItems.find((item) => item.priceId === priceId);

    if (existingItem) return await editItemInCart(priceId, existingItem.quantity + quantity);

    cartItems.push({ priceId, quantity });

    await saveCartEntries(cartItems);
}

export async function editItemInCart(priceId: string, quantity: number): Promise<void> {
    const cartItems = await getCartEntries();

    const existingItem = cartItems.find((item) => item.priceId === priceId);

    if (!existingItem) return await addItemToCart(priceId, quantity);

    existingItem.quantity = quantity;

    await saveCartEntries(cartItems);
}

export async function removeItemsFromCart(...priceIds: string[]): Promise<void> {
    const cartItems = await getCartEntries();

    const filteredCart = cartItems.filter((item) => !priceIds.includes(item.priceId));

    await saveCartEntries(filteredCart);
}

export async function clearCart(): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.delete(CART_COOKIE_NAME);
}

export async function getCartStripeLineItems(): Promise<
    Stripe.Checkout.SessionCreateParams.LineItem[]
> {
    const cartEntries = await getCartEntries();

    const lineItems = cartEntries.map((entry) => ({
        price: entry.priceId,
        quantity: entry.quantity,
    }));

    return lineItems;
}
