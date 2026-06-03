import Link from "next/link";
import { IoBagOutline } from "react-icons/io5";

const categories = [
  { href: "/category/men", label: "Hombres" },
  { href: "/category/women", label: "Mujeres" },
  { href: "/category/kid", label: "Niños" },
];

export default function EmptyPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <section className="grid min-h-[calc(100vh)] border-y border-neutral-200 bg-[#f6f6f2] sm:-mx-10 lg:grid-cols-[1fr_0.78fr]">
        <div className="flex flex-col justify-between px-6 py-10 sm:px-12 lg:px-16">
          <div className="flex items-center justify-between border-b border-neutral-300 pb-4 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-600">
            <span>Carrito</span>
            <span>0 artículos</span>
          </div>

          <div className="max-w-3xl py-16">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-neutral-500">
              Aun no hay artículos
            </p>
            <h1 className="text-5xl font-semibold leading-[0.92] sm:text-7xl lg:text-8xl">
              Tu carrito está vacío.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-neutral-600 sm:text-lg">
              Explora nuestras colecciones y encuentra las piezas que mejor se adaptan a tu estilo y ritmo de vida.
            </p>

            <Link
              href="/"
              className="inline-flex h-11 mt-2 w-fit items-center justify-center bg-neutral-950 px-7 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[(--primary)]"
            >
              Explorar tienda
            </Link>
          </div>

          <div className="grid gap-4 border-t border-neutral-300 pt-5 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="grid grid-cols-3 gap-3 text-sm text-neutral-700">
              <span>Novedades</span>
              <span>Sudaderas</span>
              <span>Accesorios</span>
            </div>
          </div>
        </div>

        <aside className="flex min-h-105 flex-col justify-between bg-neutral-950 px-6 py-10 text-white sm:px-12 lg:px-16">
          <div className="flex h-20 w-20 items-center justify-center border border-white/20">
            <IoBagOutline className="h-10 w-10" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              Siguiente paso
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Empieza por una categoría.
            </h2>
            <div className="mt-8 grid gap-px bg-white/15">
              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="flex h-14 items-center justify-between bg-neutral-950 text-sm font-semibold transition-colors hover:bg-white hover:px-4 hover:text-neutral-950"
                >
                  {category.label}
                  <span className="text-xs uppercase tracking-[0.18em]">Ver</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-4 border-t border-white/15 pt-6 text-sm text-white/65 sm:grid-cols-3">
              <span>Diseño atemporal</span>
              <span>Comodidad diaria</span>
              <span>Calidad duradera</span>
          </div>
        </aside>
      </section>
    </div>
  );
}
