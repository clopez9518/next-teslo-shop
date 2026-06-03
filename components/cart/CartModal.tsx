import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useCartStore } from "@/store";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { ProductImage } from "../product/ProductImage";

const emptySubscribe = () => () => {};

export const CartModal = () => {
  const { cart, setIsModalOpen, getSummary } = useCartStore((state) => state);
  const loaded = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const visibleCart = loaded ? cart : [];
  const { total } = loaded ? getSummary() : { total: 0 };

  return (
    <div className="w-full border border-neutral-200 bg-white p-4 shadow-2xl sm:w-96">
      <div className="mb-4 flex items-center justify-between border-b border-neutral-200 pb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-neutral-500">
          Carrito
        </p>
        <p className="text-sm font-semibold">{visibleCart.length} items</p>
      </div>

      {visibleCart.length > 0 ? (
        <div className="max-h-72 overflow-y-auto">
          {visibleCart.map((item) => (
            <div key={item.id + item.size} className="grid grid-cols-[72px_1fr] gap-4 py-3">
              <ProductImage
                url={item.image}
                alt={item.title}
                width={72}
                height={72}
                className="aspect-square w-full rounded-none"
              />

              <div>
                <Link
                  href={`/product/${item.slug}`}
                  className="line-clamp-2 text-sm font-semibold leading-tight underline-offset-4 transition-colors hover:text-[var(--primary)] hover:underline"
                  onClick={() => setIsModalOpen(false)}
                >
                  {item.title}
                </Link>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-600">
                  <span>Talla {item.size}</span>
                  <span>Cant. {item.quantity}</span>
                </div>
                <p className="mt-2 text-sm font-semibold">
                  {currencyFormatter(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-sm text-neutral-600">
          Tu carrito esta vacio.
        </div>
      )}

      <div className="mt-4 border-t border-neutral-200 pt-4">
        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="text-neutral-600">Total</span>
          <span className="font-semibold">{currencyFormatter(total)}</span>
        </div>
        <Link href="/cart">
          <button
            onClick={() => setIsModalOpen(false)}
            className="h-11 w-full bg-neutral-950 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[var(--primary)]"
            type="button"
          >
            Ver carrito
          </button>
        </Link>
      </div>
    </div>
  );
};
