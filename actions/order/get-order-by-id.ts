import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth.config";

export const getOrderById = async (id: string) => {
    const session = await auth();
    if (!session?.user) {
        return {
            ok: false,
            message: 'No estas autorizado para realizar esta accion'
        }
    }

    try {
        const order = await prisma.order.findUnique({
            where: {
                id
            },
            include: {
                itemsInOrder: {
                    include: {
                        product: {
                            include: {
                                images: true
                            }
                        }
                    }
                },
                orderAddresses: {
                    include: {
                        country: true
                    }
                },
            }
        });

        if (!order) return {
            ok: false,
            message: 'Orden no encontrada'
        }


        if (order.userId !== session.user.id && session.user.role !== 'admin') {
            return {
                ok: false,
                message: 'No estas autorizado para realizar esta accion'
            }
        }


        return {
            ok: true,
            order
        }

    } catch (error) {
        return {
            ok: false,
            message: 'Error al obtener la orden'
        }
    }


}