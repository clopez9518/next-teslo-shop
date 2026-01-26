'use client';

import Link from 'next/link'
import { useCartStore } from '@/store/cart/cart-store'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { CartItem } from './CartItem';
import { CartSkeleton } from './CartSkeleton';
import { currencyFormatter } from '@/utils/currencyFormatter';

export const CartView = () => {

    const { cart, getSummary } = useCartStore((state) => state);
    const [loaded, setLoaded] = useState(false)
    const { totalItems, subTotal, tax, total, shipping } = getSummary();

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) return <CartSkeleton />;


    if (cart.length === 0 && loaded) redirect("/empty");

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Carrito */}
            <div className="flex flex-col mt-5">
                <span className="text-xl">Agregar más items</span>
                <Link href="/shop" className="underline mb-5">Continuar comprando</Link>

                {/* Items */}
                {
                    cart.map(product => (
                        <CartItem key={product.slug + product.size} product={product} />
                    ))
                }

            </div>

            {/* Checkout */}
            <div className="">
                <div className="bg-white rounded-xl shadow-xl p-7 sm:mt-5">
                    <h2 className="text-xl sm:text-2xl mb-2"> Resumen de la compra </h2>

                    <div className="grid grid-cols-2 gap-2">
                        <span>No. Productos</span>
                        <span className="text-right">{currencyFormatter(totalItems)} Artículos</span>

                        <span>Subtotal</span>
                        <span className="text-right">{currencyFormatter(subTotal)}</span>

                        <span>Impuestos (19%)</span>
                        <span className="text-right">{currencyFormatter(tax)}</span>

                        <span>Envío</span>
                        <span className="text-right">{currencyFormatter(shipping)}</span>

                        <span className="font-bold text-xl">Total</span>
                        <span className="text-right font-bold text-xl">{currencyFormatter(total)}</span>

                    </div>

                    <div className="mt-5 mb-2 w-full">
                        <Link className="flex btn-primary justify-center" href="/checkout/address">Pagar</Link>
                        <Link className="flex justify-end mt-2 underline" href="/">Continuar comprando</Link>
                    </div>
                </div>

            </div>


        </div>
    )
}
