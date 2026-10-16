import type { Category, Product, Setting } from "@payload-types";
import type { Where } from "payload";
import type { CatalogFilters, CatalogSort } from "./catalog-params";
import { getPayloadClient } from "./payload";

export async function getSettings(): Promise<Setting> {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "settings" });
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const payload = await getPayloadClient();

  const published = { published: { equals: true } } as const;

  const featured = await payload.find({
    collection: "products",
    where: { ...published, featured: { equals: true } },
    sort: "order",
    limit,
    depth: 2,
  });

  if (featured.docs.length > 0) return featured.docs;

  const { docs } = await payload.find({
    collection: "products",
    where: published,
    sort: "order",
    limit,
    depth: 2,
  });
  return docs;
}

export async function getFeaturedCategories(): Promise<Category[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "categories",
    where: { featured: { equals: true } },
    sort: "order",
    limit: 12,
    depth: 1,
  });

  if (docs.length > 0) return docs;

  const all = await payload.find({
    collection: "categories",
    where: { parent: { exists: false } },
    sort: "order",
    limit: 12,
    depth: 1,
  });
  return all.docs;
}

export async function getCategories(): Promise<Category[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "categories",
    sort: "order",
    limit: 100,
    depth: 1,
  });
  return docs;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "products",
    where: { slug: { equals: slug }, published: { equals: true } },
    limit: 1,
    depth: 2,
  });
  return docs[0] ?? null;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "categories",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  return docs[0] ?? null;
}

export async function getProductsByCategory(
  categoryId: number,
  limit = 60,
): Promise<Product[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "products",
    where: { published: { equals: true }, category: { equals: categoryId } },
    sort: "order",
    limit,
    depth: 2,
  });
  return docs;
}

export function getProductImage(product: Product) {
  const image = product.gallery?.[0]?.image;
  if (image && typeof image === "object") return image;
  return null;
}

export function getCategoryName(product: Product): string | null {
  if (product.category && typeof product.category === "object") {
    return product.category.name;
  }
  return null;
}

export function categoryParentId(category: Category): number | null {
  const parent = category.parent;
  if (parent == null) return null;
  if (typeof parent === "object") return parent.id;
  return parent;
}

const CATALOG_SORT_MAP: Record<CatalogSort, string> = {
  relevancia: "order",
  "precio-asc": "basePrice",
  "precio-desc": "-basePrice",
  nuevos: "-createdAt",
  nombre: "title",
};

/**
 * Devuelve el id de la categoría con ese slug más los ids de todas sus
 * subcategorías (recursivo), para que el listado incluya la jerarquía completa.
 */
export async function getCategoryAndDescendantIds(
  slug: string,
): Promise<number[]> {
  const payload = await getPayloadClient();
  const root = await payload.find({
    collection: "categories",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  });

  const rootId = root.docs[0]?.id;
  if (rootId == null) return [];

  const ids: number[] = [rootId];
  let frontier: number[] = [rootId];

  for (let level = 0; level < 6 && frontier.length > 0; level += 1) {
    const children = await payload.find({
      collection: "categories",
      where: { parent: { in: frontier } },
      limit: 500,
      depth: 0,
    });
    const childIds = children.docs.map((doc) => doc.id);
    if (childIds.length === 0) break;
    ids.push(...childIds);
    frontier = childIds;
  }

  return ids;
}

export type CatalogResult = {
  products: Product[];
  totalDocs: number;
  totalPages: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export async function getCatalogProducts(
  filters: CatalogFilters,
  limit = 12,
): Promise<CatalogResult> {
  const payload = await getPayloadClient();
  const conditions: Where[] = [{ published: { equals: true } }];

  if (filters.categorySlug) {
    const ids = await getCategoryAndDescendantIds(filters.categorySlug);
    conditions.push({ category: { in: ids.length > 0 ? ids : [-1] } });
  }

  if (filters.installation) {
    conditions.push({ requiresInstallation: { equals: filters.installation } });
  }

  if (filters.featured) {
    conditions.push({ featured: { equals: true } });
  }

  if (filters.priceMin != null) {
    conditions.push({ basePrice: { greater_than_equal: filters.priceMin } });
  }

  if (filters.priceMax != null) {
    conditions.push({ basePrice: { less_than_equal: filters.priceMax } });
  }

  if (filters.q) {
    conditions.push({
      or: [
        { title: { contains: filters.q } },
        { sku: { contains: filters.q } },
        { shortDescription: { contains: filters.q } },
      ],
    });
  }

  const result = await payload.find({
    collection: "products",
    where: { and: conditions },
    sort: CATALOG_SORT_MAP[filters.sort],
    page: filters.page,
    limit,
    depth: 2,
  });

  return {
    products: result.docs,
    totalDocs: result.totalDocs,
    totalPages: result.totalPages,
    page: result.page ?? filters.page,
    hasNextPage: result.hasNextPage,
    hasPrevPage: result.hasPrevPage,
  };
}
