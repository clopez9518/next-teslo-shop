export const revalidate = 120; // 2 minutos

import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ page?: string; take?: string }>;
}

export default async function Home({ searchParams }: Props) {

  const params = await searchParams;

  const page = Number(params?.page) || 1;
  const take = Number(params?.take) || 12;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page, take });
  if (products.length === 0) redirect('/');

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <div className="flex flex-col items-center justify-center h-full">
        <Title title="Home" subtitle="Bienvenidos a Teslo Shop" />
      </div>
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
