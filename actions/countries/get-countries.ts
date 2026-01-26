'use server';

import { prisma } from "@/app/lib/prisma";
import { Country } from "@/interfaces";

export const getCountries = async (): Promise<Country[]> => {

    try {
        const countries = await prisma.country.findMany({
            orderBy: {
                name: 'asc'
            }
        });
        return countries;
    } catch (error) {
        return [];
    }
}