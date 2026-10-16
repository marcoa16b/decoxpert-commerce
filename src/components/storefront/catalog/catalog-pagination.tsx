import { catalogHref, type CatalogFilters } from "@/lib/catalog-params";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

function pageItems(page: number, totalPages: number): (number | "gap")[] {
  const pages = new Set<number>([1, totalPages]);
  for (let candidate = page - 1; candidate <= page + 1; candidate += 1) {
    if (candidate >= 1 && candidate <= totalPages) pages.add(candidate);
  }

  const items: (number | "gap")[] = [];
  let previous = 0;
  for (const current of [...pages].sort((a, b) => a - b)) {
    if (previous && current - previous > 1) items.push("gap");
    items.push(current);
    previous = current;
  }
  return items;
}

function pageHref(
  basePath: string,
  filters: CatalogFilters,
  target: number,
): string {
  return catalogHref(basePath, filters, { page: target > 1 ? target : null });
}

const navButton =
  "inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-foreground/15 px-3 text-[11px] font-heading font-bold uppercase tracking-wide text-foreground/70 transition-colors hover:border-foreground/40 hover:text-foreground";

export default function CatalogPagination({
  basePath,
  filters,
  page,
  totalPages,
}: {
  basePath: string;
  filters: CatalogFilters;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Paginación"
      className="flex flex-wrap items-center justify-center gap-1.5 pt-6"
    >
      {page > 1 ? (
        <Link href={pageHref(basePath, filters, page - 1)} className={navButton}>
          <IconChevronLeft size={14} /> Anterior
        </Link>
      ) : (
        <span className={`${navButton} cursor-not-allowed opacity-40`}>
          <IconChevronLeft size={14} /> Anterior
        </span>
      )}

      {pageItems(page, totalPages).map((item, index) =>
        item === "gap" ? (
          <span
            key={`gap-${index}`}
            className="px-1 text-xs text-foreground/40"
          >
            …
          </span>
        ) : item === page ? (
          <span
            key={item}
            aria-current="page"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-xs font-heading font-extrabold text-white"
          >
            {item}
          </span>
        ) : (
          <Link
            key={item}
            href={pageHref(basePath, filters, item)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-foreground/15 text-xs font-heading font-bold text-foreground/70 transition-colors hover:border-foreground/40 hover:text-foreground"
          >
            {item}
          </Link>
        ),
      )}

      {page < totalPages ? (
        <Link href={pageHref(basePath, filters, page + 1)} className={navButton}>
          Siguiente <IconChevronRight size={14} />
        </Link>
      ) : (
        <span className={`${navButton} cursor-not-allowed opacity-40`}>
          Siguiente <IconChevronRight size={14} />
        </span>
      )}
    </nav>
  );
}
