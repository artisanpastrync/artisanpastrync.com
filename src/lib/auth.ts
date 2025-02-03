import NextAuth, { type DefaultSession } from 'next-auth';
import type { Provider } from 'next-auth/providers';
import Google from 'next-auth/providers/google';

import { createStripeCustomer, getCustomerByEmail } from '@/services/customer';

// https://authjs.dev/getting-started/typescript?framework=next-js#module-augmentation
declare module 'next-auth' {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's stripe customer id. */
            stripeCustomerId: string;
        } & DefaultSession['user'];
    }
}

const providers: Provider[] = [
    Google({ authorization: { params: { access_type: 'offline', prompt: 'consent' } } }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
    // trustHost: process.env.NODE_ENV === 'production',
    providers,
    callbacks: {
        async jwt(params) {
            return params.token;
        },
        async session({ session }) {
            if (!session.user || !session.user.email) return session;
            // Find customer associated with user's email address
            let customer = await getCustomerByEmail(session.user.email);
            // ...Or create a new customer
            if (!customer) {
                customer = await createStripeCustomer({
                    email: session.user.email,
                    name: session.user.name ?? 'Customer',
                    metadata: { image: session.user.image ?? null },
                });
            }
            // Assign customer's stripe id to user
            session.user.stripeCustomerId = customer.id;

            return session;
        },
    },
});
