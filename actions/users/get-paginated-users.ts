'use server';
import { prisma } from "@/app/lib/prisma"
import { auth } from "@/auth.config";

export const getPaginatedUsers = async () => {

    const session = await auth();

    if (!session?.user) return { ok: false, message: 'No tienes permiso' };
    if (session.user.role !== 'admin') return { ok: false, message: 'No tienes permiso' };

    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                image: true,
            },
            orderBy: {
                name: 'desc',
            },
        })

        return { ok: true, users };
    } catch (error) {
        return { ok: false, message: 'Error al obtener los usuarios' };
    }

}