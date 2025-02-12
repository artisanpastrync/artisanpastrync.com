'use client';

import { useEffect } from 'react';
import NextError from 'next/error';

export default function Error({
    error,
    reset: _,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return <NextError statusCode={500} title='Oops! An error occurred' />;
}
