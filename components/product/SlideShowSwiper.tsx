'use client'

import { useState } from "react";
import Image from "next/image"

import { FreeMode, Thumbs, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react"
import { Swiper as SwiperObject } from "swiper"

import "swiper/css"
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import { ProductImage } from "./ProductImage";

interface Props {
    images: string[],
    title: string,
    className?: string
}

export const SlideShowSwiper = ({ images, title, className }: Props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

    return (
        <div className={className}>
            <Swiper
                spaceBetween={10}
                pagination={true}
                thumbs={{
                    swiper: thumbsSwiper
                }}
                modules={[FreeMode, Thumbs, Pagination, Autoplay]}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: true,
                }}
            >
                {images.map((image) => (
                    <SwiperSlide key={image}>
                        <ProductImage
                            url={image}
                            alt={title}
                            width={1024}
                            height={800}
                            className="rounded-lg shadow-lg"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs, Pagination]}
                className="mt-3"
            >
                {images.map((image) => (
                    <SwiperSlide key={image}>
                        <ProductImage
                            url={image}
                            alt={title}
                            width={400}
                            height={400}
                            className="rounded-lg shadow-lg cursor-pointer"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    )
}
