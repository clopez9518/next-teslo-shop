'use server'

import { prisma } from "@/app/lib/prisma";
import { Product, Type } from "@/interfaces";

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
    try {

        const product = await prisma.product.findUnique({
            where: {
                slug,
            },
            include: {
                images: {
                    take: 2,
                    select: {
                        url: true,
                        id: true,
                    },
                },
                category: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        if (!product) return null;

        const productMapped = {
            ...product,
            images: product?.images.map(image => {
                return {
                    id: image.id,
                    url: image.url,
                }
            }),
            type: product?.category.name as Type,
        }

        return productMapped;

    } catch (error) {
        return null;
    }

}