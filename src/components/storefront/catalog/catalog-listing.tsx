import { getCatalogProducts, getCategoryBySlug } from "@/lib/catalog";
import { countActiveFilters, type CatalogFilters } from "@/lib/catalog-params";
import type { Category } from "@payload-types";
import type { ReactNode } from "react";
import ProductCard from "../product-card";
import CatalogActiveFilters from "./catalog-active-filters";
import CatalogFiltersPanel from "./catalog-filters";
import CatalogFiltersSheet from "./catalog-filters-sheet";
import CatalogPagination from "./catalog-pagination";
import CatalogToolbar from "./catalog-toolbar";

export default async function CatalogListing({
  basePath,
  filters,
  categories,
  lockedCategorySlug = null,
  showCategoryFilter = true,
  heading,
  pageSize = 12,
}: {
  basePath: string;
  filters: CatalogFilters;
  categories: Category[];
  lockedCategorySlug?: string | null;
  showCategoryFilter?: boolean;
  heading?: ReactNode;
  pageSize?: number;
}) {
  const categorySlug = lockedCategorySlug ?? filters.categorySlug;
  const result = await getCatalogProducts({ ...filters, categorySlug }, pageSize);

  const categoryName = filters.categorySlug
    ? ((await getCategoryBySlug(filters.categorySlug))?.name ?? null)
    : null;

  const activeCount = countActiveFilters(filters);

  const filtersPanel = (
    <CatalogFiltersPanel
      basePath={basePath}
      filters={filters}
      categories={categories}
      showCategoryFilter={showCategoryFilter}
    />
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {heading}

      <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_1fr]">
        <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
          {filtersPanel}
        </aside>

        <div className="flex flex-col gap-5">
          <div className="lg:hidden">
            <CatalogFiltersSheet count={activeCount}>
              {filtersPanel}
            </CatalogFiltersSheet>
          </div>

          <CatalogToolbar
            basePath={basePath}
            filters={filters}
            totalDocs={result.totalDocs}
          />

          <CatalogActiveFilters
            basePath={basePath}
            filters={filters}
            categoryName={categoryName}
          />

          {result.products.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-foreground/15 bg-card/60 px-6 py-16 text-center">
              <p className="text-sm font-heading font-extrabold uppercase">
                No encontramos productos
              </p>
              <p className="max-w-sm text-xs text-foreground/60">
                Probá ajustar los filtros o la búsqueda para ver más resultados.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {result.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <CatalogPagination
            basePath={basePath}
            filters={filters}
            page={result.page}
            totalPages={result.totalPages}
          />
        </div>
      </div>
    </div>
  );
}
