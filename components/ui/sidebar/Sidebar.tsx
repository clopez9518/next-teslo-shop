'use client'
import { IoCloseOutline, IoLogInOutline, IoPersonAddOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"
import { SidebarMenuItem } from "./SidebarMenuItem"
import { useUiStore } from "@/store"
import clsx from "clsx"
import { LogoutItem } from "./LogoutItem"
import { useSession } from "next-auth/react"

const menuItems = [
    { href: "/profile", icon: <IoPersonOutline className="w-6 h-6" />, title: "Profile" },
    { href: "/orders", icon: <IoTicketOutline className="w-6 h-6" />, title: "Orders" },
]

const AdminItems = [
    { href: "/admin/products", icon: <IoShirtOutline className="w-6 h-6" />, title: "Products" },
    { href: "/admin/orders", icon: <IoTicketOutline className="w-6 h-6" />, title: "Orders" },
    { href: "/admin/users", icon: <IoPersonOutline className="w-6 h-6" />, title: "Users" },
]

export const Sidebar = () => {

    const { data: session, status } = useSession();
    const isAuthenticated = status === 'authenticated';
    const { isMenuOpen, closeMenu } = useUiStore();

    const isAdmin = session?.user?.role === 'admin';

    if (status === 'loading') {
        return <div>Loading...</div>
    }

    return (
        <div>

            {/* background black */}
            {
                isMenuOpen && (
                    <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-30 z-50" />
                )
            }

            {/* blur */}
            {
                isMenuOpen && (
                    <div onClick={closeMenu} className="fade-in fixed top-0 left-0 w-screen h-screen z-50 backdrop-filter backdrop-blur-sm"></div>
                )
            }

            {/* Sidemenu */}
            <nav className={
                clsx(
                    "fade-in fixed p-5 top-0 right-0 h-screen w-72 z-50 bg-white shadow-2xl transform transition-all duration-300",
                    !isMenuOpen && "translate-x-full"
                )
            }>
                <IoCloseOutline
                    className="w-6 h-6 cursor-pointer"
                    onClick={closeMenu}
                />

                {/* Search input */}
                <div className="relative mt-14">
                    <IoSearchOutline className="absolute top-2 left-2 w-6 h-6" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full p-2 pl-10 rounded-md border-b-2 text-sm border-gray-400
                        focus:outline-none focus:border-gray-600 
                        "
                    />
                </div>

                {menuItems.map((item, index) => (
                    <SidebarMenuItem
                        key={index}
                        href={item.href}
                        icon={item.icon}
                        title={item.title}
                        onClick={closeMenu}
                    />
                ))}

                {
                    isAuthenticated ? (
                        <LogoutItem />
                    ) : (
                        <>
                            <SidebarMenuItem href="/auth/login" icon={<IoLogInOutline className="w-6 h-6" />} title="Login" onClick={closeMenu} />
                            <SidebarMenuItem href="/auth/register" icon={<IoPersonAddOutline className="w-6 h-6" />} title="Register" onClick={closeMenu} />
                        </>
                    )
                }

                {/* Line separator */}
                <hr className="my-5 border-gray-300" />


                {
                    isAuthenticated && isAdmin && (
                        AdminItems.map((item) => (
                            <SidebarMenuItem
                                key={item.href}
                                href={item.href}
                                icon={item.icon}
                                title={item.title}
                                onClick={closeMenu}
                            />
                        ))
                    )
                }

            </nav>
        </div>
    )
}
