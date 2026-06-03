"use client";

import Link from "next/link";
import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";
import { CartProduct } from "@/interfaces";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { ProductImage } from "../product/ProductImage";

interface Props {
  product: CartProduct;
}

export const CartItem = ({ product }: Props) => {
  const { updateProductQuantity, removeProductFromCart } = useCartStore((state) => state);

  const onQuantityChange = (value: number) => {
    const nextQuantity = product.quantity + value;

    if (nextQuantity < 1 || nextQuantity > product.stock) return;
    updateProductQuantity({ ...product, quantity: nextQuantity });
  };

  const onRemoveProduct = () => {
    removeProductFromCart(product);
  };

  return (
    <article className="grid gap-5 py-6 sm:grid-cols-[140px_1fr]">
      <Link href={`/product/${product.slug}`} className="block bg-neutral-100">
        <ProductImage
          url={product.image}
          alt={product.title}
          width={220}
          height={220}
          className="aspect-square w-full rounded-none"
        />
      </Link>

      <div className="grid gap-5 sm:grid-cols-[1fr_auto]">
        <div>
          <Link
            className="text-lg font-semibold leading-tight underline-offset-4 transition-colors hover:text-[var(--primary)] hover:underline"
            href={`/product/${product.slug}`}
          >
            {product.title}
          </Link>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-600">
            <span>Talla {product.size}</span>
            <span>{currencyFormatter(product.price)} c/u</span>
            <span>Stock {product.stock}</span>
          </div>

          <button
            className="mt-5 text-sm font-semibold text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-950 hover:underline"
            onClick={onRemoveProduct}
            type="button"
          >
            Remover
          </button>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <p className="text-xl font-semibold">
            {currencyFormatter(product.price * product.quantity)}
          </p>

          <div className="grid h-11 w-36 grid-cols-[44px_1fr_44px] border border-neutral-200">
            <button
              aria-label="Disminuir cantidad"
              className="flex items-center justify-center border-r border-neutral-200 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:text-neutral-300"
              disabled={product.quantity === 1}
              onClick={() => onQuantityChange(-1)}
              type="button"
            >
              <IoRemoveOutline size={18} />
            </button>
            <span className="flex items-center justify-center text-sm font-semibold">
              {product.quantity}
            </span>
            <button
              aria-label="Aumentar cantidad"
              className="flex items-center justify-center border-l border-neutral-200 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:text-neutral-300"
              disabled={product.quantity === product.stock}
              onClick={() => onQuantityChange(1)}
              type="button"
            >
              <IoAddOutline size={18} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
