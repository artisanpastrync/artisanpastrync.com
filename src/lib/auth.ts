/* eslint-disable @typescript-eslint/no-empty-object-type */
import NextAuth from 'next-auth';
import type { JWT as _ } from 'next-auth/jwt';
import type { Provider } from 'next-auth/providers';
import Google from 'next-auth/providers/google';

import { createStripeCustomer, getCustomerByEmail } from '@/services/customer';

// https://authjs.dev/getting-started/typescript?framework=next-js#module-augmentation
declare module 'next-auth' {
    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    interface User {
        /** The user's stripe customer id. */
        stripeCustomerId: string;
        isAdmin: boolean;
    }
    /**
     * The shape of the account object returned in the OAuth providers' `account` callback,
     * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
     */
    interface Account {}

    /**
     * Returned by `useSession`, `auth`, contains information about the active session.
     */
    interface Session {}
}

declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        stripeCustomerId: string;
        isAdmin: boolean;
    }
}

const providers: Provider[] = [
    Google({ authorization: { params: { access_type: 'offline', prompt: 'consent' } } }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers,
    callbacks: {
        async jwt(params) {
            const { token, trigger } = params;
            if (!trigger || !token?.email) return token;

            console.log('==== JWT ====');
            console.log(JSON.stringify(params));

            // Find customer associated with user's email address
            let customer = await getCustomerByEmail(token.email);
            // ...Or create a new customer
            if (!customer) {
                customer = await createStripeCustomer({
                    email: token.email,
                    name: token.name ?? 'Customer',
                    metadata: { image: token.picture ?? null },
                });
            }

            // todo: update stripe profile each time, as this part of the callback hits on each login
            // await stripe.customers.update(customer.id, { metadata: {} });

            token.stripeCustomerId = customer.id;
            token.isAdmin = !!customer.metadata.isAdmin;

            return token;
        },
        async session(params) {
            const { session, token } = params;

            session.user.stripeCustomerId = token.stripeCustomerId;
            session.user.isAdmin = token.isAdmin;

            return session;
        },
    },
});

export const getUser = async () => (await auth())?.user;
