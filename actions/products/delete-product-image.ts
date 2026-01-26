'use server';

import cloudinary from "@/app/lib/cloudinary";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteProductImage = async (imageId: number) => {

    try {
        const image = await prisma.productImage.findUnique({
            where: {
                id: imageId
            }
        })

        if (!image) throw new Error('Imagen no encontrada')

        if (!image.url.startsWith('http')) {
            throw new Error('No se pueden eliminar imágenes locales')
        }

        const urlParts = image.url.split('/')
        const publicId = urlParts.slice(-2).join('/').split('.')[0]

        await cloudinary.uploader.destroy(publicId)

        const deletedImage = await prisma.productImage.delete({
            where: {
                id: imageId
            },
            include: {
                product: {
                    select: {
                        slug: true
                    }
                }
            }
        })

        //TODO: revalidar path
        revalidatePath(`/admin/product/${deletedImage.product.slug}`)
        revalidatePath(`/admin/products`)
        revalidatePath(`/products/${deletedImage.product.slug}`)

        return {
            ok: true,
            image: deletedImage
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            error: 'Error al eliminar la imagen'
        }
    }

}