"use client";

import Link from "next/link";
import { ProductImage } from "@/components";
import { useCartStore } from "@/store";
import { currencyFormatter } from "@/utils/currencyFormatter";

export const ProductsInCart = () => {
  const { cart } = useCartStore();

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 border-b border-neutral-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Productos
          </p>
          <h2 className="mt-2 text-3xl font-semibold">Tu selección</h2>
        </div>
        <Link
          href="/cart"
          className="text-sm font-semibold text-neutral-600 underline-offset-4 transition-colors hover:text-neutral-950 hover:underline"
        >
          Editar carrito
        </Link>
      </div>

      <div className="divide-y divide-neutral-200 border-y border-neutral-200">
        {cart.map((product) => (
          <article key={product.slug + product.size} className="grid gap-5 py-6 sm:grid-cols-[120px_1fr]">
            <Link href={`/product/${product.slug}`} className="block bg-neutral-100">
              <ProductImage
                url={product.image}
                alt={product.title}
                width={180}
                height={180}
                className="aspect-square w-full rounded-none"
              />
            </Link>

            <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <div>
                <Link
                  href={`/product/${product.slug}`}
                  className="text-lg font-semibold leading-tight underline-offset-4 transition-colors hover:text-[(--primary)] hover:underline"
                >
                  {product.title}
                </Link>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-600">
                  <span>Talla {product.size}</span>
                  <span>Cantidad {product.quantity}</span>
                  <span>{currencyFormatter(product.price)} c/u</span>
                </div>
              </div>

              <p className="text-xl font-semibold sm:text-right">
                {currencyFormatter(product.price * product.quantity)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
