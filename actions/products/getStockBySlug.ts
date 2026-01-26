'use server';

import { prisma } from "@/app/lib/prisma";

export const getStockBySlug = async (slug: string): Promise<number> => {
    try {
        const productStock = await prisma.product.findUnique({
            where: {
                slug,
            },
            select: {
                inStock: true,
            },
        });

        if (!productStock) return 0;

        return productStock.inStock;
    } catch (error) {
        return 0;
    }
}