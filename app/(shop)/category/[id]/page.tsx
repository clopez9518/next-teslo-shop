export const revalidate = 120; // 2 minutos

import { Pagination, ProductGrid, Title } from "@/components";
import { notFound, redirect } from "next/navigation";
import { Gender, Genders } from "@/interfaces";
import { getPaginatedProductsWithImages } from "@/actions";
import { subtitleLabel, titleLabel } from "@/interfaces/labels";


interface Props {
    params: Promise<{ id: Gender }>;
    searchParams: Promise<{ page?: string; take?: string }>;
}

export const generateMetadata = async ({ params }: Props) => {
    const { id } = await params;
    return {
        title: titleLabel[id],
        description: subtitleLabel[id],
    }
}


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

    if (products.length === 0) redirect(`/category/${id}`);

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <div className="flex flex-col items-center justify-center h-full">
                <Title title={titleLabel[id]} subtitle={subtitleLabel[id]} />
            </div>
            <ProductGrid products={products} />
            <Pagination totalPages={totalPages} />
        </div>
    )
}
