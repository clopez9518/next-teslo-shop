import Link from "next/link";
import { redirect } from "next/navigation";
import {
  IoBagHandleOutline,
  IoCardOutline,
  IoChevronForwardOutline,
  IoLocationOutline,
  IoMailOutline,
  IoPersonOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

import { getAddress } from "@/actions/address/address";
import { getOrdersByUser } from "@/actions/order/get-orders-by-user";
import { auth } from "@/auth.config";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = session.user;
  const [addressResponse, ordersResponse] = await Promise.all([
    user.id ? getAddress(user.id) : null,
    getOrdersByUser(),
  ]);

  const address = addressResponse?.ok ? addressResponse.address : null;
  const orders = ordersResponse.ok && ordersResponse.orders ? ordersResponse.orders : [];
  const recentOrders = orders.slice(0, 3);
  const paidOrders = orders.filter((order) => order.status === "paid").length;
  const initials =
    user.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "TU";

  const accountStats = [
    { label: "Ordenes", value: orders.length.toString() },
    { label: "Pagadas", value: paidOrders.toString() },
    { label: "Rol", value: user.role === "admin" ? "Admin" : "Cliente" },
  ];

  const quickActions = [
    {
      href: "/orders",
      title: "Historial de ordenes",
      description: "Revisa compras, estados y comprobantes.",
      icon: <IoBagHandleOutline className="h-5 w-5" />,
    },
    // {
    //   href: "/checkout/address",
    //   title: address ? "Editar direccion" : "Agregar direccion",
    //   description: "Manten listos tus datos de entrega.",
    //   icon: <IoLocationOutline className="h-5 w-5" />,
    // },
    {
      href: "/cart",
      title: "Volver al carrito",
      description: "Continua tu selección pendiente.",
      icon: <IoCardOutline className="h-5 w-5" />,
    },
  ];

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <section className="-mx-2 border-y border-neutral-200 bg-[#f6f6f2] px-6 py-10 sm:-mx-10 sm:px-12 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_380px] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Cuenta
            </p>
            <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-none sm:text-7xl">
              Perfil
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
                Un espacio pensado para gestionar tus datos, consultar tus pedidos y disfrutar de una experiencia más personalizada.
            </p>
          </div>

          <div className="border border-neutral-200 bg-white p-6">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center bg-neutral-950 text-lg font-semibold text-white">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xl font-semibold">{user.name}</p>
                <p className="mt-1 truncate text-sm text-neutral-500">{user.email}</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 border-t border-neutral-200 pt-5">
              {accountStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-lg font-semibold">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 py-10 sm:py-14 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-8">
          <section className="border-b border-neutral-200 pb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                  Acciones
                </p>
                <h2 className="mt-3 text-3xl font-semibold">Gestiona tu cuenta</h2>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-950 underline underline-offset-8 transition hover:text-neutral-500"
              >
                Explorar tienda
                <IoChevronForwardOutline className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group border border-neutral-200 bg-white p-6 transition hover:border-neutral-950"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid h-11 w-11 place-items-center bg-neutral-950 text-white">
                      {action.icon}
                    </span>
                    <IoChevronForwardOutline className="h-4 w-4 text-neutral-400 transition group-hover:translate-x-1 group-hover:text-neutral-950" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{action.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-500">
                    {action.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                  Actividad
                </p>
                <h2 className="mt-3 text-3xl font-semibold">Últimas ordenes</h2>
              </div>
              <Link
                href="/orders"
                className="hidden text-sm font-semibold uppercase tracking-[0.18em] underline underline-offset-8 transition hover:text-neutral-500 sm:inline"
              >
                Ver todas
              </Link>
            </div>

            <div className="mt-8 border-y border-neutral-200">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/orders/${order.id}`}
                    className="grid gap-3 border-b border-neutral-200 py-5 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center"
                  >
                    <div>
                      <p className="text-sm font-semibold">Orden #{order.id.slice(0, 8)}</p>
                      <p className="mt-2 text-sm text-neutral-500">
                        {order.itemsQuantity} producto{order.itemsQuantity === 1 ? "" : "s"} -{" "}
                        {order.orderAddresses?.name || user.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 sm:justify-end">
                      <span className="text-sm font-semibold">
                        ${order.total.toFixed(2)}
                      </span>
                      <span className="border border-neutral-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">
                        {order.status}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="py-12">
                  <p className="text-lg font-semibold">Aún no tienes ordenes.</p>
                  <p className="mt-3 max-w-md text-sm leading-6 text-neutral-500">
                    Cuando completes tu primera compra, aparecera aquí con su estado y
                    acceso al detalle.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="bg-neutral-950 p-7 text-white">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                Datos
              </p>
              <IoShieldCheckmarkOutline className="h-5 w-5 text-white/60" />
            </div>

            <div className="mt-8 grid gap-6">
              <div className="flex gap-4">
                <IoPersonOutline className="mt-1 h-5 w-5 shrink-0 text-white/50" />
                <div>
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="mt-1 text-sm text-white/55">
                    {user.role === "admin" ? "Administrador" : "Cliente registrado"}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <IoMailOutline className="mt-1 h-5 w-5 shrink-0 text-white/50" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{user.email}</p>
                  <p className="mt-1 text-sm text-white/55">Correo de acceso</p>
                </div>
              </div>

              <div className="flex gap-4 border-t border-white/15 pt-6">
                <IoLocationOutline className="mt-1 h-5 w-5 shrink-0 text-white/50" />
                <div>
                  {address ? (
                    <>
                      <p className="text-sm font-semibold">
                        {address.address}
                        {address.address2 ? `, ${address.address2}` : ""}
                      </p>
                      <p className="mt-1 text-sm text-white/55">
                        {address.city}, {address.zip}
                      </p>
                    </>
                  ) 
                  : (
                    <>
                      <p className="text-sm font-semibold">Sin dirección guardada</p>
                    </>
                  )
                  }
                </div>
              </div>
            </div>

            {/* <Link
              href="/checkout/address"
              className="mt-8 inline-flex w-full items-center justify-between border border-white/20 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition hover:border-white hover:bg-white hover:text-neutral-950"
            >
              Direccion
              <IoChevronForwardOutline className="h-4 w-4" />
            </Link> */}
          </div>
        </aside>
      </section>
    </main>
  );
}
