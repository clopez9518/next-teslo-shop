'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { ErrorMessage } from './ErrorMessage';

export const LoginForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(null);

        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const res = await signIn('credentials', {
                email: formData.get('email'),
                password: formData.get('password'),
                redirect: false,
            });

            if (res?.error) {
                setErrorMessage('Invalid credentials.');
                return;
            }

            router.replace(callbackUrl);
        });
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col">

            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email"
                name="email"
                required
            />

            <label htmlFor="password">Contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                name="password"
                required
            />

            {errorMessage && (
                <ErrorMessage message="Credenciales incorrectas" />
            )}

            <button
                type="submit"
                disabled={isPending}
                className={clsx(
                    'btn-primary flex items-center justify-center gap-2 transition-all duration-200',
                    {
                        'opacity-60 cursor-not-allowed': isPending,
                    }
                )}
            >
                {isPending && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                )}
                {isPending ? 'Ingresando...' : 'Ingresar'}
            </button>

            {/* divisor */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500" />
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500" />
            </div>

            <Link
                href="/auth/register"
                className="btn-secondary text-center"
            >
                Crear una nueva cuenta
            </Link>
        </form>
    );
};
