import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function EmptyPage() {
    return (
        <div className="flex justify-center items-center h-[800px]">
            <IoCartOutline className="text-6xl mx-5" />
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">Tu carrito está vacío</h1>
                <Link href="/" className="text-blue-600">Comienza a hacer tus primeros pasos</Link>
            </div>
        </div>
    )
}