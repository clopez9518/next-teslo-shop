import { getPaginatedOrders } from '@/actions';
import { Title } from '@/components';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';

export default async function OrdersAdminPage() {

    const { orders, ok } = await getPaginatedOrders();
    console.log(orders);

    if (!ok || !orders) return notFound();

    return (
        <>
            <Title title="Orders" />
            <div className="mb-10">
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                #ID
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Nombre completo
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Estado
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Opciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            orders.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-10">
                                        No hay ordenes
                                    </td>
                                </tr>
                            )
                        }

                        {
                            orders.map((order) => (
                                <tr key={order.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {order.orderAddresses?.name} {order.orderAddresses?.lastName}
                                    </td>
                                    <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                                        <IoCardOutline className="text-green-800" />
                                        <span className='mx-2 text-green-800'>{order.status}</span>

                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 ">
                                        <Link href={`/orders/${order.id}`} className="hover:underline">
                                            Ver orden
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}