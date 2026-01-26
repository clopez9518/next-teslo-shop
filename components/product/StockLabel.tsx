'use client'

import { useEffect, useRef, useState } from "react";
import { getStockBySlug } from "@/actions/products/getStockBySlug";

interface Props {
    slug: string;
}

export const StockLabel = ({ slug }: Props) => {

    const [stock, setStock] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getStock();
    }, []);


    const getStock = async () => {
        const stock = await getStockBySlug(slug);
        setStock(stock);
        setLoading(false);
    }

    return (
        <>
            {
                loading
                    ? <p className="text-lg mb-5 font-semibold bg-gray-200 animate-pulse w-24">&nbsp;</p>
                    : <p className="text-lg mb-5 font-semibold">{stock ? `In Stock: ${stock}` : "Out of Stock"}</p>
            }
        </>
    )
}
