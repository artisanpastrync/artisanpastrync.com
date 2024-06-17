'use client';

import { FC, ReactNode } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide, SwiperSlideProps } from 'swiper/react';
import { SwiperModule } from 'swiper/types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './carousel.css';

export interface CarouselSlideProps extends SwiperSlideProps {
    children?: ReactNode;
}

const CarouselSlide: FC<CarouselSlideProps> = ({ children, ...slideProps }) => {
    return <SwiperSlide {...slideProps}>{children}</SwiperSlide>;
};

type CarouselSubComponents = {
    Slide: typeof CarouselSlide;
};

export interface CarouselProps extends Omit<SwiperProps, 'modules'> {
    children: ReactNode;
    className?: string;
    slideClassName?: string;
    autoplayDelay?: number;
    disableAutoplay?: boolean;
    disableLoop?: boolean;
    disableNavigation?: boolean;
    disablePagination?: boolean;
}

export const Carousel: FC<CarouselProps> & CarouselSubComponents = ({
    children,
    slideClassName,
    autoplayDelay = 5000,
    disableAutoplay = false,
    disableLoop = false,
    disableNavigation = false,
    disablePagination = false,
    ...swiperProps
}) => {
    const modules: SwiperModule[] = [];

    if (!disableAutoplay) modules.push(Autoplay);
    if (!disableNavigation) modules.push(Navigation);
    if (!disablePagination) modules.push(Pagination);

    return (
        <Swiper
            spaceBetween={30}
            slidesPerView={1}
            navigation={!disableNavigation}
            loop={!disableLoop}
            pagination={{ clickable: true }}
            autoplay={{ delay: autoplayDelay }}
            breakpoints={{
                768: {
                    slidesPerView: 2,
                },
            }}
            {...swiperProps}
            modules={modules}
        >
            {children}
        </Swiper>
    );
};

Carousel.Slide = CarouselSlide;

export default Carousel;
