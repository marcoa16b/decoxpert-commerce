import ProductGallery from "@/components/storefront/product/product-gallery";
import ProductPurchase from "@/components/storefront/product/product-purchase";
import { getCategoryName, getProductBySlug } from "@/lib/catalog";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.meta?.title || product.title,
    description: product.meta?.description || product.shortDescription || undefined,
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const category = getCategoryName(product);
  const images = (product.gallery ?? []).map((item) => {
    const image = item.image;
    if (image && typeof image === "object") {
      return { url: image.url, alt: item.alt || image.alt || product.title };
    }
    return { url: null, alt: product.title };
  });
  const firstImageUrl = images[0]?.url ?? null;
  const badges = product.badges ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-foreground/50">
        <Link href="/" className="hover:text-foreground">
          Inicio
        </Link>
        {category ? (
          <>
            <span>/</span>
            <span>{category}</span>
          </>
        ) : null}
        <span>/</span>
        <span className="text-foreground/70">{product.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery images={images} title={product.title} />

        <div className="flex flex-col gap-5">
          {category ? (
            <span className="text-[11px] font-heading font-extrabold uppercase tracking-wider text-red-500">
              {category}
            </span>
          ) : null}

          <h1 className="text-2xl font-heading font-extrabold uppercase leading-tight sm:text-3xl">
            {product.title}
          </h1>

          {product.shortDescription ? (
            <p className="text-sm leading-relaxed text-foreground/70">
              {product.shortDescription}
            </p>
          ) : null}

          {badges.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-heading font-extrabold uppercase tracking-wider ${
                    badge.style === "promo"
                      ? "bg-red-600 text-white"
                      : badge.style === "highlight"
                        ? "bg-green-600/15 text-green-500"
                        : "bg-foreground/10 text-foreground"
                  }`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          ) : null}

          <ProductPurchase product={product} imageUrl={firstImageUrl} />
        </div>
      </div>

      {product.description ? (
        <div className="mt-12 max-w-3xl">
          <h2 className="mb-4 text-lg font-heading font-extrabold uppercase">
            Descripción
          </h2>
          <div className="text-sm leading-relaxed text-foreground/75 [&_a]:text-red-500 [&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:text-base [&_h2]:font-heading [&_h2]:font-bold [&_h3]:mt-4 [&_h3]:font-heading [&_h3]:font-bold [&_li]:ml-5 [&_li]:list-disc [&_p]:mb-3 [&_ul]:mb-3">
            <RichText data={product.description} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
