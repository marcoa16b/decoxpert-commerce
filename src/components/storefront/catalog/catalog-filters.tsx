import {
  INSTALL_OPTIONS,
  catalogHref,
  filtersToRecord,
  type CatalogFilters,
} from "@/lib/catalog-params";
import type { Category } from "@payload-types";
import Link from "next/link";
import type { ReactNode } from "react";

function parentId(category: Category): number | null {
  const parent = category.parent;
  if (parent == null) return null;
  if (typeof parent === "object") return parent.id;
  return parent;
}

type FlatCategory = { category: Category; depth: number };

function flattenCategories(categories: Category[]): FlatCategory[] {
  const childrenOf = new Map<number | null, Category[]>();
  const ids = new Set(categories.map((category) => category.id));

  for (const category of categories) {
    const rawParent = parentId(category);
    const parent = rawParent != null && ids.has(rawParent) ? rawParent : null;
    const list = childrenOf.get(parent) ?? [];
    list.push(category);
    childrenOf.set(parent, list);
  }

  const flat: FlatCategory[] = [];
  const visited = new Set<number>();

  const walk = (parent: number | null, depth: number) => {
    for (const category of childrenOf.get(parent) ?? []) {
      if (visited.has(category.id)) continue;
      visited.add(category.id);
      flat.push({ category, depth });
      walk(category.id, depth + 1);
    }
  };

  walk(null, 0);
  return flat;
}

function FilterLink({
  href,
  active,
  indent = 0,
  children,
}: {
  href: string;
  active: boolean;
  indent?: number;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      style={indent ? { paddingLeft: `${indent * 0.75}rem` } : undefined}
      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-colors ${
        active
          ? "bg-red-600/10 font-semibold text-foreground"
          : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
          active ? "bg-red-500" : "bg-foreground/25"
        }`}
      />
      <span className="truncate">{children}</span>
    </Link>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-1.5">
      <h3 className="px-2 text-[11px] font-heading font-extrabold uppercase tracking-wider text-foreground/40">
        {title}
      </h3>
      <div className="flex flex-col gap-0.5">{children}</div>
    </section>
  );
}

export default function CatalogFilters({
  basePath,
  filters,
  categories,
  showCategoryFilter = true,
}: {
  basePath: string;
  filters: CatalogFilters;
  categories: Category[];
  showCategoryFilter?: boolean;
}) {
  const flat = showCategoryFilter ? flattenCategories(categories) : [];
  const record = filtersToRecord(filters);
  const hiddenEntries = Object.entries(record).filter(
    ([key]) => key !== "precioMin" && key !== "precioMax",
  );

  return (
    <div className="flex flex-col gap-6">
      {showCategoryFilter && flat.length > 0 ? (
        <FilterGroup title="Categorías">
          <FilterLink
            href={catalogHref(basePath, filters, { categoria: null })}
            active={!filters.categorySlug}
          >
            Todas
          </FilterLink>
          {flat.map(({ category, depth }) => (
            <FilterLink
              key={category.id}
              href={catalogHref(basePath, filters, {
                categoria: category.slug,
              })}
              active={filters.categorySlug === category.slug}
              indent={depth}
            >
              {category.name}
            </FilterLink>
          ))}
        </FilterGroup>
      ) : null}

      <FilterGroup title="Instalación">
        <FilterLink
          href={catalogHref(basePath, filters, { instalacion: null })}
          active={!filters.installation}
        >
          Todas
        </FilterLink>
        {INSTALL_OPTIONS.map((option) => (
          <FilterLink
            key={option.value}
            href={catalogHref(basePath, filters, {
              instalacion: option.value,
            })}
            active={filters.installation === option.value}
          >
            {option.label}
          </FilterLink>
        ))}
      </FilterGroup>

      <FilterGroup title="Disponibilidad">
        <FilterLink
          href={catalogHref(basePath, filters, {
            destacados: filters.featured ? null : true,
          })}
          active={filters.featured}
        >
          Solo destacados
        </FilterLink>
      </FilterGroup>

      <FilterGroup title="Precio (₡)">
        <form method="get" action={basePath} className="flex flex-col gap-2 px-2">
          {hiddenEntries.map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}
          <div className="flex items-center gap-2">
            <input
              name="precioMin"
              inputMode="numeric"
              defaultValue={filters.priceMin ?? ""}
              placeholder="Mín"
              className="w-full rounded-lg border border-foreground/15 bg-background px-2.5 py-1.5 text-xs outline-none focus:border-foreground/40"
            />
            <span className="text-foreground/30">-</span>
            <input
              name="precioMax"
              inputMode="numeric"
              defaultValue={filters.priceMax ?? ""}
              placeholder="Máx"
              className="w-full rounded-lg border border-foreground/15 bg-background px-2.5 py-1.5 text-xs outline-none focus:border-foreground/40"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="rounded-lg bg-red-600 px-3 py-1.5 text-[11px] font-heading font-extrabold uppercase tracking-wider text-white transition-colors hover:bg-red-500"
            >
              Aplicar precio
            </button>
            {filters.priceMin != null || filters.priceMax != null ? (
              <Link
                href={catalogHref(basePath, filters, {
                  precioMin: null,
                  precioMax: null,
                })}
                className="text-[11px] text-foreground/50 transition-colors hover:text-foreground"
              >
                Quitar
              </Link>
            ) : null}
          </div>
        </form>
      </FilterGroup>
    </div>
  );
}
