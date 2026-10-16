export type RawSearchParams = Record<string, string | string[] | undefined>;

export type CatalogSort =
  | "relevancia"
  | "precio-asc"
  | "precio-desc"
  | "nuevos"
  | "nombre";

export type InstallFilter = "required" | "optional" | "none";

export type CatalogFilters = {
  categorySlug: string | null;
  q: string | null;
  installation: InstallFilter | null;
  priceMin: number | null;
  priceMax: number | null;
  featured: boolean;
  sort: CatalogSort;
  page: number;
};

export const CATALOG_SORT_OPTIONS: { value: CatalogSort; label: string }[] = [
  { value: "relevancia", label: "Relevancia" },
  { value: "precio-asc", label: "Menor precio" },
  { value: "precio-desc", label: "Mayor precio" },
  { value: "nuevos", label: "Novedades" },
  { value: "nombre", label: "A - Z" },
];

export const INSTALL_OPTIONS: { value: InstallFilter; label: string }[] = [
  { value: "required", label: "Instalación obligatoria" },
  { value: "optional", label: "Instalación opcional" },
  { value: "none", label: "No requiere instalación" },
];

const SORT_VALUES = CATALOG_SORT_OPTIONS.map((option) => option.value);
const INSTALL_VALUES = INSTALL_OPTIONS.map((option) => option.value);

export const DEFAULT_FILTERS: CatalogFilters = {
  categorySlug: null,
  q: null,
  installation: null,
  priceMin: null,
  priceMax: null,
  featured: false,
  sort: "relevancia",
  page: 1,
};

function first(value: string | string[] | undefined): string | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

function toNumber(value: string | null): number | null {
  if (value == null) return null;
  const trimmed = value.trim();
  if (trimmed === "") return null;
  const parsed = Number(trimmed.replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

export function parseCatalogFilters(
  searchParams: RawSearchParams,
): CatalogFilters {
  const sort = first(searchParams.orden);
  const installation = first(searchParams.instalacion);
  const page = toNumber(first(searchParams.page));
  const q = (first(searchParams.q) ?? "").trim();

  return {
    categorySlug: first(searchParams.categoria)?.trim() || null,
    q: q || null,
    installation:
      installation && INSTALL_VALUES.includes(installation as InstallFilter)
        ? (installation as InstallFilter)
        : null,
    priceMin: toNumber(first(searchParams.precioMin)),
    priceMax: toNumber(first(searchParams.precioMax)),
    featured: first(searchParams.destacados) === "1",
    sort:
      sort && SORT_VALUES.includes(sort as CatalogSort)
        ? (sort as CatalogSort)
        : "relevancia",
    page: page && page > 0 ? Math.floor(page) : 1,
  };
}

export function filtersToRecord(filters: CatalogFilters): Record<string, string> {
  const record: Record<string, string> = {};
  if (filters.categorySlug) record.categoria = filters.categorySlug;
  if (filters.q) record.q = filters.q;
  if (filters.installation) record.instalacion = filters.installation;
  if (filters.priceMin != null) record.precioMin = String(filters.priceMin);
  if (filters.priceMax != null) record.precioMax = String(filters.priceMax);
  if (filters.featured) record.destacados = "1";
  if (filters.sort !== "relevancia") record.orden = filters.sort;
  if (filters.page > 1) record.page = String(filters.page);
  return record;
}

export function countActiveFilters(filters: CatalogFilters): number {
  return [
    filters.categorySlug,
    filters.q,
    filters.installation,
    filters.priceMin,
    filters.priceMax,
    filters.featured ? "1" : null,
  ].filter((value) => value != null).length;
}

export type CatalogOverrides = Record<
  string,
  string | number | boolean | null | undefined
>;

/**
 * Construye una URL hacia el listado aplicando overrides sobre los filtros
 * actuales. Cualquier cambio que no sea de página reinicia la paginación.
 */
export function catalogHref(
  basePath: string,
  filters: CatalogFilters,
  overrides: CatalogOverrides = {},
): string {
  const record = filtersToRecord(filters);

  for (const [key, raw] of Object.entries(overrides)) {
    if (raw === null || raw === undefined || raw === false || raw === "") {
      delete record[key];
      continue;
    }
    record[key] = raw === true ? "1" : String(raw);
  }

  if (!("page" in overrides)) delete record.page;

  const query = new URLSearchParams(record).toString();
  return query ? `${basePath}?${query}` : basePath;
}
