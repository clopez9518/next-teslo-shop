'use client'

import { CartProduct } from "@/interfaces";
import Image from "next/image";
import { QuantitySelector } from "../product/QuantitySelector";
import { useCartStore } from "@/store/cart/cart-store";
import Link from "next/link";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { ProductImage } from "../product/ProductImage";

interface Props {
    product: CartProduct;
}

export const CartItem = ({ product }: Props) => {

    const { updateProductQuantity, removeProductFromCart } = useCartStore((state) => state);

    const onQuantityChange = (quantity: number) => {
        updateProductQuantity({ ...product, quantity });
    }

    const onRemoveProduct = () => {
        removeProductFromCart(product);
    }

    return (
        <div key={product.slug} className="flex mb-5">
            <ProductImage
                url={product.image}
                alt={product.title}
                width={120}
                height={120}
                className="mr-5"
            />
            <div>
                <Link className="underline hover:text-blue-500" href={`/product/${product.slug}`}>
                    {product.title}
                </Link>
                <p>{currencyFormatter(product.price * product.quantity)}</p>
                <p>Talla: {product.size}</p>
                <QuantitySelector quantity={product.quantity} maxQuantity={product.stock} onQuantityChange={onQuantityChange} />
                <button className="underline" onClick={onRemoveProduct}>Remover</button>
            </div>
        </div>
    )
}
