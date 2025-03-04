import Stripe from 'stripe';

import { getUser } from '@/lib/auth';
import { stripe } from '@/lib/stripe/server';

export async function getCustomerByEmail(email: string): Promise<Stripe.Customer> {
    const customers = await stripe.customers.list({ email, limit: 1 });

    return customers?.data[0];
}

export async function getCustomerById(customerId: string): Promise<Stripe.Customer> {
    const customer = (await stripe.customers.retrieve(customerId)) as Stripe.Customer;

    return customer;
}

async function getStripeCustomerByEmail(email: string): Promise<Stripe.Customer | undefined> {
    const result = await stripe.customers.list({ email, limit: 1 });

    const customer = result?.data[0];

    if (!customer) return;

    return customer;
}

export async function getUserStripeCustomer(): Promise<Stripe.Customer | undefined> {
    const user = await getUser();

    const email = user?.email;

    if (!email) return undefined;

    const customer = await getStripeCustomerByEmail(email);

    return customer;
}

export async function getUserStripeCustomerId(): Promise<string | undefined> {
    const user = await getUser();

    const customerId = user?.stripeCustomerId;

    return customerId;
}

export async function createStripeCustomer(
    params: Stripe.CustomerCreateParams
): Promise<Stripe.Customer> {
    const customer = await stripe.customers.create(params);

    return customer;
}

export async function findOrCreateCustomerByEmail(email: string): Promise<Stripe.Customer> {
    const customers = await stripe.customers.list({ email, limit: 1 });

    let customer = customers.data.length > 0 ? customers.data[0] : null;

    if (!customer) {
        customer = await createStripeCustomer({ email });
    }

    return customer;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CustomerProfile {}

function extractProfileFromCustomer(customer?: Stripe.Customer): CustomerProfile {
    return JSON.parse(customer?.metadata.profile ?? '{}');
}

export async function getCustomerProfile(customer?: Stripe.Customer): Promise<CustomerProfile> {
    return extractProfileFromCustomer(customer);
}

export async function getUserProfile(): Promise<CustomerProfile> {
    const customer = await getUserStripeCustomer();

    return getCustomerProfile(customer);
}

export async function updateCustomerProfile(
    customer: Stripe.Customer,
    profileChanges: Partial<CustomerProfile>
): Promise<void> {
    const oldProfile = extractProfileFromCustomer(customer);

    const profile = JSON.stringify({ ...oldProfile, ...profileChanges });

    if (profile.length > 500) throw new Error('Profile data too long, please try again!');

    await stripe.customers.update(customer.id, { metadata: { profile } });
}
