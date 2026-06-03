"use client";

import Link from "next/link";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerUser } from "@/actions/auth/register";

type FormInputs = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const inputClassName =
  "mt-2 h-12 w-full border border-neutral-300 bg-white px-4 text-sm outline-none transition-colors focus:border-neutral-950";

const errorClassName = "mt-2 text-sm font-semibold text-red-600";

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage(null);
    const { passwordConfirmation, name, email, password } = data;

    if (password !== passwordConfirmation) {
      setErrorMessage("Las contrasenas no coinciden");
      return;
    }

    const resp = await registerUser({
      name,
      email,
      password,
      passwordConfirmation,
    });

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    startTransition(async () => {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      router.replace("/");
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-9 space-y-5">
      <div>
        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
          Nombre completo
        </label>
        <input
          id="name"
          className={clsx(inputClassName, errors.name && "border-red-500 focus:border-red-500")}
          type="text"
          {...register("name", {
            required: "El nombre es obligatorio",
          })}
        />
        {errors.name?.message && <p className={errorClassName}>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
          Correo electronico
        </label>
        <input
          id="email"
          className={clsx(inputClassName, errors.email && "border-red-500 focus:border-red-500")}
          type="email"
          {...register("email", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/,
              message: "El correo debe ser valido",
            },
          })}
        />
        {errors.email?.message && <p className={errorClassName}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
          Contrasena
        </label>
        <input
          id="password"
          className={clsx(inputClassName, errors.password && "border-red-500 focus:border-red-500")}
          type="password"
          {...register("password", {
            required: "La contrasena es obligatoria",
            minLength: {
              value: 6,
              message: "La contrasena debe tener al menos 6 caracteres",
            },
          })}
        />
        {errors.password?.message && <p className={errorClassName}>{errors.password.message}</p>}
      </div>

      <div>
        <label
          htmlFor="passwordConfirmation"
          className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500"
        >
          Confirmar contrasena
        </label>
        <input
          id="passwordConfirmation"
          className={clsx(inputClassName, errors.passwordConfirmation && "border-red-500 focus:border-red-500")}
          type="password"
          {...register("passwordConfirmation", {
            required: "La confirmacion de contrasena es obligatoria",
            validate: {
              matchesPassword: (value) => value === getValues("password") || "Las contrasenas no coinciden",
            },
          })}
        />
        {errors.passwordConfirmation?.message && (
          <p className={errorClassName}>{errors.passwordConfirmation.message}</p>
        )}
      </div>

      {errorMessage && (
        <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className={clsx(
          "flex h-12 w-full items-center justify-center gap-2 bg-neutral-950 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[(--primary)]",
          isPending && "cursor-not-allowed opacity-60"
        )}
      >
        {isPending && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
        {isPending ? "Registrando..." : "Crear cuenta"}
      </button>

      <div className="flex items-center gap-3 py-2">
        <div className="h-px flex-1 bg-neutral-200" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">O</span>
        <div className="h-px flex-1 bg-neutral-200" />
      </div>

      <Link
        href="/auth/login"
        className="flex h-12 w-full items-center justify-center border border-neutral-300 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-950 transition-colors hover:border-neutral-950"
      >
        Ya tengo cuenta
      </Link>
    </form>
  );
};
