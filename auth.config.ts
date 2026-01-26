import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import { z } from 'zod';
import { prisma } from './app/lib/prisma';
import bcrypt from 'bcryptjs';

export const authConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register'
    },

    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;

            const protectedRoutes = ['/profile', '/orders', '/checkout', '/checkout/address', '/admin'];

            const isOnProtectedRoute = protectedRoutes.some(route => nextUrl.pathname.startsWith(route));
            if (isOnProtectedRoute) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            }

            return true;
        },

        jwt: async ({ token, user }) => {
            if (user) {
                token.data = user;
            }
            return token;
        },
        session: async ({ session, token, user }) => {
            if (token) {
                session.user = token.data;
            }
            return session;
        }
    },

    providers: [
        GitHub,
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const { email, password } = parsedCredentials.data;

                // Buscar usuario
                const user = await prisma.user.findUnique({ where: { email } });
                if (!user) return null;

                // Validar contraseña
                const isValidPassword = await bcrypt.compare(password, user.password);
                if (!isValidPassword) return null;

                const { password: _, ...rest } = user;
                return rest;
            },
        }),
    ]
} satisfies NextAuthConfig;


export const { signIn, signOut, auth, handlers } = NextAuth({ ...authConfig });