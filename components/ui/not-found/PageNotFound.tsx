import Image from "next/image"
import Link from "next/link"

export const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh)]">
            <h1 className="text-2xl font-bold">404 | Not Found</h1>
            <Link href="/" className="text-blue-500">
                Regresar a la página de inicio
            </Link>

            <div className="px-5 mx-5">
                <Image
                    src="/imgs/starman_750x750.png"
                    alt="Starman"
                    width={450}
                    height={450}
                    className="p-5 sm:p-0"
                />
            </div>
        </div>


    )
}
