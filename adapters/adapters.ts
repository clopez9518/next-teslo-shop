import { Product } from "@/interfaces";

export const getProductImageUrl = (product: Product): string[] => {

    const images = product.images.map(image => {
        return image.url;
    });

    return images;
}


export const getProductImageId = (product: Product): number[] => {

    const images = product.images.map(image => {
        return image.id;
    });

    return images;
}

export const getImageUrlAndId = (product: Product): { id: number; url: string }[] => {

    const images = product.images.map(image => {
        return { id: image.id, url: image.url };
    });

    return images;
}