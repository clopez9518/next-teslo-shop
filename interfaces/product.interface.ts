export interface Product {
    id: string;
    description: string;
    images: {
        id: number;
        url: string;
    }[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    type: Type;
    gender: Gender;
}

export interface CartProduct {
    id: string;
    slug: string;
    title: string;
    price: number;
    quantity: number;
    size: Size;
    image: string;
    stock: number;
}


export type Gender = 'men' | 'women' | 'kid' | 'unisex';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type Type = 'shirts' | 'pants' | 'hoodies' | 'hats';

export const Genders: Gender[] = ['men', 'women', 'kid', 'unisex'];

export interface Category {
    id: string;
    name: Type;
}