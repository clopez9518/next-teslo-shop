'use server';

import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth.config";

export const getOrdersByUser = async () => {

    const session = await auth();

    if (!session?.user) return { ok: false, message: 'No estas autorizado para realizar esta accion' }

    try {

        const orders = await prisma.order.findMany({
            where: {
                userId: session.user.id
            },

            include: {
                orderAddresses: {
                    select: {
                        name: true,
                        lastName: true
                    }
                }
            }
        })

        if (!orders) return { ok: false, message: 'No se encontraron ordenes' }

        return {
            ok: true,
            orders
        }

    } catch (error) {
        return { ok: false, message: 'Error al obtener las ordenes' }
    }

}