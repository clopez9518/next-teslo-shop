import { getPaginatedProductsWithImages } from '@/actions';
import { getProductImageUrl } from '@/adapters/adapters';
import { Pagination, ProductImage, Title } from '@/components';
import { currencyFormatter } from '@/utils/currencyFormatter';
import Image from 'next/image';

import Link from 'next/link';


interface Props {
    searchParams: Promise<{ page?: string; take?: string }>;
}

export default async function AdminProductsPage({ searchParams }: Props) {



    const params = await searchParams;

    const page = Number(params?.page) || 1;
    const take = Number(params?.take) || 12;

    const { products, totalPages } = await getPaginatedProductsWithImages({ page, take });

    return (
        <>
            <Title title="Mantemiento de productos" />

            <div className="flex justify-end mb-5">
                <Link href="/admin/product/new" className="btn-primary">
                    Nuevo producto
                </Link>
            </div>

            <div className="mb-10">
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Imagen
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Titulo
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Precio
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Genero
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Stock
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Tallas
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Opciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-10">
                                        No hay ordenes
                                    </td>
                                </tr>
                            )
                        }

                        {
                            products.map((product) => (
                                <tr key={product.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <Link href={`/admin/product/${product.slug}`}>
                                            <ProductImage url={getProductImageUrl(product)[0]} alt={product.title} width={50} height={50} />
                                        </Link>
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap hover:underline">
                                        <Link href={`/admin/product/${product.slug}`}>
                                            {product.title}
                                        </Link>
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <span className="font-bold">{currencyFormatter(product.price)}</span>
                                    </td>

                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {product.gender}
                                    </td>
                                    <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap font-bold">
                                        {product.inStock}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {product.sizes.join(' | ')}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 ">
                                        <Link href={`/admin/product/${product.slug}`} className="hover:underline">
                                            Editar
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <Pagination totalPages={totalPages} />
            </div>
        </>
    );
}