import type { Product } from "@payload-types";

export type ProductVariant = NonNullable<Product["variants"]>[number];
export type InstallMode = "ship" | "install";

export function supportsInstallation(product: Product): boolean {
  return product.requiresInstallation !== "none";
}

export function installationRequired(product: Product): boolean {
  return product.requiresInstallation === "required";
}

export function activeVariants(product: Product): ProductVariant[] {
  return (product.variants ?? []).filter((variant) => variant.active !== false);
}

export function variantLabel(variant: ProductVariant): string {
  return (variant.attributeValues ?? [])
    .map((value) => value.label || value.value)
    .filter(Boolean)
    .join(" / ");
}

export function getUnitPrice(
  product: Product,
  variant: ProductVariant | null | undefined,
  mode: InstallMode,
): number {
  const base = variant?.priceOverride ?? product.basePrice;
  if (mode === "install") {
    const installation =
      variant?.installationPriceOverride ?? product.installationPrice ?? 0;
    return base + installation;
  }
  return base;
}

export function getCompareAt(
  product: Product,
  variant?: ProductVariant | null,
): number | null {
  return variant?.compareAtPriceOverride ?? product.compareAtPrice ?? null;
}

export function getStartingPrice(product: Product): number {
  const prices = activeVariants(product).map(
    (variant) => variant.priceOverride ?? product.basePrice,
  );
  prices.push(product.basePrice);
  return Math.min(...prices);
}

export function hasPriceRange(product: Product): boolean {
  const variants = activeVariants(product);
  return variants.some((variant) => variant.priceOverride != null);
}

export function isProductInStock(product: Product): boolean {
  const variants = activeVariants(product);
  if (variants.length > 0) {
    return variants.some((variant) => variant.stock == null || variant.stock > 0);
  }
  return product.stock == null || product.stock > 0;
}
