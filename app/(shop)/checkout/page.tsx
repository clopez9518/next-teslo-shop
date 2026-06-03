import { PlaceOrder } from "./ui/PlaceOrder";
import { ProductsInCart } from "./ui/ProductsInCart";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <section className="-mx-2 border-y border-neutral-200 bg-[#f6f6f2] px-6 py-10 sm:-mx-10 sm:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Checkout
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-none sm:text-7xl">
            Verificar compra
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Confirma tus productos, dirección y totales antes de crear la orden.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 py-10 sm:py-14 lg:grid-cols-[1fr_430px]">
        <ProductsInCart />
        <PlaceOrder />
      </section>
    </div>
  );
}
