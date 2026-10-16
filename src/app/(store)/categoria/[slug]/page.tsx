import CatalogListing from "@/components/storefront/catalog/catalog-listing";
import { getCategoryBySlug } from "@/lib/catalog";
import {
  parseCatalogFilters,
  type RawSearchParams,
} from "@/lib/catalog-params";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<RawSearchParams>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Categoría no encontrada" };
  return {
    title: category.meta?.title || category.name,
    description: category.meta?.description || category.description || undefined,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) notFound();

  const filters = parseCatalogFilters(await searchParams);

  return (
    <CatalogListing
      basePath={`/categoria/${slug}`}
      filters={{ ...filters, categorySlug: null }}
      categories={[]}
      lockedCategorySlug={slug}
      showCategoryFilter={false}
      heading={
        <header className="flex flex-col gap-2">
          <nav className="mb-2 flex items-center gap-2 text-xs text-foreground/50">
            <Link href="/" className="hover:text-foreground">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/catalogo" className="hover:text-foreground">
              Catálogo
            </Link>
            <span>/</span>
            <span className="text-foreground/70">{category.name}</span>
          </nav>
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-red-500">
            Categoría
          </span>
          <h1 className="text-2xl font-heading font-extrabold uppercase leading-tight sm:text-3xl">
            {category.name}
          </h1>
          {category.description ? (
            <p className="max-w-2xl text-sm text-foreground/70">
              {category.description}
            </p>
          ) : null}
        </header>
      }
    />
  );
}
