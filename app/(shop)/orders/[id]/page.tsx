import { getOrderById } from "@/actions/order/get-order-by-id";
import { PaypalButton, ProductImage, Title } from "@/components";
import { Product } from "@/interfaces";
import { currencyFormatter } from "@/utils/currencyFormatter";
import clsx from "clsx";
import Image from "next/image";
import { notFound } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";


interface Props {
    params: Promise<{ id: string }>;
}


export default async function OrderPage({ params }: Props) {

    const { id } = await params;

    if (!id) {
        notFound();
    }

    const { order, ok, message } = await getOrderById(id);

    if (!ok || !order) {
        notFound();
    }

    const products = order.itemsInOrder.map(item => ({
        ...item.product,
        price: item.price,
        quantity: item.quantity,
        size: item.size
    }));

    const isPaid = order.status === 'paid';

    const labelId = id.split('-').pop();


    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">

                <Title title={`Orden N° ${labelId}`} subtitle="Detalles de la orden" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* Carrito */}
                    <div className="flex flex-col mt-5">
                        <div className={
                            clsx("flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                {
                                    'bg-red-500': !isPaid,
                                    'bg-green-500': isPaid

                                })
                        }>
                            <IoCartOutline className="mr-2" size={30} />
                            <span className="mx-2">{isPaid ? 'Pagada' : 'Pendiente'}</span>
                        </div>

                        {/* Items */}
                        {
                            products.map(product => (
                                <div key={product.id + product.size} className="flex mb-5">
                                    <ProductImage
                                        url={product.images[0].url}
                                        alt={product.title}
                                        width={100}
                                        height={100}
                                        className="mr-5"
                                    />
                                    <div>
                                        <p>{product.title}</p>
                                        <p>Talla: {product.size}</p>
                                        <p>${product.price} x {product.quantity}</p>
                                        <p className="font-bold">Subtotal: ${product.price * product.quantity}</p>
                                    </div>
                                </div>
                            ))
                        }

                    </div>

                    {/* Checkout */}

                    <div className="">
                        <div className="bg-white rounded-xl shadow-xl p-7 sm:mt-5">
                            <h2 className="text-xl sm:text-2xl mb-2 font-bold"> Resumen de la compra </h2>

                            <div className="grid grid-cols-2 gap-2">
                                <span>No. Productos</span>
                                <span className="text-right">{order.itemsQuantity} Artículos</span>

                                <span>Subtotal</span>
                                <span className="text-right">{currencyFormatter(order.subtotal)}</span>

                                <span>Impuestos (19%)</span>
                                <span className="text-right">{currencyFormatter(order.tax)}</span>

                                <span>Envío</span>
                                <span className="text-right">{currencyFormatter(order.shipping)}</span>

                                <span className="font-bold text-xl">Total</span>
                                <span className="text-right font-bold text-xl">{currencyFormatter(order.total)}</span>

                            </div>

                            <hr className="my-5 text-gray-400" />

                            <h2 className="font-bold text-xl">Detalles del envío</h2>
                            <div className="grid grid-cols-2 mt-5 mb-3">
                                <span>Nombre</span>
                                <span className="text-right">{order.orderAddresses?.name}</span>

                                <span>Apellido</span>
                                <span className="text-right">{order.orderAddresses?.lastName}</span>

                                <span>Dirección</span>
                                <span className="text-right">{order.orderAddresses?.address}</span>

                                <span>Ciudad</span>
                                <span className="text-right">{order.orderAddresses?.city}</span>

                                <span>País</span>
                                <span className="text-right">{order.orderAddresses?.country.name}</span>

                                <span>Código postal</span>
                                <span className="text-right">{order.orderAddresses?.zip}</span>

                                <span>Teléfono</span>
                                <span className="text-right">{order.orderAddresses?.phone}</span>

                            </div>

                            {/* <div className="mt-5 mb-2 w-full">
                                <div className={
                                    clsx("flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                        {
                                            'bg-red-500': !isPaid,
                                            'bg-green-500': isPaid

                                        })
                                }>
                                    <IoCartOutline className="mr-2" size={30} />
                                    <span className="mx-2">{isPaid ? 'Pagada' : 'Pendiente'}</span>
                                </div>
                            </div> */}

                            {
                                !isPaid && (
                                    <PaypalButton orderId={order.id} amount={order.total} />
                                )
                            }
                        </div>

                    </div>


                </div>

            </div>
        </div>
    )
}
