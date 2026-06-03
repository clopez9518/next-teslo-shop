"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { ErrorMessage } from "./ErrorMessage";

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.error) {
        setErrorMessage("Credenciales incorrectas");
        return;
      }

      router.replace(callbackUrl);
    });
  };

  return (
    <form onSubmit={onSubmit} className="mt-9 space-y-5">
      <div>
        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
          Correo electronico
        </label>
        <input
          className="mt-2 h-12 w-full border border-neutral-300 bg-white px-4 text-sm outline-none transition-colors focus:border-neutral-950"
          id="email"
          name="email"
          required
          type="email"
        />
      </div>

      <div>
        <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
          Contrasena
        </label>
        <input
          className="mt-2 h-12 w-full border border-neutral-300 bg-white px-4 text-sm outline-none transition-colors focus:border-neutral-950"
          id="password"
          name="password"
          required
          type="password"
        />
      </div>

      {errorMessage && <ErrorMessage message={errorMessage} />}

      <button
        type="submit"
        disabled={isPending}
        className={clsx(
          "flex h-12 w-full items-center justify-center gap-2 bg-neutral-950 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--primary)]",
          isPending && "cursor-not-allowed opacity-60"
        )}
      >
        {isPending && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
        {isPending ? "Ingresando..." : "Ingresar"}
      </button>

      <div className="flex items-center gap-3 py-2">
        <div className="h-px flex-1 bg-neutral-200" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">O</span>
        <div className="h-px flex-1 bg-neutral-200" />
      </div>

      <Link
        href={callbackUrl}
        className="block text-center text-sm font-semibold text-neutral-600 underline-offset-4 transition-colors hover:text-neutral-950 hover:underline"
      >
        Continuar como invitado
      </Link>

      <Link
        href="/auth/register"
        className="flex h-12 w-full items-center justify-center bg-neutral-100 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-950 transition-colors hover:bg-neutral-200"
      >
        Crear cuenta
      </Link>
    </form>
  );
};
