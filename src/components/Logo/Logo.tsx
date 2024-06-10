import Image from 'next/image';
import { CSSProperties, FC } from 'react';

import { cn } from '@/lib/utils';

export interface LogoProps {
    className?: string;
    style?: CSSProperties;
}

export const Logo: FC<LogoProps> = ({ className, style }) => (
    <Image
        src='/assets/artisan-pastry-wordmark.svg'
        width='200'
        height='100'
        priority
        alt='Artisan Pastry by Valerie and Liz'
        className={cn`logo w-auto h-12 ${className}`}
        style={style}
    />
);
