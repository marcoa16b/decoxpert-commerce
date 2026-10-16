"use client";

import { discountPercent, formatCRC } from "@/lib/format";
import {
  activeVariants,
  getCompareAt,
  getUnitPrice,
  installationRequired,
  supportsInstallation,
  variantLabel,
  type InstallMode,
} from "@/lib/pricing";
import type { Product } from "@payload-types";
import {
  IconCheck,
  IconHandStop,
  IconMinus,
  IconPlus,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { useCart } from "../cart/cart-context";

export default function ProductPurchase({
  product,
  imageUrl,
}: {
  product: Product;
  imageUrl: string | null;
}) {
  const variants = activeVariants(product);
  const canInstall = supportsInstallation(product);
  const mustInstall = installationRequired(product);

  const [variantId, setVariantId] = useState<string | null>(variants[0]?.id ?? null);
  const [mode, setMode] = useState<InstallMode>(mustInstall ? "install" : "ship");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = useMemo(
    () => variants.find((entry) => entry.id === variantId) ?? null,
    [variants, variantId],
  );

  const { add, openCart } = useCart();

  const basePrice = getUnitPrice(product, variant, "ship");
  const installPrice = getUnitPrice(product, variant, "install") - basePrice;
  const compareAt = getCompareAt(product, variant);
  const effectivePrice = mode === "install" ? basePrice + installPrice : basePrice;
  const discount = discountPercent(effectivePrice, compareAt);
  const inStock = variant
    ? variant.stock == null || variant.stock > 0
    : product.stock == null || product.stock > 0;

  const handleAdd = () => {
    add(
      {
        id: `${product.id}:${variant?.id ?? "base"}`,
        productId: product.id,
        slug: product.slug,
        title: product.title,
        variantLabel: variant ? variantLabel(variant) || variant.sku || null : null,
        imageUrl,
        unitPrice: basePrice,
        installation: mode === "install",
        installationPrice: mode === "install" ? installPrice : 0,
      },
      quantity,
    );
    setAdded(true);
    openCart();
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="text-2xl font-heading font-extrabold">
          {formatCRC(effectivePrice)}
        </span>
        {compareAt != null && compareAt > effectivePrice ? (
          <span className="text-sm line-through text-foreground/40">
            {formatCRC(compareAt)}
          </span>
        ) : null}
        {discount != null ? (
          <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-heading font-extrabold text-white">
            -{discount}%
          </span>
        ) : null}
      </div>

      {mode === "install" && installPrice > 0 ? (
        <span className="-mt-3 text-xs text-foreground/50">
          Incluye {formatCRC(installPrice)} de instalación
        </span>
      ) : null}

      {variants.length > 0 ? (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-heading font-extrabold uppercase tracking-wider">
            Elegí una opción
          </span>
          <div className="flex flex-wrap gap-2">
            {variants.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => setVariantId(entry.id ?? null)}
                className={`rounded-lg border px-3 py-2 text-xs font-heading font-bold uppercase transition-colors ${
                  entry.id === variantId
                    ? "border-red-500 bg-red-600/10"
                    : "border-foreground/20 text-foreground/70 hover:border-foreground/40"
                }`}
              >
                {variantLabel(entry) || entry.sku || "Opción"}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {canInstall && !mustInstall ? (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-heading font-extrabold uppercase tracking-wider">
            Modalidad
          </span>
          <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-foreground/15 bg-background/60 text-[11px] font-heading font-extrabold uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setMode("ship")}
              className={`flex items-center justify-center gap-2 py-2.5 transition-colors ${
                mode === "ship" ? "bg-red-600 text-white" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <IconTruckDelivery size={14} /> Solo envío
            </button>
            <button
              type="button"
              onClick={() => setMode("install")}
              className={`flex items-center justify-center gap-2 py-2.5 transition-colors ${
                mode === "install" ? "bg-red-600 text-white" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <IconHandStop size={14} /> + Instalación
            </button>
          </div>
        </div>
      ) : null}

      {mustInstall ? (
        <p className="flex items-center gap-2 text-xs text-foreground/60">
          <IconHandStop size={14} /> Este producto requiere instalación profesional.
        </p>
      ) : null}

      {mode === "install" && product.installationNotes ? (
        <p className="rounded-lg bg-foreground/5 p-3 text-xs leading-relaxed text-foreground/60">
          {product.installationNotes}
        </p>
      ) : null}

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 rounded-lg border border-foreground/15 px-3 py-2">
          <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
            <IconMinus size={14} />
          </button>
          <span className="w-6 text-center text-sm">{quantity}</span>
          <button type="button" onClick={() => setQuantity((value) => value + 1)}>
            <IconPlus size={14} />
          </button>
        </div>

        <button
          type="button"
          disabled={!inStock}
          onClick={handleAdd}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-xs font-heading font-extrabold uppercase tracking-wider text-white shadow-button-red transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {added ? (
            <>
              <IconCheck size={16} /> Agregado
            </>
          ) : inStock ? (
            "Agregar al carrito"
          ) : (
            "Agotado"
          )}
        </button>
      </div>
    </div>
  );
}
