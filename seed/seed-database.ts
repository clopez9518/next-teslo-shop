import { prisma } from "@/app/lib/prisma";
import { initialData } from "./seed";
import { countries } from "./seed-countries.js";

async function main() {
    console.log("Seed Executed");


    // 1.Borrar datos
    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.country.deleteMany();

    const { categories, products, users } = initialData;

    // 2. Insertar usuarios
    await prisma.user.createMany({
        data: users,
    });

    // 3. Insertar categorias
    await prisma.category.createMany({
        data: categories.map((category) => ({ name: category })),
    });

    const categoriesDB = await prisma.category.findMany();

    const categoriesMap = categoriesDB.reduce((acc, category) => {
        acc[category.name] = category.id;
        return acc;
    }, {} as Record<string, string>);

    // 4. Insertar productos
    await prisma.$transaction(
        products.map(({ images, type, ...product }) =>
            prisma.product.create({
                data: {
                    ...product,
                    categoryId: categoriesMap[type],
                    images: {
                        create: images.map((url) => ({ url })),
                    },
                },
            })
        )
    );


    // 5. Insertar paises
    await prisma.country.createMany({
        data: countries,
    });


    // Otra forma de insertar productos
    // products.forEach(async (product) => {
    //     const { images, type, ...rest } = product;
    //     const productDB = await prisma.product.create({
    //         data: {
    //             ...rest,
    //             categoryId: categoriesMap[type],
    //         },
    //     });

    //     await prisma.productImage.createMany({
    //         data: images.map((image) => ({
    //             productId: productDB.id,
    //             url: image,
    //         })),
    //     });
    // });
}

(async () => {

    if (process.env.NODE_ENV === "production") return;
    main();
})();