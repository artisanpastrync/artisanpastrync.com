// import Stripe from 'stripe';

// import { stripe } from '@/lib/stripe/server';

// import { getUserStripeCustomer } from './customer';

// const CART_PREFIX = 'cart_';

// function extractCustomerCartItems(customer: Stripe.Customer): CartItem[] {
//     return Object.entries(customer.metadata ?? {})
//         .filter(([key]) => key.startsWith(CART_PREFIX))
//         .map(([key, value]) => ({
//             productId: key.replace(CART_PREFIX, ''),
//             quantity: parseInt(value, 10),
//         }));
// }

// async function updateCustomerMetadata(customerId: string, metadata: Record<string, string>) {
//     return stripe.customers.update(customerId, { metadata });
// }

// async function withUserCustomer<T, Args extends unknown[]>(
//     callback: (customer: Stripe.Customer, ...args: Args) => T | Promise<T>,
//     ...args: Args
// ): Promise<T> {
//     const customer = await getUserStripeCustomer();

//     if (!customer) throw new Error('Please login before using cart.');

//     return await callback(customer, ...args);
// }

// export async function getCustomerCart(customer: Stripe.Customer): Promise<CartItem[]> {
//     const cart = extractCustomerCartItems(customer);

//     return cart;
// }

// export async function getUserCart(): Promise<CartItem[]> {
//     return await withUserCustomer(getCustomerCart);
// }

// export async function clearCustomerCart(customer: Stripe.Customer): Promise<void> {
//     const oldCart = extractCustomerCartItems(customer);

//     const productIds = oldCart.map((item) => item.productId);

//     await removeItemsFromCustomerCart(customer, ...productIds);
// }

// export async function clearUserCart(): Promise<void> {
//     return await withUserCustomer(clearCustomerCart);
// }

// export async function addItemCustomerCart(
//     customer: Stripe.Customer,
//     productId: string,
//     quantity: number
// ): Promise<void> {
//     const oldCart = extractCustomerCartItems(customer);

//     if (quantity < 1) return;

//     const found = oldCart.find((cartItem) => cartItem.productId === productId);

//     if (found) return await editItemInCustomerCart(customer, productId, quantity + found.quantity);

//     await updateCustomerMetadata(customer.id, { [CART_PREFIX + productId]: quantity.toString() });
// }

// export async function addItemToUserCart(productId: string, quantity: number): Promise<void> {
//     return await withUserCustomer(addItemCustomerCart, productId, quantity);
// }

// export async function removeItemsFromCustomerCart(
//     customer: Stripe.Customer,
//     ...productIds: string[]
// ): Promise<void> {
//     const removeMap = productIds.reduce(
//         (acc, curr) => {
//             acc[CART_PREFIX + curr] = '';
//             return acc;
//         },
//         {} as Record<string, string>
//     );

//     await updateCustomerMetadata(customer.id, removeMap);
// }

// export async function removeItemsFromUserCart(...productIds: string[]): Promise<void> {
//     return await withUserCustomer(removeItemsFromCustomerCart, ...productIds);
// }

// export async function editItemInCustomerCart(
//     customer: Stripe.Customer,
//     productId: string,
//     quantity: number
// ): Promise<void> {
//     const oldCart = extractCustomerCartItems(customer);

//     const index = oldCart.findIndex((cartItem) => cartItem.productId === productId);

//     if (index === -1) return await addItemCustomerCart(customer, productId, quantity);

//     if (quantity < 1) return await removeItemsFromCustomerCart(customer, productId);

//     await updateCustomerMetadata(customer.id, { [CART_PREFIX + productId]: quantity.toString() });
// }

// export async function editUserCartItem(productId: string, quantity: number): Promise<void> {
//     return await withUserCustomer(editItemInCustomerCart, productId, quantity);
// }

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
