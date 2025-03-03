import Image from 'next/image';
import { type Dispatch, type SetStateAction, useCallback } from 'react';

import { Carousel, type CarouselApi, CarouselContent } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

type SideImagesProps = {
    images: string[];
    api: CarouselApi;
    setThumbsApi: Dispatch<SetStateAction<CarouselApi>>;
    current: number;
    className?: string;
};

export const SideImages = ({ className, images, api, setThumbsApi, current }: SideImagesProps) => {
    const onThumbClick = useCallback(
        (index: number) => {
            api?.scrollTo(index);
        },
        [api]
    );

    return (
        <div className={className}>
            <Carousel
                orientation='vertical'
                setApi={setThumbsApi}
                opts={{ skipSnaps: true, watchDrag: false }}
            >
                <CarouselContent className='ml-0 mr-0 mt-0 flex-row justify-center gap-1'>
                    {images.map((image, index) => (
                        <button
                            className={cn(
                                'aspect-square relative border-4 border-transparent w-full cursor-pointer hover:opacity-75 transition-opacity ',
                                index === (current === 0 ? current : current - 1) &&
                                    'border-primary'
                            )}
                            key={image}
                            onClick={() => onThumbClick(index)}
                        >
                            <Image
                                src={image}
                                fill
                                alt={'Image ' + index + ' thumbnail'}
                                sizes='100px'
                                className='object-cover object-center'
                            />
                            <span className='sr-only'>Select Image {index}</span>
                        </button>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};
