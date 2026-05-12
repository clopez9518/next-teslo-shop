import { useCartStore } from "@/store"
import Link from "next/link";
import { ProductImage } from "../product/ProductImage";

export const CartModal = () => {

    const { cart, setIsModalOpen } = useCartStore((state) => state);

    return (
        <div className="w-full sm:w-80 bg-white rounded-xl shadow-2xl p-4 z-50">
            <div className="flex flex-col gap-4 max-h-64 overflow-y-auto">
                {
                    cart.map(item => (
                        <div key={item.id + item.size} className="flex gap-4">
                            {/* Imagen */}
                            <div className="w-16 h-16 relative flex-shrink-0">
                                <ProductImage
                                    url={item.image}
                                    alt={item.title}
                                    width={50}
                                    height={50}
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <Link
                                    href={`/product/${item.slug}`}
                                    className="font-semibold leading-tight line-clamp-2 underline hover:text-blue-500 transition">
                                    {item.title}
                                </Link>


                                {/* Precios */}

                                <div className="flex gap-2 text-sm">
                                    <div>Precio: ${item.price}</div>
                                    <div>Talla: {item.size}</div>
                                </div>

                                <div className="text-sm">
                                    Cantidad: {item.quantity}
                                </div>


                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Botón */}
            <Link href={'/cart'}>
                <button onClick={() => setIsModalOpen(false)} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition">
                    Ir al carro
                </button>
            </Link>
        </div>
    )
}
