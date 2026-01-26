'use client'

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { generatePagesArray } from "./utils";

interface Props {
    // currentPage: number;
    totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageUrl = (page: number | string) => {

        const params = new URLSearchParams(searchParams);

        if (page === '...') return `${pathname}?${params.toString()}`;
        if (isNaN(Number(page))) return `${pathname}?page=1`;
        if (+page <= 0) return `${pathname}`
        if (+page > totalPages) return `${pathname}?page=${totalPages}`

        params.set('page', page.toString());
        return `${pathname}?${params.toString()}`;
    }

    // Paginas que se van a mostrar
    const pagesArray = generatePagesArray(currentPage, totalPages);

    return (
        <div className="flex text-center justify-center mt-10 mb-20">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                    <li className="page-item">
                        {currentPage === 1 ? (
                            <span className="page-link relative block py-1.5 px-3 border-0 bg-transparent rounded text-gray-500 cursor-not-allowed">
                                <IoChevronBackOutline size={25} />
                            </span>
                        ) : (
                            <Link
                                className="page-link relative block py-1.5 px-3 border-0 bg-transparent rounded text-gray-800 transition-all duration-300"
                                href={createPageUrl(currentPage - 1)}
                            >
                                <IoChevronBackOutline size={25} />
                            </Link>
                        )}
                    </li>

                    {
                        pagesArray.map((page, index) => (
                            <li className="page-item" key={index}>
                                <Link
                                    className={
                                        currentPage === page
                                            ? "page-link relative block py-1.5 px-3 border-0 bg-blue-500 outline-none transition-all duration-300 rounded text-white hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                            : "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"}
                                    href={createPageUrl(page)}>
                                    {page}
                                </Link>
                            </li>
                        ))
                    }

                    <li className="page-item">
                        {currentPage === totalPages ? (
                            <span className="page-link relative block py-1.5 px-3 border-0 bg-transparent rounded text-gray-500 cursor-not-allowed">
                                <IoChevronForwardOutline size={25} />
                            </span>
                        ) : (
                            <Link
                                className="page-link relative block py-1.5 px-3 border-0 bg-transparent rounded text-gray-800 transition-all duration-300"
                                href={createPageUrl(currentPage + 1)}
                            >
                                <IoChevronForwardOutline size={25} />
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    )
}
