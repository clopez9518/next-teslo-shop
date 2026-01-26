import { Title } from "@/components";
import { CartView } from "@/components/cart/CartView";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Carrito de compras",
    robots: "noindex, nofollow",
};


export default function CartPage() {

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">
                <Title title="Carrito de compras" />
                <CartView />
            </div>
        </div>
    )
}
