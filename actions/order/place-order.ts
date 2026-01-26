'use server';

import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async (productsToOrder: ProductToOrder[], address: Address) => {

    try {

        //Verificar que el usuario esta autenticado
        const session = await auth()
        if (!session?.user.id) return { ok: false, message: 'No autorizado' }
        const userId = session.user.id;

        //Obtener los productos
        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: productsToOrder.map(product => product.productId)
                }
            }
        })

        // Calcular montos
        const itemsInOrder = productsToOrder.reduce((acc, product) => acc + product.quantity, 0)

        // Obtener tax, subtotal, total y shipping
        const { subtotal, tax, total } = productsToOrder.reduce((acc, item) => {
            const product = products.find(product => item.productId === product.id)

            if (!product) throw new Error('Producto no encontrado')

            const subTotal = product.price * item.quantity

            acc.subtotal += subTotal
            acc.tax += (subTotal * 0.19)
            acc.total += subTotal + Math.trunc(subTotal * 0.19)
            return acc
        }, { subtotal: 0, tax: 0, total: 0 })
        const shipping = total > 100 ? 0 : 10


        const prismaTx = await prisma.$transaction(async (tx) => {
            const { country, firstName, ...restAddress } = address

            //Actualizar el stock
            const updatedProductsPromises = products.map((product) => {

                //acumular la cantidad de productos
                const productsQuantity = productsToOrder.filter(p => p.productId === product.id)
                    .reduce((acc, item) => acc + item.quantity, 0)

                if (productsQuantity <= 0) throw new Error(`El producto ${product.title} no tiene cantidad definida`)

                return tx.product.update({
                    where: { id: product.id },
                    data: {
                        inStock: {
                            decrement: productsQuantity
                        }
                    }
                })

            })

            const updatedProducts = await Promise.all(updatedProductsPromises)

            //verificar que el stock sea mayor o igual a 0
            updatedProducts.forEach(product => {
                if (product.inStock < 0) throw new Error(`El producto ${product.title} no tiene stock`)
            })

            const order = await tx.order.create({
                data: {
                    userId,
                    itemsQuantity: itemsInOrder,
                    subtotal,
                    tax,
                    total,
                    shipping,

                    itemsInOrder: {
                        createMany: {
                            data: productsToOrder.map(p => ({
                                productId: p.productId,
                                quantity: p.quantity,
                                size: p.size,
                                price: products.find(product => product.id === p.productId)?.price || 0
                            }))
                        }
                    },

                    orderAddresses: {
                        create: {
                            ...restAddress,
                            name: firstName,
                            countryId: country,
                        }
                    }

                },
                include: {
                    itemsInOrder: true,
                    orderAddresses: true
                }
            })


            // Validar si el price es 0, lanzar error;
            order.itemsInOrder.forEach(item => {
                if (item.price === 0) throw new Error('Error al encontrar el precio del producto ' + item.productId)
            })

            return {
                order,
                updatedProducts,
            }

        })

        return {
            ok: true,
            order: prismaTx.order,
            prismaTx,
            message: 'Orden creada'
        }

    } catch (error: any) {
        return {
            ok: false,
            message: error.message
        }
    }
}