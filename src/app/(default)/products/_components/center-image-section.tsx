import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';

import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

type CenterSectionProps = {
    images: string[];
    setApi: Dispatch<SetStateAction<CarouselApi>>;
    className?: string;
};

export const CenterSection = ({ className, images, setApi }: CenterSectionProps) => {
    const hasOnlyOneImage = images.length <= 1;

    return (
        <div className={cn('flex flex-col relative', className)}>
            <Carousel setApi={setApi} opts={{ loop: true, active: images.length > 1 }}>
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem className='relative aspect-square w-full' key={image}>
                            <Image
                                alt={'Product Image ' + index}
                                src={image}
                                fill
                                priority={index === 0}
                                className='object-cover object-center'
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {!hasOnlyOneImage && (
                    <div className='flex flex-row justify-between absolute w-full bottom-0 items-center p-4 pointer-events-none'>
                        <CarouselPrevious className='relative inset-0 translate-y-0 bg-primary border-transparent hover:bg-primary hover:opacity-75 pointer-events-auto' />
                        <CarouselNext className='relative inset-0 translate-y-0 bg-primary border-transparent hover:bg-primary hover:opacity-75 pointer-events-auto' />
                    </div>
                )}
            </Carousel>
        </div>
    );
};
