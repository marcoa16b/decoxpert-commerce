"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buildCartWhatsappHref, cartLineTotal } from "@/lib/cart-message";
import { formatCRC } from "@/lib/format";
import {
  IconBrandWhatsapp,
  IconMinus,
  IconPlus,
  IconShoppingBag,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./cart-context";

export default function CartButton() {
  const {
    items,
    count,
    subtotal,
    installationTotal,
    total,
    isOpen,
    setOpen,
    setQuantity,
    remove,
    clear,
    closeCart,
    customerName,
    setCustomerName,
    settings,
  } = useCart();

  const hasName = customerName.trim().length > 0;
  const whatsappHref = buildCartWhatsappHref(
    {
      items,
      subtotal,
      installationTotal,
      total,
      customerName,
      header: settings.cartHeaderMessage ?? settings.whatsappDefaultMessage,
      footer: settings.cartFooterMessage,
    },
    settings.whatsappNumber,
  );

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger className="relative rounded-full border border-foreground/20 p-1.5">
        <IconShoppingBag size={20} />
        {count > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
            {count}
          </span>
        ) : null}
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Tu carrito</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/5 text-foreground/40">
              <IconShoppingBag size={22} />
            </span>
            <p className="text-sm text-foreground/60">Tu carrito está vacío.</p>
            <Link
              href="/catalogo"
              onClick={closeCart}
              className="inline-flex items-center justify-center rounded-xl border border-foreground/15 px-4 py-2 text-[11px] font-heading font-extrabold uppercase tracking-wider text-foreground/70 transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <Link
                    href={`/producto/${item.slug}`}
                    onClick={closeCart}
                    className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-foreground/10 bg-muted"
                  >
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : null}
                  </Link>

                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/producto/${item.slug}`}
                        onClick={closeCart}
                        className="text-xs font-heading font-extrabold uppercase leading-tight transition-colors hover:text-red-500"
                      >
                        {item.title}
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="text-foreground/40 transition-colors hover:text-red-500"
                        aria-label="Quitar"
                      >
                        <IconTrash size={14} />
                      </button>
                    </div>

                    {item.variantLabel ? (
                      <span className="text-[11px] text-foreground/50">
                        {item.variantLabel}
                      </span>
                    ) : null}

                    {item.installation ? (
                      <span className="text-[11px] text-green-500">
                        + Instalación ({formatCRC(item.installationPrice)})
                      </span>
                    ) : (
                      <span className="text-[11px] text-foreground/50">
                        Sin instalación (solo envío)
                      </span>
                    )}

                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-lg border border-foreground/15 px-2 py-1">
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          aria-label="Quitar una unidad"
                        >
                          <IconMinus size={12} />
                        </button>
                        <span className="w-4 text-center text-xs">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          aria-label="Agregar una unidad"
                        >
                          <IconPlus size={12} />
                        </button>
                      </div>
                      <span className="text-xs font-bold">
                        {formatCRC(cartLineTotal(item))}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter>
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-heading font-extrabold uppercase tracking-wider text-foreground/50">
                  Tu nombre
                </span>
                <span className="flex items-center gap-2 rounded-lg border border-foreground/15 bg-background px-3 py-2 focus-within:border-foreground/40">
                  <IconUser size={14} className="text-foreground/40" />
                  <input
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    placeholder="¿Con quién hablamos?"
                    className="w-full bg-transparent text-xs outline-none"
                  />
                </span>
              </label>

              <div className="flex flex-col gap-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Productos</span>
                  <span>{formatCRC(subtotal)}</span>
                </div>
                {installationTotal > 0 ? (
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Instalación</span>
                    <span>{formatCRC(installationTotal)}</span>
                  </div>
                ) : null}
                <div className="mt-1 flex justify-between text-sm font-extrabold">
                  <span>Total</span>
                  <span>{formatCRC(total)}</span>
                </div>
              </div>

              {hasName ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-xs font-heading font-extrabold uppercase tracking-wider text-white transition-colors hover:bg-green-700"
                >
                  <IconBrandWhatsapp size={16} />
                  Pedir por WhatsApp
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600/50 px-4 py-3 text-xs font-heading font-extrabold uppercase tracking-wider text-white/80"
                >
                  <IconBrandWhatsapp size={16} />
                  Escribí tu nombre para pedir
                </button>
              )}

              <button
                type="button"
                onClick={clear}
                className="text-[11px] text-foreground/50 transition-colors hover:text-red-500"
              >
                Vaciar carrito
              </button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
