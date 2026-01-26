'use server';
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth.config";
import { revalidatePath } from "next/cache";

export const setUserRole = async (userId: string, role: 'admin' | 'user') => {

    const session = await auth();
    if (!session?.user) return { ok: false, message: 'No tienes permiso' };
    if (session.user.role !== 'admin') return { ok: false, message: 'No tienes permiso' };


    try {
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                role,
            },
        })

        revalidatePath('/admin/users');

        return {
            ok: true,
            user,
        }

    } catch (error) {
        return {
            ok: false,
            message: 'Error al actualizar el rol',
        }
    }

}