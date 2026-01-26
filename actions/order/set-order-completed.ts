'use server';

import { prisma } from "@/app/lib/prisma"
import { revalidatePath } from "next/cache";


export const setOrderCompleted = async (orderId: string) => {

    try {
        const order = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                status: 'paid',
                paidAt: new Date()
            }
        })

        revalidatePath(`/orders/${orderId}`);

        return {
            ok: true,
            order
        }
    } catch (error) {
        return {
            ok: false,
            message: 'Error al actualizar el estado de la orden'
        }
    }

}