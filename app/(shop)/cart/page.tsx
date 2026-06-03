import { CartView } from "@/components/cart/CartView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrito de compras",
  robots: "noindex, nofollow",
};

export default function CartPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <section className="-mx-2 border-y border-neutral-200 bg-[#f6f6f2] px-6 py-10 sm:-mx-10 sm:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Checkout
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-none sm:text-7xl">
            Carrito
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Revisa tus piezas, ajusta cantidades y continua al pago cuando todo este listo.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl py-10 sm:py-14">
        <CartView />
      </section>
    </div>
  );
}
