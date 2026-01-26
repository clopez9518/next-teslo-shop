import { getProductBySlug, getProductsTypes } from "@/actions";
import { Title } from "@/components";
import { notFound } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
    params: Promise<{ slug: string }>;
}


export default async function AdminProductPage({ params }: Props) {

    const { slug } = await params;


    const [product, types] = await Promise.all([
        getProductBySlug(slug),
        getProductsTypes()
    ]);

    if (!product && slug !== 'new') {
        return notFound();
    }

    const title = (slug === 'new') ? 'Nuevo producto' : 'Editar producto';

    return (
        <div>
            <Title title={title} />
            <ProductForm product={product || {}} categories={types} />
        </div>
    )
}
