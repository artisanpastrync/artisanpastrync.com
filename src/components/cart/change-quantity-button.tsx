import { useTransition } from 'react';
import { toast } from 'sonner';

import { Spinner } from '@/components/shared/spinner';
import { useCartContext } from './cart-context';

import { updateItemQuantityAction } from './actions';

interface ChangeQuantityButtonProps {
    variantId: string;
    quantity: number;
    children: React.ReactNode;
}

export function ChangeQuantityButton({ variantId, quantity, children }: ChangeQuantityButtonProps) {
    const { refresh } = useCartContext();
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(async () => {
            const { ok, message } = await updateItemQuantityAction(null, {
                variantId,
                quantity,
            });

            if (!ok && message) {
                toast.warning(message);
            }

            refresh();
        });
    };

    return (
        <div className='relative flex h-full w-fit items-center'>
            <button
                className='flex cursor-pointer items-center gap-2 bg-transparent transition-transform hover:scale-150'
                onClick={handleClick}
                disabled={isPending}
            >
                {isPending ? <Spinner className='size-2' /> : children}
            </button>
        </div>
    );
}
