import Link from "next/link";
import { auth } from "@/auth.config";
import { montserratAlternates } from "@/config/fonts";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
        <section className="hidden min-h-screen flex-col justify-between bg-neutral-950 px-12 py-10 text-white lg:flex">
          <Link href="/" className="w-fit">
            <span className={`${montserratAlternates.className} text-3xl font-bold`}>Teslo</span>
            <span className="text-2xl font-bold"> | Shop</span>
          </Link>

          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/50">
              Acceso exclusivo
            </p>

            <h1 className="mt-5 text-6xl font-semibold leading-[0.95]">
              Tu espacio personal.
            </h1>

            <p className="mt-6 text-base leading-7 text-white/65">
              Consulta tus pedidos, guarda tus preferencias y continúa descubriendo piezas seleccionadas para tu estilo.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 border-t border-white/15 pt-6 text-sm text-white/65">
            <span>Diseño atemporal</span>
            <span>Comodidad diaria</span>
            <span>Calidad duradera</span>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center bg-[#f6f6f2] px-5 py-10 sm:px-8">
          <div className="w-full max-w-115 border border-neutral-200 bg-white p-6 sm:p-9">
            <Link href="/" className="mb-10 inline-flex lg:hidden">
              <span className={`${montserratAlternates.className} text-2xl font-bold`}>Teslo</span>
              <span className="text-xl font-bold"> | Shop</span>
            </Link>
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
