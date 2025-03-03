'use client';

import { useEffect, useState } from 'react';

import { CarouselApi } from '@/components/ui/carousel';

import { CenterSection } from './center-image-section';
import { SideImages } from './side-images';
import { cn } from '@/lib/utils';

export interface ProductImagesProps {
    images: string[];
    className?: string;
}

export const ProductImages = ({ images, className }: ProductImagesProps) => {
    const [api, setApi] = useState<CarouselApi>();
    const [thumbsApi, setThumbsApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api || !thumbsApi) {
            return;
        }

        setCurrent(api.selectedScrollSnap());

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1);
            thumbsApi.scrollTo(api.selectedScrollSnap());
        });
    }, [api, thumbsApi]);
    return (
        <div className={cn`flex flex-col gap-2 ${className}`}>
            <CenterSection setApi={setApi} images={images} />
            {images.length > 1 && (
                <SideImages
                    setThumbsApi={setThumbsApi}
                    current={current}
                    api={api}
                    images={images}
                    className='hidden sm:block overflow-visible'
                />
            )}
        </div>
    );
};
