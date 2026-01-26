'use server';

import { prisma } from "@/app/lib/prisma";


export const setTransactionId = async (orderId: string, transactionId: string) => {

    try {

        const updatedOrder = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                transactionId
            }
        })

        return {
            ok: true,
            updatedOrder
        }

    } catch (error) {
        return {
            ok: false,
            message: 'Error al actualizar la orden'
        }
    }

}