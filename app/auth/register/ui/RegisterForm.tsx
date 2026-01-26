'use client';

import { registerUser } from "@/actions/auth/register";
import clsx from "clsx";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form"

import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';


type FormInputs = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}


export const RegisterForm = () => {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, },
    } = useForm<FormInputs>()


    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage(null);
        const { passwordConfirmation, name, email, password } = data;

        if (password !== passwordConfirmation) {
            setErrorMessage('Las contraseñas no coinciden')
            return;
        }

        const resp = await registerUser({
            name,
            email,
            password,
            passwordConfirmation,
        })

        if (!resp.ok) {
            setErrorMessage(resp.message);
            return;
        }

        startTransition(async () => {

            await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            router.replace('/')

            // await login(email, password);
            // router.replace('/');
        });

    }

    const password = watch("password");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

            <label htmlFor="name">Nombre completo</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-2",
                        {
                            "border-red-500": errors.name,
                        }
                    )
                }
                type="text"
                {...register("name", {
                    required: "El nombre es obligatorio"
                })}
            />

            <p className="text-red-500 text-sm mb-2">{errors.name?.message}</p>

            <label htmlFor="email">Correo electrónico</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-2",
                        {
                            "border-red-500": errors.email,
                        }
                    )
                }
                type="email"
                {...register("email", {
                    required: "El correo es obligatorio",
                    pattern: {
                        value: /^[^@]+@[^@]+\.[^@]+$/,
                        message: "El correo debe ser válido"
                    }
                })}
            />
            <p className="text-red-500 text-sm mb-2">{errors.email?.message}</p>


            <label htmlFor="password">Contraseña</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-2",
                        {
                            "border-red-500": errors.password,
                        }
                    )
                }
                type="password"
                {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                        value: 6,
                        message: "La contraseña debe tener al menos 6 caracteres"
                    }
                })}
            />
            <p className="text-red-500 text-sm mb-2">{errors.password?.message}</p>

            <label htmlFor="passwordConfirmation">Confirmar contraseña</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-2",
                        {
                            "border-red-500": errors.passwordConfirmation,
                        }
                    )
                }
                type="password"
                {...register("passwordConfirmation", {
                    required: "La confirmación de contraseña es obligatoria",
                    validate: {
                        matchesPassword: (value) =>
                            value === password ||
                            "Las contraseñas no coinciden"
                    }
                })}
            />
            <p className="text-red-500 text-sm mb-2">{errors.passwordConfirmation?.message}</p>

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
                {isPending ? 'Registrando...' : 'Registrarse'}
            </button>

            {errorMessage && (
                <p className="text-red-500 text-sm mb-2 mt-5 font-semibold">{errorMessage}</p>
            )}


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login"
                className="btn-secondary text-center">
                ¿Ya tienes una cuenta?
                Iniciar sesión
            </Link>

        </form>
    )
}