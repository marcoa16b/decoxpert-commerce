import type { CartItem } from "@/components/storefront/cart/cart-context";
import { formatCRC } from "./format";

export const DEFAULT_CART_HEADER =
  "Hola, soy {nombre} y me interesan estos productos:";
export const DEFAULT_CART_FOOTER = "Quedo atento/a a su respuesta. Gracias.";

const NAME_PATTERN = /\{\{?\s*nombre\s*\}?\}|\[\s*nombre\s*\]/gi;

function applyCustomerName(template: string, name: string): string {
  return template.replace(NAME_PATTERN, name);
}

export function cartLineTotal(item: CartItem): number {
  const installation = item.installation
    ? item.installationPrice * item.quantity
    : 0;
  return item.unitPrice * item.quantity + installation;
}

export type CartMessageInput = {
  items: CartItem[];
  subtotal: number;
  installationTotal: number;
  total: number;
  customerName: string;
  header: string | null;
  footer: string | null;
};

export function buildCartMessage({
  items,
  subtotal,
  installationTotal,
  total,
  customerName,
  header,
  footer,
}: CartMessageInput): string {
  const name = customerName.trim() || "un cliente";
  const headerText = applyCustomerName(
    header?.trim() || DEFAULT_CART_HEADER,
    name,
  );

  const lines = items.map((item) => {
    const variant = item.variantLabel ? ` (${item.variantLabel})` : "";
    const mode = item.installation ? "con instalación" : "sin instalación";
    return `• ${item.title}${variant} — ${mode} — x${item.quantity} = ${formatCRC(cartLineTotal(item))}`;
  });

  const totals: string[] = [];
  if (installationTotal > 0) {
    totals.push(`Productos: ${formatCRC(subtotal)}`);
    totals.push(`Instalación: ${formatCRC(installationTotal)}`);
  }
  totals.push(`Total: ${formatCRC(total)}`);

  const footerText = footer?.trim() || DEFAULT_CART_FOOTER;

  return [headerText, "", ...lines, "", ...totals, "", footerText].join("\n");
}

export function buildCartWhatsappHref(
  input: CartMessageInput,
  whatsappNumber: string,
): string {
  const number = whatsappNumber.replace(/\D/g, "");
  const message = buildCartMessage(input);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
