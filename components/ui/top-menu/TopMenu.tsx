"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { IoBagOutline, IoMenuOutline, IoSearchOutline } from "react-icons/io5";
import { CartModal } from "@/components/cart/CartModal";
import { montserratAlternates } from "@/config/fonts";
import { useCartStore, useUiStore } from "@/store";

const navItems = [
  { href: "/category/men", label: "Hombres" },
  { href: "/category/women", label: "Mujeres" },
  { href: "/category/kid", label: "Niños" },
];

const emptySubscribe = () => () => {};

export const TopMenu = () => {
  const openMenu = useUiStore((state) => state.openMenu);
  const isMenuOpen = useUiStore((state) => state.isMenuOpen);
  const { getTotalItems, isModalOpen } = useCartStore((state) => state);
  const loaded = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const totalItems = getTotalItems();

  const handleMenu = () => {
    if (isMenuOpen) return;
    openMenu();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto grid h-16 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-8">
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-semibold text-neutral-600 transition-colors hover:text-neutral-950"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex md:hidden">
          <button
            aria-label="Abrir menu"
            className="flex h-10 w-10 items-center justify-center border border-neutral-200 transition-colors hover:border-neutral-950"
            onClick={handleMenu}
            type="button"
          >
            <IoMenuOutline className="h-5 w-5" />
          </button>
        </div>

        <Link href="/" className="justify-self-center text-neutral-950">
          <span className={`${montserratAlternates.className} text-2xl font-bold antialiased`}>Teslo</span>
          <span className="text-xl font-bold antialiased"> | Shop</span>
        </Link>

        <div className="flex items-center justify-end gap-2">
          <Link
            aria-label="Buscar"
            href="/search"
            className="flex h-10 w-10 items-center justify-center border border-transparent text-neutral-700 transition-colors hover:border-neutral-200 hover:text-neutral-950"
          >
            <IoSearchOutline className="h-5 w-5" />
          </Link>

          <div className="relative">
            <Link
              aria-label="Carro"
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center border border-transparent text-neutral-700 transition-colors hover:border-neutral-200 hover:text-neutral-950"
            >
              <IoBagOutline className="h-5 w-5" />
              {loaded && totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center bg-neutral-950 px-1 text-[11px] font-semibold leading-none text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <div
              className={
                "z-50 " +
                (isModalOpen
                  ? "fixed left-4 right-4 top-20 sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:w-96 fade-in"
                  : "hidden")
              }
            >
              <CartModal />
            </div>
          </div>

          <button
            className="hidden h-10 items-center gap-2 border border-neutral-200 px-4 text-sm font-semibold uppercase tracking-[0.14em] text-neutral-950 transition-colors hover:border-neutral-950 md:flex"
            onClick={handleMenu}
            type="button"
          >
            Menu
            <IoMenuOutline className="h-5 w-5" />
          </button>
        </div>
      </nav>
    </header>
  );
};
