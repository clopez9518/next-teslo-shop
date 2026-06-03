"use client";

import clsx from "clsx";
import { useSession } from "next-auth/react";
import {
  IoBagOutline,
  IoCloseOutline,
  IoLogInOutline,
  IoPersonAddOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { useUiStore } from "@/store";
import { montserratAlternates } from "@/config/fonts";
import { LogoutItem } from "./LogoutItem";
import { SidebarMenuItem } from "./SidebarMenuItem";

const shopItems = [
  { href: "/category/men", icon: <IoShirtOutline className="h-5 w-5" />, title: "Hombres" },
  { href: "/category/women", icon: <IoShirtOutline className="h-5 w-5" />, title: "Mujeres" },
  { href: "/category/kid", icon: <IoShirtOutline className="h-5 w-5" />, title: "Niños" },
  { href: "/cart", icon: <IoBagOutline className="h-5 w-5" />, title: "Carrito" },
];

const accountItems = [
  { href: "/profile", icon: <IoPersonOutline className="h-5 w-5" />, title: "Profile" },
  { href: "/orders", icon: <IoTicketOutline className="h-5 w-5" />, title: "Orders" },
];

const adminItems = [
  { href: "/admin/products", icon: <IoShirtOutline className="h-5 w-5" />, title: "Products" },
  { href: "/admin/orders", icon: <IoTicketOutline className="h-5 w-5" />, title: "Orders" },
  { href: "/admin/users", icon: <IoPersonOutline className="h-5 w-5" />, title: "Users" },
];

export const Sidebar = () => {
  const { data: session, status } = useSession();
  const isMenuOpen = useUiStore((state) => state.isMenuOpen);
  const closeMenu = useUiStore((state) => state.closeMenu);

  const isAuthenticated = status === "authenticated";
  const isAdmin = session?.user?.role === "admin";

  if (status === "loading") return null;

  return (
    <div>
      <div
        className={clsx(
          "fixed inset-0 z-50 bg-neutral-950/35 opacity-0 transition-opacity duration-200 ease-out",
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!isMenuOpen}
        onClick={closeMenu}
      />

      <nav
        className={clsx(
          "fixed right-0 top-0 z-50 flex h-screen w-full max-w-105 translate-x-0 transform-gpu flex-col bg-[#f6f6f2] text-neutral-950 shadow-2xl transition-transform duration-200 ease-out will-change-transform contain-[layout_paint]",
          !isMenuOpen && "translate-x-full"
        )}
        aria-label="Menu lateral"
        aria-hidden={!isMenuOpen}
      >
        <div className="flex items-center justify-between border-b border-neutral-300 px-6 py-5">
          <div>
            <p className={`${montserratAlternates.className} text-2xl font-bold`}>Teslo</p>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
              Shop menu
            </p>
          </div>
          <button
            aria-label="Cerrar menu"
            className="flex h-10 w-10 items-center justify-center border border-neutral-300 bg-white transition-colors hover:border-neutral-950"
            onClick={closeMenu}
            type="button"
          >
            <IoCloseOutline className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-7">
          {/* <div className="relative">
            <IoSearchOutline className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Buscar"
              className="h-12 w-full border border-neutral-300 bg-white pl-12 pr-4 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950"
            />
          </div> */}

          <section className="mt-9">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Comprar
            </p>
            <div>
              {shopItems.map((item) => (
                <SidebarMenuItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  title={item.title}
                  onClick={closeMenu}
                />
              ))}
            </div>
          </section>

          <section className="mt-9">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Cuenta
            </p>
            <div>
              {isAuthenticated ? (
                <>
                  {accountItems.map((item) => (
                    <SidebarMenuItem
                      key={item.href}
                      href={item.href}
                      icon={item.icon}
                      title={item.title}
                      onClick={closeMenu}
                    />
                  ))}
                  <LogoutItem />
                </>
              ) : (
                <>
                  <SidebarMenuItem
                    href="/auth/login"
                    icon={<IoLogInOutline className="h-5 w-5" />}
                    title="Login"
                    onClick={closeMenu}
                  />
                  <SidebarMenuItem
                    href="/auth/register"
                    icon={<IoPersonAddOutline className="h-5 w-5" />}
                    title="Register"
                    onClick={closeMenu}
                  />
                </>
              )}
            </div>
          </section>

          {isAuthenticated && isAdmin && (
            <section className="mt-9">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                Admin
              </p>
              <div>
                {adminItems.map((item) => (
                  <SidebarMenuItem
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                    title={item.title}
                    onClick={closeMenu}
                  />
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="border-t border-neutral-300 px-6 py-5">
          <p className="text-xs leading-5 text-neutral-500">
            Esenciales seleccionados, compras simples y una experiencia diseñada para acompañarte en cada visita.
          </p>
        </div>
      </nav>
    </div>
  );
};
