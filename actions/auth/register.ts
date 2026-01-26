'use server';

import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

interface RegisterUserProps {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

interface RegisterUserResponse {
    ok: boolean;
    user?: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
    message: string;
}

export const registerUser = async (
    { name, email, password, passwordConfirmation }: RegisterUserProps
): Promise<RegisterUserResponse> => {
    try {
        if (password !== passwordConfirmation) {
            throw new Error('Las contraseñas no coinciden');
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: bcrypt.hashSync(password),
                role: 'user'
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        })

        return {
            ok: true,
            user,
            message: 'Usuario registrado correctamente'
        };

    } catch (error) {
        return {
            ok: false,
            message: 'Error al registrar el usuario'
        }
    }
}
