export const revalidate = 604800; // 7 days

import { getProductBySlug } from "@/actions";
import { Slideshow, SlideShowSwiper, StockLabel } from "@/components";
import { montserratAlternates } from "@/config/fonts";
import { ResolvingMetadata, Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";
import { getProductImageUrl } from "@/adapters/adapters";


interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {

    const slug = (await params).slug
    const product = await getProductBySlug(slug);

    if (!product) return { title: "teslo | shop | product" };
    const image = getProductImageUrl(product)[0];

    const customSrc =
        image
            ? (image.startsWith('http')
                ? image
                : '/products/' + image)
            : '/imgs/placeholder.jpg';

    return {
        title: product.title,
        description: product.description,
        openGraph: {
            title: product.title,
            description: product.description,
            images: `${customSrc}`, // TODO: Obtener URL real desde el env
        }
    }
}


export default async function ProductPage({ params }: Props) {
    const { slug } = await params;

    const product = await getProductBySlug(slug);

    if (!product) return notFound();

    const images = getProductImageUrl(product);

    return (
        <div className="mt-5 mb-20 grid md:grid-cols-5 gap-3">

            {/* Slideshow */}
            <div className="col-span-1 md:col-span-3">
                {/* Mobile slideshow */}
                <div className="block md:hidden">
                    <Slideshow images={images} />
                </div>

                {/* Desktop slideshow */}
                <div className="hidden md:block">
                    <SlideShowSwiper
                        images={images}
                        title={product.title}
                    />
                </div>
            </div>

            {/* Detalles */}
            <div className="col-span-1 md:col-span-2 px-5">
                <h1 className={`text-xl font-bold antialiased ${montserratAlternates.className}`}>{product.title}</h1>
                <StockLabel slug={slug} />
                <p className="text-lg mb-3 font-semibold">${product.price}</p>

                <AddToCart product={product} />

                {/* Description */}
                <h3 className="text-sm font-bold mt-5">Description</h3>
                <p className="text-sm mt-2 font-light w-70 md:w-full">{product.description}</p>
            </div>

        </div>
    )
}
