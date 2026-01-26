'use client';

import Link from 'next/link'
import { useCartStore } from '@/store';
import { useEffect, useState } from 'react';
import { useAddressStore } from '@/store/address/address-store';
import { currencyFormatter } from '@/utils/currencyFormatter';
import clsx from 'clsx';
import { placeOrder } from '@/actions';
import { useRouter } from 'next/navigation';

export const PlaceOrder = () => {

    const router = useRouter();

    const [loaded, setLoaded] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const { cart, getSummary, clearCart } = useCartStore();

    const { address } = useAddressStore();

    const summary = getSummary();

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Procesando...</p>
            </div>
        )
    }

    const placeOrderHandler = async () => {
        setIsPlacingOrder(true);

        const productsToOrder = cart.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size,
        }));

        const response = await placeOrder(productsToOrder, address);

        if (!response.ok) {
            setIsPlacingOrder(false);
            setErrorMessage(response.message);
            return;
        }

        clearCart();

        //Redirigir a la orden
        router.replace(`/orders/${response.order?.id}`);

        setIsPlacingOrder(false);
    }

    return (
        <div>
            <div className="bg-white rounded-xl shadow-xl p-7 sm:mt-5">
                <h2 className="text-xl sm:text-2xl mb-2"> Resumen de la compra </h2>

                <div className="grid grid-cols-2 gap-2">
                    <span>No. Productos</span>
                    <span className="text-right">{summary.totalItems} Artículos</span>

                    <span>Subtotal</span>
                    <span className="text-right">{currencyFormatter(summary.subTotal)}</span>

                    <span>Impuestos (19%)</span>
                    <span className="text-right">{currencyFormatter(summary.tax)}</span>

                    <span>Envío</span>
                    <span className="text-right">{currencyFormatter(summary.shipping)}</span>

                    <span className="font-bold text-xl">Total</span>
                    <span className="text-right font-bold text-xl">{currencyFormatter(summary.total)}</span>

                </div>

                <hr className="my-5 text-gray-400" />

                <h2 className="font-bold text-xl">Detalles del envío</h2>
                <div className="grid grid-cols-2 mt-5">
                    <span>Nombre</span>
                    <span className="text-right">{address.firstName}</span>

                    <span>Apellido</span>
                    <span className="text-right">{address.lastName}</span>

                    <span>Dirección</span>
                    <span className="text-right">{address.address}</span>

                    <span>Ciudad</span>
                    <span className="text-right">{address.city}</span>

                    <span>Código postal</span>
                    <span className="text-right">{address.zip}</span>

                    <span>País</span>
                    <span className="text-right">{address.country}</span>

                </div>

                <div className="mt-5 mb-2 w-full">
                    <p className="text-xs text-gray-500 mb-2">
                        Al hacer clic en finalizar compra, aceptas nuestros <Link href="/terms" className="underline">términos y condiciones.</Link>
                    </p>
                    <button
                        disabled={isPlacingOrder}
                        className={clsx(
                            "flex btn-primary justify-center",
                            isPlacingOrder && "opacity-50 cursor-not-allowed"
                        )}
                        onClick={placeOrderHandler}
                    // href="/orders/43123"
                    >
                        Finalizar compra
                    </button>

                    <p className="text-red-500 mt-2">{errorMessage}</p>
                    <Link className="flex justify-end mt-2 underline" href="/">Continuar comprando</Link>
                </div>
            </div>

        </div>
    )
}
