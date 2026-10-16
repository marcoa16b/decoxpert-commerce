import {
  INSTALL_OPTIONS,
  catalogHref,
  type CatalogFilters,
} from "@/lib/catalog-params";
import { formatCRC } from "@/lib/format";
import { IconX } from "@tabler/icons-react";
import Link from "next/link";

type Chip = { key: string; label: string; href: string };

function priceLabel(filters: CatalogFilters): string | null {
  if (filters.priceMin == null && filters.priceMax == null) return null;
  if (filters.priceMin != null && filters.priceMax != null) {
    return `${formatCRC(filters.priceMin)} - ${formatCRC(filters.priceMax)}`;
  }
  if (filters.priceMin != null) return `Desde ${formatCRC(filters.priceMin)}`;
  return `Hasta ${formatCRC(filters.priceMax)}`;
}

export default function CatalogActiveFilters({
  basePath,
  filters,
  categoryName,
}: {
  basePath: string;
  filters: CatalogFilters;
  categoryName: string | null;
}) {
  const chips: Chip[] = [];

  if (categoryName) {
    chips.push({
      key: "categoria",
      label: categoryName,
      href: catalogHref(basePath, filters, { categoria: null }),
    });
  }

  if (filters.installation) {
    const label =
      INSTALL_OPTIONS.find((option) => option.value === filters.installation)
        ?.label ?? filters.installation;
    chips.push({
      key: "instalacion",
      label,
      href: catalogHref(basePath, filters, { instalacion: null }),
    });
  }

  const price = priceLabel(filters);
  if (price) {
    chips.push({
      key: "precio",
      label: price,
      href: catalogHref(basePath, filters, { precioMin: null, precioMax: null }),
    });
  }

  if (filters.featured) {
    chips.push({
      key: "destacados",
      label: "Destacados",
      href: catalogHref(basePath, filters, { destacados: null }),
    });
  }

  if (filters.q) {
    chips.push({
      key: "q",
      label: `"${filters.q}"`,
      href: catalogHref(basePath, filters, { q: null }),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <Link
          key={chip.key}
          href={chip.href}
          className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/5 px-2.5 py-1 text-[11px] text-foreground/70 transition-colors hover:border-foreground/40 hover:text-foreground"
        >
          {chip.label}
          <IconX size={12} />
        </Link>
      ))}
      <Link
        href={basePath}
        className="text-[11px] font-heading font-bold uppercase tracking-wide text-red-500 transition-colors hover:text-red-400"
      >
        Limpiar todo
      </Link>
    </div>
  );
}
