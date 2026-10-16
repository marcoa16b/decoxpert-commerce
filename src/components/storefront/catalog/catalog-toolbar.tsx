import {
  CATALOG_SORT_OPTIONS,
  catalogHref,
  type CatalogFilters,
} from "@/lib/catalog-params";
import Link from "next/link";

export default function CatalogToolbar({
  basePath,
  filters,
  totalDocs,
}: {
  basePath: string;
  filters: CatalogFilters;
  totalDocs: number;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <span className="text-xs text-foreground/60">
        {totalDocs} {totalDocs === 1 ? "producto" : "productos"}
      </span>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-heading font-extrabold uppercase tracking-wider text-foreground/40">
          Ordenar
        </span>
        {CATALOG_SORT_OPTIONS.map((option) => {
          const active = filters.sort === option.value;
          return (
            <Link
              key={option.value}
              href={catalogHref(basePath, filters, {
                orden: option.value === "relevancia" ? null : option.value,
              })}
              aria-current={active ? "true" : undefined}
              className={`rounded-full border px-3 py-1 text-[11px] font-heading font-bold uppercase tracking-wide transition-colors ${
                active
                  ? "border-red-500 bg-red-600/10 text-foreground"
                  : "border-foreground/15 text-foreground/60 hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {option.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
