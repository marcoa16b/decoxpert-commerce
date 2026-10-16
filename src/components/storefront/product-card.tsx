import HeroImage from "@/app/assets/heroimg.jpg";
import { getCategoryName, getProductImage } from "@/lib/catalog";
import { discountPercent, formatCRC } from "@/lib/format";
import { getCompareAt, getStartingPrice, hasPriceRange } from "@/lib/pricing";
import type { Product } from "@payload-types";
import Image from "next/image";
import Link from "next/link";

const highlightClass = "bg-black/70 backdrop-blur text-[12px] font-accent text-green-400 leading-none";
const infoClass =
  "bg-foreground text-background text-[10px] font-heading font-extrabold uppercase tracking-wider";
const promoClass =
  "bg-red-600 text-white text-[10px] font-heading font-extrabold uppercase tracking-wider shadow-button-red";

export default function ProductCard({ product }: { product: Product }) {
  const image = getProductImage(product);
  const category = getCategoryName(product);
  const price = getStartingPrice(product);
  const compareAt = getCompareAt(product);
  const discount = discountPercent(price, compareAt);
  const badges = product.badges ?? [];
  const promoBadges = badges.filter((badge) => badge.style === "promo");
  const infoBadges = badges.filter((badge) => badge.style === "info");
  const highlightBadges = badges.filter((badge) => badge.style === "highlight");

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-foreground/15 bg-card/70 transition-colors hover:border-foreground/30"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={image?.url ?? HeroImage}
          alt={image?.alt || product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

        <div className="absolute inset-x-0 top-3 flex items-start justify-between gap-2 px-3">
          <div className="flex flex-col items-start gap-1.5">
            {infoBadges.map((badge, index) => (
              <span key={index} className={`inline-flex items-center rounded-full px-2.5 py-1 ${infoClass}`}>
                {badge.label}
              </span>
            ))}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            {highlightBadges.map((badge, index) => (
              <span key={index} className={`inline-flex items-center rounded-full px-3 py-1 ${highlightClass}`}>
                {badge.label}
              </span>
            ))}
            {discount != null ? (
              <span className="inline-flex items-center rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-heading font-extrabold uppercase tracking-wider text-white">
                -{discount}% OFF
              </span>
            ) : null}
          </div>
        </div>

        {promoBadges.length > 0 ? (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {promoBadges.map((badge, index) => (
              <span key={index} className={`inline-flex items-center rounded-full px-3 py-1 ${promoClass}`}>
                {badge.label}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {category ? (
          <span className="text-[11px] font-heading font-extrabold uppercase tracking-wider text-red-500">
            {category}
          </span>
        ) : null}

        <div className="flex flex-col gap-1.5">
          <h3 className="line-clamp-2 text-sm font-heading font-extrabold uppercase leading-tight">
            {product.title}
          </h3>
          {product.shortDescription ? (
            <p className="line-clamp-3 text-xs leading-relaxed text-foreground/65">
              {product.shortDescription}
            </p>
          ) : null}
        </div>

        <div className="mt-auto flex items-baseline gap-1.5 pt-1">
          {hasPriceRange(product) ? (
            <span className="text-[10px] uppercase tracking-wider text-foreground/50">
              Desde
            </span>
          ) : null}
          <span className="text-base font-heading font-extrabold leading-none">
            {formatCRC(price)}
          </span>
          {compareAt != null && compareAt > price ? (
            <span className="text-xs line-through text-foreground/40">
              {formatCRC(compareAt)}
            </span>
          ) : null}
        </div>

        <span className="mt-2 inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2.5 text-[11px] font-heading font-extrabold uppercase tracking-wider text-white shadow-button-red transition-colors group-hover:bg-red-500">
          Ver producto
        </span>
      </div>
    </Link>
  );
}
