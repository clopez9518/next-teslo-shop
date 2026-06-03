"use client";

import { getProductImageUrl } from "@/adapters/adapters";
import { Product, Size } from "@/interfaces";
import { useCartStore } from "@/store/cart/cart-store";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";

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

    const timeout = setTimeout(() => {
      setIsModalOpen(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isModalOpen, setIsModalOpen]);

  const onQuantityChange = (value: number) => {
    const nextQuantity = quantity + value;

    if (nextQuantity < 1 || nextQuantity > product.inStock) return;
    setQuantity(nextQuantity);
  };

  const addToCart = () => {
    setPosted(true);
    if (!size) return;

    addProductToCart({
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity,
      size,
      image: getProductImageUrl(product)[0],
      stock: product.inStock,
    });

    setIsModalOpen(true);
  };

  return (
    <div className="space-y-7">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
            Talla
          </p>
          {posted && !size && (
            <span className="fade-in text-xs font-semibold uppercase tracking-[0.16em] text-red-600">
              Selecciona una talla
            </span>
          )}
        </div>

        <div className="grid grid-cols-4 gap-px bg-neutral-200">
          {product.sizes.map((item) => (
            <button
              key={item}
              className={clsx(
                "h-12 text-sm font-semibold transition-colors",
                item === size
                  ? "bg-neutral-950 text-white hover:bg-neutral-950"
                  : "bg-white text-neutral-950 hover:bg-neutral-100"
              )}
              onClick={() => setSize(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
          Cantidad
        </p>
        <div className="grid h-12 grid-cols-[48px_1fr_48px] border border-neutral-200">
          <button
            aria-label="Disminuir cantidad"
            className="flex items-center justify-center border-r border-neutral-200 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:text-neutral-300"
            disabled={quantity === 1}
            onClick={() => onQuantityChange(-1)}
            type="button"
          >
            <IoRemoveOutline size={18} />
          </button>
          <span className="flex items-center justify-center text-sm font-semibold">{quantity}</span>
          <button
            aria-label="Aumentar cantidad"
            className="flex items-center justify-center border-l border-neutral-200 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:text-neutral-300"
            disabled={quantity === product.inStock}
            onClick={() => onQuantityChange(1)}
            type="button"
          >
            <IoAddOutline size={18} />
          </button>
        </div>
      </div>

      <button
        className={clsx(
          "h-12 w-full bg-neutral-950 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--primary)]",
          product.inStock === 0 && "cursor-not-allowed opacity-50 hover:bg-neutral-950"
        )}
        disabled={product.inStock === 0}
        onClick={addToCart}
        type="button"
      >
        {product.inStock === 0 ? "Agotado" : "Agregar al carro"}
      </button>
    </div>
  );
};
