'use client'

import { getProductImageUrl } from "@/adapters/adapters";
import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProductImage } from "../product/ProductImage";

interface Props {
    product: Product;
}


export const ProductGridItem = ({ product }: Props) => {

    const [displayImage, setDisplayImage] = useState(getProductImageUrl(product)[0])

    const onMouseEnter = () => {
        setTimeout(() => {
            setDisplayImage(getProductImageUrl(product)[1])
        }, 200)
    }

    const onMouseLeave = () => {
        setDisplayImage(getProductImageUrl(product)[0])
    }

    return (
        <div className="rounded-md overflow-hidden fade-in ">
            <Link href={`/product/${product.slug}`}>
                <ProductImage
                    url={displayImage}
                    alt={product.title}
                    width={500}
                    height={500}
                    className="w-full"
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />
            </Link>
            <div className="p-4 flex flex-col">
                <Link className="hover:underline" href={`/product/${product.slug}`}>
                    <p>{product.title}</p>
                </Link>
                <span className="font-bold">${product.price}</span>
            </div>
        </div>
    )
}
