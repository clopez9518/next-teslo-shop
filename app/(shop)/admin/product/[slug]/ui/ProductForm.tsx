"use client";

import { createUpdateProduct, deleteProductImage } from "@/actions";
import { getImageUrlAndId } from "@/adapters/adapters";
import { ProductImage } from "@/components";
import { Category, Gender, Product, Size, Type } from "@/interfaces";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
    product: Partial<Product>;
    categories: Category[];
}

interface FormInputs {
    title: string;
    slug: string;
    description: string;
    price: number;
    inStock: number;
    tags: string;
    gender: Gender;
    categoryId: string;
    sizes: Size[];

    // TODO: images
    images?: FileList;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categories }: Props) => {

    const router = useRouter();

    const { register, handleSubmit, watch, formState: { errors, isValid }, getValues, setValue } = useForm<FormInputs>({
        defaultValues: {
            ...product,
            tags: product?.tags?.join(', '),
            gender: product.gender || undefined,
            categoryId: categories.find(category => category.name === product.type)?.id || '',
            sizes: product.sizes || [],
            images: undefined
        }
    });

    watch('sizes');

    const onSizeChanged = (size: Size) => {
        const sizes = new Set(getValues('sizes'));

        sizes.has(size) ? sizes.delete(size) : sizes.add(size);
        setValue('sizes', Array.from(sizes));
    }



    const onSubmit = async (data: FormInputs) => {

        const formData = new FormData();

        if (data.images) {
            for (let i = 0; i < data.images.length; i++) {
                formData.append('images', data.images[i]);
            }
        }

        formData.append('id', product.id || '');
        formData.append('title', data.title);
        formData.append('slug', data.slug);
        formData.append('description', data.description);
        formData.append('price', data.price.toString());
        formData.append('inStock', data.inStock.toString());
        formData.append('tags', data.tags);
        formData.append('gender', data.gender);
        formData.append('categoryId', data.categoryId);
        formData.append('sizes', data.sizes.toString());

        const { ok, error } = await createUpdateProduct(formData);

        if (!ok) {
            alert(error);
            return;
        }

        router.replace(`/admin/product/${data.slug}`);

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
            {/* Textos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Título</span>
                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-md bg-gray-200"
                        {...register('title', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Slug</span>
                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-md bg-gray-200"
                        {...register('slug', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Descripción</span>
                    <textarea
                        rows={5}
                        className="p-2 border border-gray-300 rounded-md bg-gray-200"
                        {...register('description', { required: true })}
                    ></textarea>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Price</span>
                    <input
                        type="number"
                        className="p-2 border border-gray-300 rounded-md bg-gray-200"
                        {...register('price', { required: true, min: 0 })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Tags</span>
                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-md bg-gray-200"
                        {...register('tags', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Gender</span>
                    <select
                        className="p-2 border border-gray-300 rounded-md bg-gray-200"
                        {...register('gender', { required: true })}>
                        <option value="">[Seleccione]</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kid">Kid</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Categoria</span>
                    <select
                        className="p-2 border border-gray-300 rounded-md bg-gray-200"
                        {...register('categoryId', { required: true })}>
                        <option value="">[Seleccione]</option>
                        {
                            categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit" className="btn-primary w-full">
                    Guardar
                </button>
            </div>

            {/* Selector de tallas y fotos */}
            <div className="w-full">


                <div className="flex flex-col mb-2">
                    <span>Stock</span>
                    <input
                        type="number"
                        className="p-2 border border-gray-300 rounded-md bg-gray-200"
                        {...register('inStock', { required: true, min: 0 })}
                    />
                </div>
                {/* As checkboxes */}
                <div className="flex flex-col">

                    <span>Tallas</span>
                    <div className="flex flex-wrap mb-2">

                        {
                            sizes.map(size => (
                                // bg-blue-500 text-white <--- si está seleccionado
                                <div
                                    onClick={() => onSizeChanged(size as Size)}
                                    key={size}
                                    className={
                                        clsx(
                                            'flex cursor-pointer items-center justify-center w-10 h-10 mr-2 border border-gray-300 rounded-md',
                                            {
                                                'bg-blue-500 text-white': getValues('sizes').includes(size as Size)
                                            }
                                        )
                                    }>
                                    <span>{size}</span>
                                </div>
                            ))
                        }

                    </div>


                    <div className="flex flex-col mb-2" style={
                        {
                            marginTop: 2
                        }
                    }>

                        <span>Fotos</span>
                        <input
                            type="file"
                            multiple
                            className="p-2 border border-gray-300 rounded-md bg-gray-200"
                            accept="image/png, image/jpeg, image/avif"
                            {...register('images')}
                        />

                    </div>

                    <div className="grid grid-cols-1  sm:grid-cols-3 gap-3">

                        {
                            product.id &&
                            getImageUrlAndId(product as Product).map(image => (
                                <div key={image.id} className="">
                                    <ProductImage
                                        url={image.url}
                                        width={300}
                                        height={300}
                                        alt={image.url}
                                        className="shadow-md rounded-t-md"
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-danger w-full rounded-b-lg"
                                        onClick={() => deleteProductImage(image.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))
                        }

                    </div>

                </div>
            </div>
        </form>
    );
};