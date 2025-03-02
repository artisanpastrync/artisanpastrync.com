import Stripe from 'stripe';

// https://github.com/vercel/next.js/blob/canary/examples/with-stripe-typescript/utils/stripe-helpers.ts
export function formatStripeAmountForDisplay(
    amount?: number | null,
    currency?: string | null
): string {
    // Todo: Localize this currency
    const numberFormat = new Intl.NumberFormat(['en-US'], {
        style: 'currency',
        currency: currency ?? 'USD',
        currencyDisplay: 'symbol',
    });
    return numberFormat.format((amount ?? 0) / 100);
}

export function formatAmountForStripe(amount: number, currency: string): number {
    // Todo: Localize this currency
    const numberFormat = new Intl.NumberFormat(['en-US'], {
        style: 'currency',
        currency: currency.toLocaleUpperCase(),
        currencyDisplay: 'symbol',
    });
    const parts = numberFormat.formatToParts(amount);
    let zeroDecimalCurrency: boolean = true;
    for (const part of parts) {
        if (part.type === 'decimal') {
            zeroDecimalCurrency = false;
        }
    }
    return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}

export const formatPrices = (prices: Stripe.Price[]): string => {
    const minPrice = Math.min(...prices.map((price) => (price?.unit_amount ?? 0) / 100));
    const maxPrice = Math.max(...prices.map((price) => (price?.unit_amount ?? 0) / 100));

    return minPrice === maxPrice
        ? `$${minPrice}`
        : `$${Math.round(minPrice)} - $${Math.round(maxPrice)}`;
};
