export function buildWhatsappHref(
  number: string | null | undefined,
  message?: string | null,
): string {
  const digits = (number ?? "").replace(/\D/g, "");
  if (!digits) return "#";
  const query = message?.trim()
    ? `?text=${encodeURIComponent(message)}`
    : "";
  return `https://wa.me/${digits}${query}`;
}
