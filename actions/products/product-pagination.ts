'use server';

import { prisma } from "@/app/lib/prisma";
import { Gender, Product, Type } from "@/interfaces";


interface PaginationOptions {
    page?: number;
    take?: number;
    gender?: Gender;
}

interface Response {
    currentPage: number;
    totalPages: number;
    products: Product[];
}

export const getPaginatedProductsWithImages = async ({ page = 1, take = 12, gender }: PaginationOptions): Promise<Response> => {

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(take) || take < 1) take = 12;

    try {
        const products = await prisma.product.findMany({
            skip: (page - 1) * take,
            take,
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
            where: {
                gender,
            },
        });

        // Obtener el total de paginas
        const totalProducts = await prisma.product.count({
            where: {
                gender,
            },
        });

        const productsWithImages = products.map(product => ({
            ...product,
            images: product.images.map(image => ({
                id: image.id,
                url: image.url,
            })),
            type: product.category.name as Type,
        }))

        return {
            currentPage: page,
            totalPages: Math.ceil(totalProducts / take),
            products: productsWithImages
        };

    } catch (error) {
        return {
            currentPage: page,
            totalPages: 0,
            products: []
        }
    }
}
