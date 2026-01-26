'use client'

import clsx from 'clsx';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5'
import { ProductImage } from './ProductImage';

interface Props {
    images: string[];
}

export const Slideshow = ({ images }: Props) => {

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(index => index === images.length - 1 ? 0 : index + 1);
        }, 4000);

        return () => clearInterval(interval);
    }, [images.length]);


    const handleNext = () => {
        if (index < images.length - 1) {
            setIndex(index + 1);
        }
    }

    const handlePrev = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    }

    return (
        <div className='relative items-center rounded-lg shadow-lg overflow-hidden grid grid-cols-1'>
            {
                images.map((image, i) => (
                    <ProductImage
                        key={image}
                        url={image}
                        alt={image}
                        width={400}
                        height={400}
                        className={clsx(
                            "rounded-lg w-full col-start-1 row-start-1 transition-opacity duration-300 ease-in-out",
                            i === index ? 'opacity-100' : 'opacity-0'
                        )}
                    />
                ))
            }

            <IoArrowBackOutline
                className={clsx(
                    "w-6 h-6 cursor-pointer absolute top-[50%] left-5 -translate-y-1/2 z-10 drop-shadow-md",
                    index === 0 && "hidden"
                )}
                onClick={handlePrev}
            />
            <IoArrowForwardOutline
                className={clsx(
                    "w-6 h-6 cursor-pointer absolute top-[50%] right-5 -translate-y-1/2 z-10 drop-shadow-md",
                    index === images.length - 1 && "hidden"
                )}
                onClick={handleNext}
            />
        </div>
    )
}
