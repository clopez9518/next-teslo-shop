import { RegisterForm } from "./ui/RegisterForm";

export default function RegisterPage() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
        Nueva cuenta
      </p>
      <h1 className="mt-3 text-4xl font-semibold leading-tight text-neutral-950">
        Registrarse
      </h1>
      <p className="mt-3 text-sm leading-6 text-neutral-600">
        Accede a una experiencia personalizada, guarda tus datos y consulta tus pedidos cuando lo necesites.
      </p>

      <RegisterForm />
    </div>
  );
}
