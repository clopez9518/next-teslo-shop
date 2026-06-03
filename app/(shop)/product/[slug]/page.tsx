export const revalidate = 604800; // 7 days

import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/actions";
import { getProductImageUrl } from "@/adapters/adapters";
import { Product } from "@/interfaces";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: Promise<{ slug: string }>;
}

const productImageSrc = (product: Product, index = 0) => {
  const url = product.images[index]?.url || product.images[0]?.url;

  if (!url) return "/imgs/placeholder.jpg";
  return url.startsWith("http") ? url : `/products/${url}`;
};

const genderLabel: Record<Product["gender"], string> = {
  men: "Hombres",
  women: "Mujeres",
  kid: "Niños",
  unisex: "Unisex",
};

const typeLabel: Record<Product["type"], string> = {
  shirts: "Poleras",
  pants: "Pantalones",
  hoodies: "Hoodies",
  hats: "Gorras",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const product = await getProductBySlug(slug);

  if (!product) return { title: "teslo | shop | product" };

  const image = getProductImageUrl(product)[0];
  const customSrc = image
    ? image.startsWith("http")
      ? image
      : `/products/${image}`
    : "/imgs/placeholder.jpg";

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: `${customSrc}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  const secondaryImage = productImageSrc(product, 1);

  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <section className="-mx-2 sm:-mx-10 border-y border-neutral-200 bg-[#f6f6f2]">
        <div className="mx-auto grid max-w-400 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="grid gap-px bg-neutral-200 md:grid-cols-[1fr_0.58fr]">
            <div className="relative min-h-140 bg-neutral-100 lg:min-h-[calc(100vh-72px)]">
              <Image
                src={productImageSrc(product)}
                alt={product.title}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="hidden gap-px bg-neutral-200 md:grid md:grid-rows-2">
              <div className="relative min-h-70 bg-neutral-100">
                <Image
                  src={secondaryImage}
                  alt={`${product.title} detalle`}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex min-h-70 flex-col justify-between bg-neutral-950 p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
                  Teslo detail
                </p>
                <div>
                  <p className="text-4xl font-semibold leading-none">{product.inStock}</p>
                  <p className="mt-2 text-sm text-white/65">Unidades disponibles</p>
                </div>
                <Link
                  href={`/category/${product.gender}`}
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
                >
                  Ver {genderLabel[product.gender]}
                </Link>
              </div>
            </div>
          </div>

          <aside className="flex min-h-155 flex-col justify-between px-6 py-8 sm:px-12 lg:sticky lg:top-0 lg:min-h-[calc(100vh-72px)] lg:px-16">
            <div>
              <div className="mb-10 flex items-center justify-between border-b border-neutral-300 pb-4 text-xs font-semibold uppercase tracking-[0.26em] text-neutral-500">
                <Link href={`/category/${product.gender}`} className="transition-colors hover:text-neutral-950">
                  {genderLabel[product.gender]}
                </Link>
                <span>{typeLabel[product.type]}</span>
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-neutral-500">
                Producto
              </p>
              <h1 className="mt-5 text-4xl font-semibold leading-[0.98] text-neutral-950 sm:text-6xl">
                {product.title}
              </h1>
              <p className="mt-6 text-2xl font-semibold text-neutral-900">
                {currencyFormatter(product.price)}
              </p>

              <div className="mt-8 grid grid-cols-3 gap-px bg-neutral-200 text-sm">
                <div className="bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Stock</p>
                  <p className="mt-2 font-semibold">
                    {product.inStock > 0 ? `${product.inStock} disp.` : "Agotado"}
                  </p>
                </div>
                <div className="bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Tallas</p>
                  <p className="mt-2 font-semibold">{product.sizes.length}</p>
                </div>
                <div className="bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Tipo</p>
                  <p className="mt-2 font-semibold">{typeLabel[product.type]}</p>
                </div>
              </div>

              <div className="mt-8">
                <AddToCart product={product} />
              </div>
            </div>

            <div className="mt-12 border-t border-neutral-200 pt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                Descripción
              </p>
              <p className="mt-4 text-sm leading-7 text-neutral-600">{product.description}</p>
              <div className="mt-8 grid gap-4 text-sm text-neutral-700 sm:grid-cols-3">
                <span>Diseño atemporal</span>
                <span>Comodidad diaria</span>
                <span>Calidad duradera</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
