import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export function BackButton({ href = '/', className }: { href?: string; className?: string }) {
    return (
        <Link href={href} className={className} aria-label='Go back' prefetch={false}>
            <ArrowLeftIcon className='size-8 cursor-pointer fill-black transition-transform hover:scale-110' />
        </Link>
    );
}
