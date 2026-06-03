export const revalidate = 120; // 2 minutos

import Image from "next/image";
import Link from "next/link";
import { Pagination, ProductGrid } from "@/components";
import { notFound, redirect } from "next/navigation";
import { Gender, Genders, Product } from "@/interfaces";
import { getPaginatedProductsWithImages } from "@/actions";

interface Props {
  params: Promise<{ id: Gender }>;
  searchParams: Promise<{ page?: string; take?: string }>;
}

const categoryCopy: Record<
  Gender,
  {
    title: string;
    eyebrow: string;
    description: string;
    mood: string;
    palette: string;
    nextHref: string;
    nextLabel: string;
  }
> = {
  men: {
    title: "Hombres",
    eyebrow: "Menswear Essentials",
    description:
      "Prendas versátiles, atemporales y fáciles de combinar para construir un estilo diario con personalidad y confianza.",
    mood: "Precisión urbana",
    palette: "Negro / Gris / Blanco",
    nextHref: "/category/women",
    nextLabel: "Mujeres",
  },
  women: {
    title: "Mujeres",
    eyebrow: "Womenswear Edit",
    description:
      "Siluetas cómodas y elegantes diseñadas para acompañarte en cada momento, combinando estilo, movimiento y comodidad.",
    mood: "Movimiento suave",
    palette: "Neutros / Azul / Grafito",
    nextHref: "/category/kid",
    nextLabel: "Niños",
  },

  kid: {
    title: "Niños",
    eyebrow: "Kids Selection",
    description:
      "Prendas resistentes, cómodas y llenas de energía para acompañar cada aventura, juego y descubrimiento.",
    mood: "Juego diario",
    palette: "Gráfico / Color / Básicos",
    nextHref: "/category/men",
    nextLabel: "Hombres",
  },

  unisex: {
    title: "Unisex",
    eyebrow: "Shared Wardrobe",
    description:
      "Básicos modernos y versátiles sin etiquetas, diseñados para adaptarse a diferentes estilos, personas y temporadas.",
    mood: "Calce libre",
    palette: "Negro / Blanco / Arena",
    nextHref: "/category/men",
    nextLabel: "Hombres",
  },
};

const productImageSrc = (product?: Product, index = 0) => {
  const url = product?.images[index]?.url || product?.images[0]?.url;

  if (!url) return "/imgs/placeholder.jpg";
  return url.startsWith("http") ? url : `/products/${url}`;
};

export const generateMetadata = async ({ params }: Props) => {
  const { id } = await params;
  const copy = categoryCopy[id];

  return {
    title: copy?.title || "Categoria",
    description: copy?.description || "Catalogo Teslo Shop",
  };
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { page, take } = await searchParams;

  if (!Genders.includes(id)) {
    notFound();
  }

  const numberPage = Number(page) || 1;
  const numberTake = Number(take) || 12;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: numberPage,
    take: numberTake,
    gender: id,
  });

  if (products.length === 0 && numberPage > 1) redirect(`/category/${id}`);

  const copy = categoryCopy[id];
  const heroProduct = products[0];
  const sideProduct = products[1] || products[0];
  const collectionTypes = Array.from(new Set(products.map((product) => product.type))).slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <section className="-mx-2 sm:-mx-10 grid min-h-[calc(100vh-72px)] border-y border-neutral-200 bg-[#f6f6f2] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="flex min-h-135 flex-col justify-between px-6 py-8 sm:px-12 lg:px-16">
          <div className="flex items-center justify-between border-b border-neutral-300 pb-4 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-600">
            <span>{copy.eyebrow}</span>
            <span>{products.length} piezas</span>
          </div>

          <div className="max-w-2xl py-14 lg:py-20">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-neutral-500">
              Categoria
            </p>
            <h1 className="text-6xl font-semibold leading-[0.9] text-neutral-950 sm:text-8xl">
              {copy.title}
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-neutral-600 sm:text-lg">
              {copy.description}
            </p>
          </div>

          <div className="grid gap-5 border-t border-neutral-300 pt-5 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">Mood</p>
              <p className="mt-2 text-sm font-semibold">{copy.mood}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">Paleta</p>
              <p className="mt-2 text-sm font-semibold">{copy.palette}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">Siguiente</p>
              <Link
                href={copy.nextHref}
                className="mt-2 inline-flex text-sm font-semibold underline-offset-4 hover:underline"
              >
                {copy.nextLabel}
              </Link>
            </div>
          </div>
        </div>

        
        <Link 
        href={heroProduct ? `/product/${heroProduct.slug}` : "#"} 
        className="grid cursor-pointer min-h-140 grid-cols-1 gap-px bg-neutral-200 md:grid-cols-2">
          <div className="relative min-h-105 overflow-hidden bg-neutral-100 md:min-h-full">
            <Image
              src={productImageSrc(heroProduct)}
              alt={heroProduct?.title || `Categoria ${copy.title}`}
              fill
              priority
              sizes="(min-width: 768px) 34vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/55 to-transparent p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                Producto clave
              </p>
              <h2 className="mt-2 text-2xl font-semibold">{heroProduct?.title || "Muy pronto"}</h2>
            </div>
          </div>

          <div className="relative hidden overflow-hidden bg-neutral-100 md:block">
            <Image
              src={productImageSrc(heroProduct, 1)}
              alt={heroProduct?.title || `Categoria ${copy.title}`}
              fill
              sizes="(min-width: 768px) 34vw, 100vw"
              className="object-cover"
            />
          </div>
        </Link>
        
      </section>

      {/* <section className="mx-auto grid max-w-7xl gap-4 py-8 sm:grid-cols-4 sm:py-12">
        {["shirts", "hoodies", "pants", "hats"].map((type) => (
          <div
            key={type}
            className="flex min-h-28 items-end justify-between border border-neutral-200 bg-neutral-50 p-5"
          >
            <span className="text-lg font-semibold capitalize">{type}</span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              {collectionTypes.includes(type as Product["type"]) ? "Disponible" : "Explorar"}
            </span>
          </div>
        ))}
      </section> */}

      <section id="catalogo" className="mx-auto max-w-7xl py-10 sm:py-14">
        <div className="mb-8 grid gap-6 border-b border-neutral-200 pb-6 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              {copy.title}
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">Catálogo</h2>
          </div>
          <p className="text-sm leading-6 text-neutral-600">
            Revisa las piezas disponibles, compara cortes y entra al detalle para elegir talla,
            stock y variantes.
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
            <p className="mt-2 text-neutral-600">
              Esta categoria todavia no tiene productos publicados.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex h-11 items-center justify-center bg-neutral-950 px-7 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[(--primary)]"
            >
              Volver al home
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
