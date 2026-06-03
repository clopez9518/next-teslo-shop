"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { generatePagesArray } from "./utils";

interface Props {
  totalPages: number;
  fragment?: string;
}

export const Pagination = ({ totalPages, fragment }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const pagesArray = generatePagesArray(currentPage, totalPages);
  const hash = fragment ? `#${fragment}` : "";

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    const targetPage = Math.min(Math.max(page, 1), totalPages);

    if (targetPage === 1) {
      params.delete("page");
    } else {
      params.set("page", targetPage.toString());
    }

    const query = params.toString();

    return `${pathname}${query ? `?${query}` : ""}${hash}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 mb-20 flex justify-center">
      <nav
        aria-label="Paginacion"
        className="inline-flex items-center gap-2 border-y border-neutral-200 py-3"
      >
        {currentPage === 1 ? (
          <span
            aria-disabled="true"
            className="grid h-10 w-10 place-items-center text-neutral-300"
          >
            <IoChevronBackOutline className="h-5 w-5" />
          </span>
        ) : (
          <Link
            aria-label="Pagina anterior"
            className="grid h-10 w-10 place-items-center text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
            href={createPageUrl(currentPage - 1)}
          >
            <IoChevronBackOutline className="h-5 w-5" />
          </Link>
        )}

        <ol className="flex items-center gap-1">
          {pagesArray.map((page, index) => {
            if (typeof page !== "number") {
              return (
                <li key={`${page}-${index}`}>
                  <span className="grid h-10 min-w-10 place-items-center px-2 text-sm text-neutral-400">
                    ...
                  </span>
                </li>
              );
            }

            const isActive = currentPage === page;

            return (
              <li key={page}>
                <Link
                  aria-current={isActive ? "page" : undefined}
                  aria-label={`Pagina ${page}`}
                  className={
                    isActive
                      ? "grid h-10 min-w-10 place-items-center bg-neutral-950 px-3 text-sm font-semibold text-white"
                      : "grid h-10 min-w-10 place-items-center px-3 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950"
                  }
                  href={createPageUrl(page)}
                >
                  {page}
                </Link>
              </li>
            );
          })}
        </ol>

        {currentPage === totalPages ? (
          <span
            aria-disabled="true"
            className="grid h-10 w-10 place-items-center text-neutral-300"
          >
            <IoChevronForwardOutline className="h-5 w-5" />
          </span>
        ) : (
          <Link
            aria-label="Pagina siguiente"
            className="grid h-10 w-10 place-items-center text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
            href={createPageUrl(currentPage + 1)}
          >
            <IoChevronForwardOutline className="h-5 w-5" />
          </Link>
        )}
      </nav>
    </div>
  );
};
