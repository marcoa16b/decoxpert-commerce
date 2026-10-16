import HeroImage from "@/app/assets/heroimg.jpg";
import { getFeaturedCategories } from "@/lib/catalog";
import type { Category } from "@payload-types";
import {
  IconBulbFilled,
  IconCategory,
  IconDeviceTablet,
  IconSatellite,
  IconShieldHalfFilled,
  IconVolume,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

function iconForSlug(slug: string): ReactNode {
  const value = slug.toLowerCase();
  if (value.includes("alarm") || value.includes("seguridad")) {
    return <IconShieldHalfFilled size={18} stroke={1.5} />;
  }
  if (value.includes("gps") || value.includes("rastreo") || value.includes("satelit")) {
    return <IconSatellite size={18} stroke={1.5} />;
  }
  if (
    value.includes("pantalla") ||
    value.includes("multimedia") ||
    value.includes("carplay") ||
    value.includes("android")
  ) {
    return <IconDeviceTablet size={18} stroke={1.5} />;
  }
  if (value.includes("audio") || value.includes("parlante") || value.includes("sonido")) {
    return <IconVolume size={18} stroke={1.5} />;
  }
  if (value.includes("led") || value.includes("luz") || value.includes("ilumin")) {
    return <IconBulbFilled size={18} stroke={1.5} />;
  }
  return <IconCategory size={18} stroke={1.5} />;
}

function categoryImage(category: Category) {
  const image = category.image;
  if (image && typeof image === "object") return image;
  return null;
}

export default async function Categories() {
  const categories = await getFeaturedCategories();

  if (categories.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-red-500">
              Catálogo especializado
            </span>
            <h2 className="text-2xl font-heading font-extrabold uppercase leading-[1.05] sm:text-3xl xl:text-4xl">
              Categorías principales
            </h2>
          </div>
          <p className="text-sm text-foreground/70 lg:max-w-md lg:text-right">
            Sistemas integrados diseñados para conservar la estética de tu auto
            y cuidar su sistema eléctrico.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => {
            const image = categoryImage(category);
            return (
              <Link
                key={category.id}
                href={`/categoria/${category.slug}`}
                className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl border border-foreground/15 sm:aspect-[3/4] sm:min-h-65"
              >
                <Image
                  src={image?.url ?? HeroImage}
                  alt={image?.alt || category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

                <div className="relative z-1 flex flex-col gap-3 p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-white shadow-button-red">
                    {iconForSlug(category.slug)}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-heading font-extrabold uppercase leading-tight">
                      {category.name}
                    </h3>
                    {category.description ? (
                      <p className="text-[11px] leading-snug text-foreground/70">
                        {category.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
