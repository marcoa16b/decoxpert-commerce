import CatalogListing from "@/components/storefront/catalog/catalog-listing";
import { getCategories } from "@/lib/catalog";
import {
  parseCatalogFilters,
  type RawSearchParams,
} from "@/lib/catalog-params";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Catálogo | DecoXpert",
  description:
    "Explorá alarmas, GPS, pantallas Android, car audio e iluminación para tu vehículo con instalación a domicilio en Costa Rica.",
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const filters = parseCatalogFilters(await searchParams);
  const categories = await getCategories();

  return (
    <CatalogListing
      basePath="/catalogo"
      filters={filters}
      categories={categories}
      heading={
        <header className="flex flex-col gap-2">
          <nav className="mb-2 flex items-center gap-2 text-xs text-foreground/50">
            <Link href="/" className="hover:text-foreground">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-foreground/70">Catálogo</span>
          </nav>
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-red-500">
            Tienda
          </span>
          <h1 className="text-2xl font-heading font-extrabold uppercase leading-tight sm:text-3xl">
            Todo el catálogo
          </h1>
          <p className="max-w-2xl text-sm text-foreground/70">
            Filtrá por categoría, precio o modalidad de instalación y armá tu
            pedido. Instalamos a domicilio o enviamos a todo el país.
          </p>
        </header>
      }
    />
  );
}
