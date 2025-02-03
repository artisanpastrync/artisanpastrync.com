import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isValidEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

export const getURL = (path: string = '') => {
    // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
    let url =
        process?.env?.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
            ? process.env.NEXT_PUBLIC_SITE_URL
            : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
              process?.env?.NEXT_PUBLIC_VERCEL_URL &&
                process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
              ? process.env.NEXT_PUBLIC_VERCEL_URL
              : // If neither is set, default to localhost for local development.
                'http://localhost:3000/';

    // Trim the URL and remove trailing slash if exists.
    url = url.replace(/\/+$/, '');
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`;
    // Ensure path starts without a slash to avoid double slashes in the final URL.
    path = path.replace(/^\/+/, '');

    // Concatenate the URL and the path.
    return path ? `${url}/${path}` : url;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const objectToFormData = (object: Record<string, any>) =>
    Object.entries(object).reduce((formData, [key, value]) => {
        formData.append(key, value);
        return formData;
    }, new FormData());

/**
 * Object to Plain Old Javascript Object
 * @description used to pass data from server to client
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function objectToPojo<T extends Record<string, any>>(obj: T): T {
    const plainObject: Record<string, unknown> = {};

    Object.getOwnPropertyNames(obj).forEach((key) => {
        const value = obj[key];
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            plainObject[key] = objectToPojo(value);
        } else {
            plainObject[key] = value;
        }
    });

    return plainObject as T;
}

// https://nextjs.org/docs/app/api-reference/file-conventions/page
export type SearchParams = { [key: string]: string | string[] | undefined };
export type AsyncSearchParams = Promise<SearchParams>;

export function getSingleQueryParam(
    searchParams: SearchParams,
    key: string,
    getFirst: boolean = false
): string | undefined {
    const param = searchParams[key];
    if (typeof param === 'string') return param;
    if (Array.isArray(param)) {
        return param[getFirst ? 0 : param.length - 1];
    }
}
