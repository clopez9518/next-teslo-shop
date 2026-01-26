'use client';

import { getProductImageUrl } from "@/adapters/adapters";
import { QuantitySelector, SizeSelector } from "@/components"
import { Product, Size } from "@/interfaces"
import { useCartStore } from "@/store/cart/cart-store";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {
    product: Product;
}


export const AddToCart = ({ product }: Props) => {

    const [size, setSize] = useState<Size | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [posted, setPosted] = useState(false);

    const { addProductToCart, setIsModalOpen, isModalOpen } = useCartStore((state) => state);

    useEffect(() => {
        if (!isModalOpen) return;
        setTimeout(() => {
            setIsModalOpen(false);
        }, 5000)
    }, [isModalOpen])


    const addToCart = () => {
        setPosted(true);
        if (!size) return;

        addProductToCart({
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity,
            size: size!,
            image: getProductImageUrl(product)[0],
            stock: product.inStock,
        })

        setIsModalOpen(true);

    }

    return (
        <>
            {/* Size selector */}
            {
                posted && !size && (
                    <span className="text-red-500 fade-in">Debe seleccionar una talla</span>
                )
            }
            <SizeSelector sizes={product.sizes} selectedSize={size} onSizeChange={setSize} />

            {/* Quantity selector */}
            <QuantitySelector quantity={quantity} maxQuantity={product.inStock} onQuantityChange={setQuantity} />

            {/* Add to cart button */}

            <button
                onClick={addToCart}
                style={{
                    backgroundColor: "#3e6ae1",
                }}
                disabled={product.inStock === 0}
                className={
                    clsx(
                        "px-5 py-2 rounded text-white w-60 md:w-2/3 cursor-pointer",
                        {
                            'disabled:opacity-50 disabled:cursor-not-allowed': product.inStock === 0
                        }
                    )
                }>
                Add to cart
            </button>
        </>
    )
}
