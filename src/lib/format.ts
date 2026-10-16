export function formatCRC(value?: number | null): string {
  if (value == null || Number.isNaN(value)) return "";
  return new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    maximumFractionDigits: 0,
  }).format(value);
}

export function discountPercent(
  price?: number | null,
  compareAt?: number | null,
): number | null {
  if (price == null || compareAt == null || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}
