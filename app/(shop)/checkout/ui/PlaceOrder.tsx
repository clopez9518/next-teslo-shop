"use client";

import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { placeOrder } from "@/actions";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { useCartStore, useAddressStore } from "@/store";

const emptySubscribe = () => () => {};

export const PlaceOrder = () => {
  const router = useRouter();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const loaded = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const { cart, getSummary, clearCart } = useCartStore();
  const { address } = useAddressStore();
  const summary = getSummary();

  if (!loaded) {
    return (
      <aside className="border border-neutral-200 bg-[#f6f6f2] p-7">
        <div className="animate-pulse space-y-4">
          <div className="h-3 w-24 bg-neutral-200" />
          <div className="h-8 w-40 bg-neutral-200" />
          <div className="h-24 w-full bg-neutral-200" />
          <div className="h-12 w-full bg-neutral-300" />
        </div>
      </aside>
    );
  }

  const placeOrderHandler = async () => {
    setIsPlacingOrder(true);
    setErrorMessage("");

    const productsToOrder = cart.map((product) => ({
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
    router.replace(`/orders/${response.order?.id}`);
    setIsPlacingOrder(false);
  };

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="border border-neutral-200 bg-[#f6f6f2] p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
          Resumen
        </p>
        <h2 className="mt-3 text-3xl font-semibold">Orden</h2>

        <div className="mt-7 space-y-4 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-neutral-600">Productos</span>
            <span className="font-semibold">{summary.totalItems} artículos</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-neutral-600">Subtotal</span>
            <span className="font-semibold">{currencyFormatter(summary.subTotal)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-neutral-600">Impuestos (19%)</span>
            <span className="font-semibold">{currencyFormatter(summary.tax)}</span>
          </div>
          <div className="flex justify-between gap-4 border-b border-neutral-300 pb-5">
            <span className="text-neutral-600">Envío</span>
            <span className="font-semibold">
              {summary.shipping === 0 ? "Gratis" : currencyFormatter(summary.shipping)}
            </span>
          </div>
          <div className="flex items-end justify-between gap-4 pt-1">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-2xl font-semibold">{currencyFormatter(summary.total)}</span>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-300 pt-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
              Entrega
            </p>
            <Link
              href="/checkout/address"
              className="text-sm font-semibold text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-950 hover:underline"
            >
              Editar
            </Link>
          </div>

          <div className="space-y-2 text-sm text-neutral-700">
            <p className="font-semibold text-neutral-950">
              {address.firstName} {address.lastName}
            </p>
            <p>{address.address}</p>
            {address.address2 && <p>{address.address2}</p>}
            <p>
              {address.city}, {address.zip}
            </p>
            <p>{address.country}</p>
            <p>{address.phone}</p>
          </div>
        </div>

        <div className="mt-7">
          <p className="mb-3 text-xs leading-5 text-neutral-500">
            Al finalizar compra aceptas nuestros{" "}
            <Link href="/terms" className="underline underline-offset-4">
              terminos y condiciones
            </Link>
            .
          </p>

          <button
            disabled={isPlacingOrder || cart.length === 0}
            className={clsx(
              "flex h-12 w-full items-center justify-center bg-neutral-950 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[(--primary)]",
              (isPlacingOrder || cart.length === 0) && "cursor-not-allowed opacity-50 hover:bg-neutral-950"
            )}
            onClick={placeOrderHandler}
            type="button"
          >
            {isPlacingOrder ? "Creando orden..." : "Finalizar compra"}
          </button>

          {errorMessage && (
            <div className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {errorMessage}
            </div>
          )}

          <Link
            className="mt-4 block text-center text-sm font-semibold text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-950 hover:underline"
            href="/"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    </aside>
  );
};
