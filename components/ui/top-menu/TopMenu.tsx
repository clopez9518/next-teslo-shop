'use client'

import { montserratAlternates } from "@/config/fonts"
import Link from "next/link"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"
import { useUiStore } from "@/store"
import { useCartStore } from "@/store"
import { useEffect, useState } from "react";
import { CartModal } from "@/components/cart/CartModal"

export const TopMenu = () => {

    const { openMenu, isMenuOpen } = useUiStore();
    const { getTotalItems, isModalOpen } = useCartStore((state) => state);
    const totalItems = getTotalItems();
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true);
    }, []);

    const handleMenu = () => {
        if (isMenuOpen) return;
        openMenu();
    }

    return (
        <nav className="flex px-5 justify-between items-center w-full">

            {/* Logo */}
            <Link href="/">
                <span className={`${montserratAlternates.className} text-2xl font-bold antialiased`}>Teslo</span>
                <span className="text-xl font-bold antialiased"> | Shop</span>
                {/* <Image
                    src="/logo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                /> */}
            </Link>

            {/* Center menu */}
            <div className="hidden sm:block">
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href={'/category/men'}>Hombres</Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href={'/category/women'}>Mujeres</Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href={'/category/kid'}>Niños</Link>
            </div>

            {/* Search, cart, menu */}
            <div className="flex items-center gap-4 m-2 p-2">
                <Link href={'/search'}><IoSearchOutline className="w-5 h-5" /></Link>

                <div className="relative">
                    <Link href={'/cart'}><IoCartOutline className="w-5 h-5" /></Link>
                    {
                        loaded && (
                            <>

                                <span
                                    style={{ padding: '9px' }}
                                    className="absolute w-4 h-4 -top-2 -right-2 bg-red-500 rounded-full 
                                text-xs text-center justify-center flex items-center text-white">{totalItems}</span>

                            </>
                        )
                    }

                    {/* Mobile: fixed overlay at top-right; sm+: absolute dropdown */}
                    <div
                        className={
                            "z-50 " +
                            (isModalOpen
                                ? "fixed top-16 left-0 right-0 mx-4 sm:mx-0 sm:absolute sm:top-5 sm:right-0 sm:left-auto fade-in"
                                : "hidden")
                        }
                    >
                        <CartModal />
                    </div>
                </div>



                <button onClick={handleMenu} className="rounded-md transition-all hover:bg-gray-100 cursor-pointer p-2">
                    Menú
                </button>
            </div>

        </nav>
    )
}
