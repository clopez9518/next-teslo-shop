import { Suspense } from "react";
import { LoginForm } from "./ui/LoginForm";

export default function LoginPage() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
        Bienvenido
      </p>
      <h1 className="mt-3 text-4xl font-semibold leading-tight text-neutral-950">
        Ingresar a Teslo
      </h1>
      <p className="mt-3 text-sm leading-6 text-neutral-600">
        Continua con tu cuenta para gestionar pedidos y comprar mas rapido.
      </p>

      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
