export const revalidate = 120; // 2 minutos

import Image from "next/image";
import Link from "next/link";
import { Pagination, ProductGrid } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import { redirect } from "next/navigation";
import { Product } from "@/interfaces";
import { currencyFormatter } from "@/utils/currencyFormatter";

interface Props {
  searchParams: Promise<{ page?: string; take?: string }>;
}

const productImageSrc = (product?: Product, index = 0) => {
  const url = product?.images[index]?.url || product?.images[0]?.url;

  if (!url) return "/imgs/placeholder.jpg";
  return url.startsWith("http") ? url : `/products/${url}`;
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params?.page) || 1;
  const take = Number(params?.take) || 12;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page, take });
  if (products.length === 0 && page > 1) redirect("/");

  const heroProduct = products[0];
  const secondaryProduct = products[1] || products[0];
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <section className="-mx-2 sm:-mx-10 min-h-[calc(100vh-72px)] grid lg:grid-cols-[1.05fr_0.95fr] border-y border-neutral-200 bg-[#f6f6f2]">
        <div className="flex min-h-140 flex-col justify-between px-6 py-8 sm:px-12 lg:px-16">
          <div className="flex items-center justify-between border-b border-neutral-300 pb-4 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-600">
            <span>Nueva temporada</span>
            <span>Essentials 2026</span>
          </div>

          <div className="max-w-3xl py-14 lg:py-20">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-neutral-500">
              Teslo Shop
            </p>
            <h1 className="text-5xl font-semibold leading-[0.92] text-neutral-950 sm:text-7xl lg:text-8xl">
              Menos ruido. Más estilo.
            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-neutral-600 sm:text-lg">
              Colecciones inspiradas en la simplicidad, diseñadas para combinar fácilmente y adaptarse a tu ritmo de vida.
            </p>
          </div>

          <div className="grid gap-4 border-t border-neutral-300 pt-5 text-sm text-neutral-700 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="grid grid-cols-3 gap-3">
              <span>Hombre</span>
              <span>Mujer</span>
              <span>Unisex</span>
            </div>
            <Link
              href="#catalogo"
              className="inline-flex h-11 w-fit items-center justify-center rounded-none bg-neutral-950 px-7 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[(--primary)]"
            >
              Comprar ahora
            </Link>
          </div>
        </div>

        <div className="relative min-h-130 overflow-hidden bg-neutral-200 lg:min-h-full">
          <Image
            src={productImageSrc(heroProduct)}
            alt={heroProduct?.title || "Producto destacado Teslo"}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/55 to-transparent p-6 text-white sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">
              Featured drop
            </p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{heroProduct?.title || "Coleccion Teslo"}</h2>
                <p className="mt-1 text-sm text-white/80">
                  {heroProduct ? currencyFormatter(heroProduct.price) : "Muy pronto"}
                </p>
              </div>
              {heroProduct && (
                <Link
                  href={`/product/${heroProduct.slug}`}
                  className="inline-flex h-10 w-fit items-center justify-center border border-white px-5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:bg-white hover:text-neutral-950"
                >
                  Ver producto
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 py-8 sm:grid-cols-3 sm:py-12">
        {[
          { label: "Hombres", href: "/category/men" },
          { label: "Mujeres", href: "/category/women" },
          { label: "Niños", href: "/category/kid" },
        ].map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className="group flex min-h-36 items-end justify-between border border-neutral-200 bg-neutral-50 p-5 transition-colors hover:border-neutral-950 hover:bg-white"
          >
            <span className="text-2xl font-semibold">{category.label}</span>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500 group-hover:text-neutral-950">
              Ver
            </span>
          </Link>
        ))}
      </section>

      {featuredProducts.length > 0 && (
        <section className="mx-auto max-w-7xl border-t border-neutral-200 py-12 sm:py-16">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                New arrivals
              </p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">Selección destacada</h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {featuredProducts.map((product) => (
              <Link key={product.slug} href={`/product/${product.slug}`} className="group block">
                <div className="relative aspect-4/5 overflow-hidden bg-neutral-100">
                  <Image
                    src={productImageSrc(product)}
                    alt={product.title}
                    fill
                    sizes="(min-width: 768px) 25vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4 text-sm">
                  <h3 className="font-medium leading-5 text-neutral-900">{product.title}</h3>
                  <p className="whitespace-nowrap font-semibold text-neutral-700">
                    {currencyFormatter(product.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="-mx-2 sm:-mx-10 grid border-y border-neutral-200 bg-neutral-950 text-white lg:grid-cols-2">
        <div className="relative min-h-115 overflow-hidden">
          <Image
            src={productImageSrc(secondaryProduct, 1)}
            alt={secondaryProduct?.title || "Editorial Teslo"}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover opacity-90"
          />
        </div>
        <div className="flex min-h-115 flex-col justify-between px-6 py-10 sm:px-12 lg:px-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/55">
            Estilo cotidiano
          </p>

          <div className="max-w-xl">
            <h2 className="text-4xl font-semibold leading-tight sm:text-6xl">
              Menos tendencia, más identidad.
            </h2>

            <p className="mt-6 text-base leading-7 text-white/70">
              Una colección diseñada para quienes valoran la simplicidad, el buen calce y la versatilidad. Prendas fáciles de combinar para cualquier ocasión.
            </p>
          </div>

          <div className="grid gap-6 border-t border-white/20 pt-6 text-sm text-white/70 sm:grid-cols-3">
            <span>Diseño atemporal</span>
            <span>Comodidad diaria</span>
            <span>Calidad duradera</span>
          </div>
        </div>
      </section>

      <section id="catalogo" className="mx-auto max-w-7xl py-12 sm:py-16">
        <div className="mb-8 flex flex-col gap-3 border-b border-neutral-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Shop
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">Catálogo</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-neutral-600">
            Explora las piezas disponibles y encuentra el ajuste que acompaña tu ritmo.
          </p>
        </div>

        {products.length > 0 ? (
          <>
            <ProductGrid products={products} />
            <Pagination totalPages={totalPages} fragment="catalogo" />
          </>
        ) : (
          <div className="flex min-h-90 flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-semibold">No hay productos disponibles</h2>
          </div>
        )}
      </section>
    </div>
  );
}
