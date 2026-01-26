'use server';

import { prisma } from "@/app/lib/prisma";
import { Category, Type } from "@/interfaces";

export const getProductsTypes = async (): Promise<Category[]> => {

    try {
        const types = await prisma.category.findMany();
        return types as Category[];
    } catch (error) {
        return [];
    }
}