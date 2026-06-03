import Link from "next/link";
import { getOrderById } from "@/actions/order/get-order-by-id";
import { PaypalButton, ProductImage } from "@/components";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params;

  if (!id) notFound();

  const { order, ok } = await getOrderById(id);

  if (!ok || !order) notFound();

  const products = order.itemsInOrder.map((item) => ({
    ...item.product,
    price: item.price,
    quantity: item.quantity,
    size: item.size,
  }));

  const isPaid = order.status === "paid";
  const labelId = id.split("-").pop();

  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <section className="-mx-2 border-y border-neutral-200 bg-[#f6f6f2] px-6 py-10 sm:-mx-10 sm:px-12 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Orden
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-none sm:text-7xl">
              #{labelId}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
              Revisa el detalle de tu compra, la dirección de entrega y el estado del pago.
            </p>
          </div>

          <div
            className={
              "inline-flex h-11 items-center justify-center px-5 text-sm font-semibold uppercase tracking-[0.18em] " +
              (isPaid ? "bg-neutral-950 text-white" : "bg-white text-neutral-950 border border-neutral-300")
            }
          >
            {isPaid ? "Pagada" : "Pendiente"}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 py-10 sm:py-14 lg:grid-cols-[1fr_430px]">
        <div>
          <div className="mb-6 flex flex-col gap-3 border-b border-neutral-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                Productos
              </p>
              <h2 className="mt-2 text-3xl font-semibold">{order.itemsQuantity} artículos</h2>
            </div>
            <Link
              href="/orders"
              className="text-sm font-semibold text-neutral-600 underline-offset-4 transition-colors hover:text-neutral-950 hover:underline"
            >
              Volver a ordenes
            </Link>
          </div>

          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {products.map((product) => (
              <article key={product.id + product.size} className="grid gap-5 py-6 sm:grid-cols-[120px_1fr]">
                <Link href={`/product/${product.slug}`} className="block bg-neutral-100">
                  <ProductImage
                    url={product.images[0]?.url}
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

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border border-neutral-200 bg-[#f6f6f2] p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                  Resumen
                </p>
                <h2 className="mt-3 text-3xl font-semibold">Compra</h2>
              </div>
              <span className="text-sm font-semibold">{isPaid ? "Pagada" : "Pendiente"}</span>
            </div>

            <div className="mt-7 space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-neutral-600">Productos</span>
                <span className="font-semibold">{order.itemsQuantity} artículos</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-semibold">{currencyFormatter(order.subtotal)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-neutral-600">Impuestos (19%)</span>
                <span className="font-semibold">{currencyFormatter(order.tax)}</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-neutral-300 pb-5">
                <span className="text-neutral-600">Envío</span>
                <span className="font-semibold">
                  {order.shipping === 0 ? "Gratis" : currencyFormatter(order.shipping)}
                </span>
              </div>
              <div className="flex items-end justify-between gap-4 pt-1">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-semibold">{currencyFormatter(order.total)}</span>
              </div>
            </div>

            <div className="mt-8 border-t border-neutral-300 pt-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
                Entrega
              </p>
              <div className="space-y-2 text-sm text-neutral-700">
                <p className="font-semibold text-neutral-950">
                  {order.orderAddresses?.name} {order.orderAddresses?.lastName}
                </p>
                <p>{order.orderAddresses?.address}</p>
                {order.orderAddresses?.address2 && <p>{order.orderAddresses.address2}</p>}
                <p>
                  {order.orderAddresses?.city}, {order.orderAddresses?.zip}
                </p>
                <p>{order.orderAddresses?.country.name}</p>
                <p>{order.orderAddresses?.phone}</p>
              </div>
            </div>

            {!isPaid && (
              <div className="mt-8 border-t border-neutral-300 pt-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
                  Pago
                </p>
                <PaypalButton orderId={order.id} amount={order.total} />
              </div>
            )}
          </div>
        </aside>
      </section>
    </div>
  );
}
