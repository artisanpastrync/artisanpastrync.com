import { useTransition } from 'react';

import { LoadingDots } from '@/components/shared/loading-dots';
import { cn } from '@/lib/utils';

import { removeCartItemAction } from './actions';
import { useCartContext } from './cart-context';

interface DeleteButtonProps {
    variantId: string;
}

export function DeleteButton({ variantId }: DeleteButtonProps) {
    const { refresh } = useCartContext();
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(async () => {
            const { ok } = await removeCartItemAction(null, variantId);

            if (ok) {
                refresh();
            }
        });
    };

    return (
        <div className={cn('flex w-fit gap-2', { 'pointer-events-none': isPending })}>
            <button
                className='bg-transparent text-[13px] text-neutral-500 underline hover:no-underline'
                onClick={handleClick}
                disabled={isPending}
            >
                Delete
            </button>
            {isPending && <LoadingDots />}
        </div>
    );
}
