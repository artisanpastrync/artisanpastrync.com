'use server';

import { revalidatePath } from 'next/cache';

import { Section, SectionContent } from '@/components';
import { getUser, signOut } from '@/lib/auth';
import { getProductsWithPrices } from '@/services/product';
import { addItemToCart, clearCart, getCartItems } from '@/services/cart';
import { GoogleLoginButton } from '@/components/auth/google-login';

async function signOutAction() {
    'use server';
    await signOut();
    revalidatePath('/');
}

async function addToCartAction(formData: FormData) {
    'use server';
    const id = formData.get('id');
    if (typeof id !== 'string') return;
    await addItemToCart(id, 1);
    revalidatePath('/');
}

async function clearCartAction() {
    'use server';
    await clearCart();
    revalidatePath('/');
}

// https://nextjs.org/docs/app/api-reference/file-conventions/page
export default async function LoginPage() {
    const user = await getUser();

    const cart = await getCartItems();
    const products = await getProductsWithPrices();

    return (
        <Section>
            <SectionContent>
                {user ? (
                    <form action={signOutAction}>
                        <button>Sign Out</button>
                    </form>
                ) : (
                    <GoogleLoginButton />
                )}
                <p>session: {JSON.stringify(user)}</p>
                <p>cart: {JSON.stringify(cart)}</p>
                <form action={clearCartAction}>
                    <button type='submit'>clear cart</button>
                </form>
                {products.map((product) => (
                    <form action={addToCartAction} key={product.id}>
                        <input name='id' type='text' value={product.id} readOnly />
                        <button type='submit'>{product.name}</button>
                    </form>
                ))}
            </SectionContent>
        </Section>
    );
}
