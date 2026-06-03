"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useSyncExternalStore } from "react";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { CartItem } from "./CartItem";
import { CartSkeleton } from "./CartSkeleton";

const emptySubscribe = () => () => {};

export const CartView = () => {
  const { cart, getSummary } = useCartStore((state) => state);
  const loaded = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { totalItems, subTotal, tax, total, shipping } = getSummary();

  if (!loaded) return <CartSkeleton />;

  if (cart.length === 0) redirect("/empty");

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
      <div>
        <div className="mb-6 flex flex-col gap-3 border-b border-neutral-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Bolsa
            </p>
            <h2 className="mt-2 text-3xl font-semibold">{totalItems} artículos</h2>
          </div>
          <Link
            href="/"
            className="text-sm font-semibold text-neutral-600 underline-offset-4 transition-colors hover:text-neutral-950 hover:underline"
          >
            Continuar comprando
          </Link>
        </div>

        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {cart.map((product) => (
            <CartItem key={product.slug + product.size} product={product} />
          ))}
        </div>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="border border-neutral-200 bg-[#f6f6f2] p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Resumen
          </p>
          <h2 className="mt-3 text-3xl font-semibold">Orden</h2>

          <div className="mt-7 space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-neutral-600">Productos</span>
              <span className="font-semibold">{totalItems} artículos</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-neutral-600">Subtotal</span>
              <span className="font-semibold">{currencyFormatter(subTotal)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-neutral-600">Impuestos (19%)</span>
              <span className="font-semibold">{currencyFormatter(tax)}</span>
            </div>
            <div className="flex justify-between gap-4 border-b border-neutral-300 pb-5">
              <span className="text-neutral-600">Envío</span>
              <span className="font-semibold">
                {shipping === 0 ? "Gratis" : currencyFormatter(shipping)}
              </span>
            </div>
            <div className="flex items-end justify-between gap-4 pt-1">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-semibold">{currencyFormatter(total)}</span>
            </div>
          </div>

          <div className="mt-7 space-y-3">
            <Link
              className="flex h-12 w-full items-center justify-center bg-neutral-950 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[(--primary)]"
              href="/checkout/address"
            >
              Pagar
            </Link>
            <Link
              className="flex h-12 w-full items-center justify-center border border-neutral-300 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-950 transition-colors hover:border-neutral-950"
              href="/"
            >
              Seguir comprando
            </Link>
          </div>

          <div className="mt-8 grid gap-2 grid-cols-3 border-t border-neutral-300 pt-5 text-xs text-neutral-600">
              <span>Diseño atemporal</span>
              <span>Comodidad diaria</span>
              <span>Calidad duradera</span>
          </div>
        </div>
      </aside>
    </div>
  );
};
