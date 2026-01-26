'use client';

import { ProductImage } from '@/components';
import { useCartStore } from '@/store';
import Link from 'next/link'

export const ProductsInCart = () => {
    const { cart } = useCartStore();
    return (
        <div className="flex flex-col mt-5">
            <span className="text-xl">Tu carrito de compras</span>
            <Link href="/cart" className="underline mb-5">Editar carrito</Link>

            {/* Items */}
            {
                cart.map(product => (
                    <div key={product.slug + product.size} className="flex mb-5">
                        <ProductImage
                            url={product.image}
                            alt={product.title}
                            width={100}
                            height={100}
                            className="mr-5"
                        />
                        <div>
                            <p>{product.title}</p>
                            <p>${product.price}</p>
                            <p>Cantidad: {product.quantity}</p>
                            <p className="font-bold">Total: ${product.price * product.quantity}</p>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}
