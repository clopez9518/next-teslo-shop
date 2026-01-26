'use server';

import { prisma } from '@/app/lib/prisma';
import { Size } from '@/interfaces';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import cloudinary from '@/app/lib/cloudinary';

const productSchema = z.object({
    id: z.string().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string().min(3).max(500),
    price: z.coerce
        .number()
        .min(0)
        .transform((value) => Number(value.toFixed(2))),
    inStock: z.coerce
        .number()
        .min(0)
        .transform((value) => Number(value.toFixed(0))),
    tags: z.string(),
    gender: z.enum(['men', 'women', 'kid', 'unisex']),
    categoryId: z.string(),
    sizes: z.coerce.string().transform(val => val.split(',').map(size => size.trim())),
    images: z.any().optional(),
})

export const createUpdateProduct = async (formData: FormData) => {
    const data = Object.fromEntries(formData)
    const productParsed = productSchema.safeParse(data)

    if (!productParsed.success) {
        return {
            ok: false,
            error: productParsed.error
        }
    }

    const { id, images: imagesToUpload, ...product } = productParsed.data
    product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();

    console.log(imagesToUpload)

    try {
        const prismaTx = await prisma.$transaction(async (tx) => {

            const tags = product.tags.split(',').map(tag => tag.trim().toLowerCase())

            const productDb = await tx.product.upsert({
                where: {
                    slug: product.slug
                },
                update: {
                    ...product,
                    sizes: product.sizes.map(size => size as Size),
                    tags,
                    categoryId: product.categoryId
                },
                create: {
                    ...product,
                    id: undefined,
                    sizes: product.sizes.map(size => size as Size),
                    tags,
                    categoryId: product.categoryId
                }
            })

            return {
                ok: true,
                product: productDb
            }
        })

        //Todo: subir imágenes
        if (formData.getAll('images')) {
            const images = await uploadImages(formData.getAll('images') as File[])
            if (!images) throw new Error('Error al subir las imágenes')

            try {
                await prisma.productImage.createMany({
                    data: images.map(image => ({
                        productId: prismaTx.product.id,
                        url: image!
                    }))
                })

            } catch (error) {
                throw new Error('Error al subir las imágenes')
            }

        }

        revalidatePath(`/admin/product/${product.slug}`)
        revalidatePath(`/admin/products`)
        revalidatePath(`/products/${product.slug}`)

        return {
            ok: true,
            product: prismaTx.product
        }
    } catch (error) {
        return {
            ok: false,
            error: 'Error al crear/actualizar el producto'
        }
    }

}


const uploadImages = async (images: File[]) => {

    try {
        const uploadPromises = images.map(async (image) => {
            const buffer = await image.arrayBuffer();
            const base64 = Buffer.from(buffer).toString('base64')

            return cloudinary.uploader.upload(`data:image/png;base64,${base64}`, { folder: 'products' })
                .then((result) => result.secure_url)
                .catch((error) => {
                    console.log(error)
                    return null
                })
        })

        const urls = await Promise.all(uploadPromises)
        return urls;
    } catch (error) {
        console.log(error)
        return null
    }

}