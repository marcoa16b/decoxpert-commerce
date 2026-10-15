"use client";

import HeroImage from "@/app/assets/heroimg.jpg";
import {
  IconArrowsRightLeft,
  IconBrandWhatsapp,
  IconHandStop,
  IconShoppingBag,
  IconTruckDelivery,
} from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

type Product = {
  category: string;
  title: string;
  description: string;
  redBadge: string;
  greenBadge: string;
  price: string;
  whatsappHref: string;
};

const products: Product[] = [
  {
    category: "Seguridad Avanzada",
    title: "Alarma SPY 2 vías con encendido a distancia",
    description:
      "Control con pantalla LCD interactiva, alcance 1.5 km, sensor de doble impacto y apertura remota de maletero.",
    redBadge: "-25% OFF",
    greenBadge: "Garantía 1 Año",
    price: "₡120.00",
    whatsappHref: "#",
  },
  {
    category: "Rastreo Satelital",
    title: "GPS Tracker 4G con corte de motor y app móvil",
    description:
      "Monitoreo en vivo vía satélite, historial de rutas 90 días, micrófono espía y corte de corriente antirrobo.",
    redBadge: "Más vendido",
    greenBadge: "Sin Mensualidades",
    price: "₡95.00",
    whatsappHref: "#",
  },
  {
    category: "Multimedia HD",
    title: "Pantalla Android 10\" 4GB/64GB CarPlay inalámbrico",
    description:
      "Panel IPS QLED, Android 13, Apple CarPlay & Android Auto inalámbrico, DSP 32 bandas y ecualizador profesional.",
    redBadge: "Premium Tech",
    greenBadge: "Mantiene Mandos Timón",
    price: "₡240.00",
    whatsappHref: "#",
  },
  {
    category: "Car Audio",
    title: "Set de Parlantes Componentes JBL 6.5\" 2 vías",
    description:
      "Potencia 270W pico / 90W RMS, tweeters de cúpula de seda para agudos cristalinos y crossovers externos incluidos.",
    redBadge: "Alta Fidelidad",
    greenBadge: "Audio Puro",
    price: "₡110.00",
    whatsappHref: "#",
  },
  {
    category: "Asistencia Estacionamiento",
    title: "Cámara de Retroceso HD Visión Nocturna",
    description:
      "Lente gran angular ojo de pez 170°, sensor Starlight para oscuridad total y guías dinámicas de parqueo.",
    redBadge: "Impermeable IP68",
    greenBadge: "Ángulo 170°",
    price: "₡55.00",
    whatsappHref: "#",
  },
];

function ProductCard({ product }: { product: Product }) {
  const [mode, setMode] = useState<"ship" | "install">("install");

  return (
    <article className="flex flex-col rounded-2xl overflow-hidden border border-foreground/15 bg-card/70">
      {/* IMAGE + BADGES */}
      <div className="relative aspect-[4/3]">
        <Image
          src={HeroImage}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
        <span className="absolute bottom-3 left-3 inline-flex items-center px-3 py-1 rounded-full bg-red-600 text-[10px] font-heading font-extrabold uppercase tracking-wider text-white shadow-button-red">
          {product.redBadge}
        </span>
        <span className="absolute top-3 right-3 inline-flex items-center px-3 py-1 rounded-full bg-black/70 backdrop-blur text-[12px] font-accent text-green-400 leading-none">
          {product.greenBadge}
        </span>
      </div>

      {/* INFO */}
      <div className="flex flex-col gap-3 p-5">
        <span className="text-[11px] font-heading font-extrabold uppercase tracking-wider text-red-500">
          {product.category}
        </span>

        <div className="flex flex-col gap-1.5">
          <h3 className="text-sm font-heading font-extrabold uppercase leading-tight line-clamp-2">
            {product.title}
          </h3>
          <p className="text-xs text-foreground/65 leading-relaxed line-clamp-3">
            {product.description}
          </p>
        </div>

        {/* SEGMENTED CONTROL */}
        <div className="grid grid-cols-2 rounded-xl bg-background/60 border border-foreground/15 overflow-hidden text-[11px] font-heading font-extrabold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setMode("ship")}
            className={`flex items-center justify-center gap-2 py-2.5 transition-colors ${
              mode === "ship"
                ? "bg-red-600 text-white"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            <IconHandStop size={14} />
            Solo envío
          </button>
          <button
            type="button"
            onClick={() => setMode("install")}
            className={`flex items-center justify-center gap-2 py-2.5 transition-colors ${
              mode === "install"
                ? "bg-red-600 text-white"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            <IconHandStop size={14} />
            + Instalación
          </button>
        </div>

        {/* SHIPPING */}
        <span className="flex items-center gap-2 text-[11px] text-foreground/55">
          <IconTruckDelivery size={14} className="text-foreground/40" />
          Envío express a nivel nacional
        </span>

        {/* PRICE + CTA */}
        <div className="flex items-end justify-between gap-3 pt-1">
          <div className="flex flex-col">
            <span className="text-[10px] font-heading font-extrabold uppercase tracking-wider text-foreground/55">
              Precio total:
            </span>
            <span className="text-xl font-heading font-extrabold leading-none">
              {product.price}
            </span>
          </div>
          <a
            href={product.whatsappHref}
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap bg-green-500 hover:bg-green-600 transition-colors px-3 py-2 rounded-lg text-[10px] font-heading font-extrabold uppercase tracking-wider text-white shadow-button"
          >
            <IconBrandWhatsapp size={14} />
            Pedir WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

function PromoCard() {
  return (
    <article className="relative flex flex-col justify-between rounded-2xl overflow-hidden border border-red-500/30 bg-linear-to-br from-red-950/80 via-red-900/40 to-card p-6 min-h-100">
      <div className="pointer-events-none absolute -top-10 -right-10 w-50 h-50 bg-radial from-red-600/40 to-transparent blur-2xl rounded-full" />

      <div className="relative z-1 flex flex-col gap-4">
        <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400">
          <IconShoppingBag size={22} />
        </span>

        <div className="flex flex-col gap-2">
          <span className="font-accent text-xl text-green-400 leading-none">
            ¿Buscas un paquete a medida?
          </span>
          <h3 className="text-lg font-heading font-extrabold uppercase leading-tight">
            Combos todo incluido para flotas y particulares
          </h3>
          <p className="text-xs text-foreground/70 leading-relaxed">
            Instalamos Pantalla + Alarma + GPS en una sola sesión a domicilio con
            descuento especial de técnico en sitio.
          </p>
        </div>
      </div>

      <a
        href="#"
        className="relative z-1 mt-6 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition-colors px-5 py-3 rounded-xl text-xs font-heading font-extrabold uppercase tracking-wider text-white shadow-button-red"
      >
        <IconHandStop size={16} />
        Cotizar paquete completo
      </a>
    </article>
  );
}

export default function FeaturedProducts() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-wider">
              <span className="relative w-2 h-2 rounded-full bg-red-500" />
              Equipamiento top ventas
            </span>
            <h2 className="text-2xl sm:text-3xl xl:text-4xl leading-[1.05] uppercase font-extrabold font-heading">
              Productos con instalación disponible
            </h2>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-foreground/15 bg-card/60 backdrop-blur p-4 lg:max-w-md">
            <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-lg bg-green-400/15 text-green-400">
              <IconArrowsRightLeft size={20} />
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-heading font-extrabold uppercase tracking-wider">
                Modalidad de compra flexible
              </span>
              <p className="text-xs text-foreground/65 leading-relaxed">
                Usa el interruptor en cada producto para elegir con o sin
                instalación en tu cochera.
              </p>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.title} product={product} />
          ))}
          <PromoCard />
        </div>
      </div>
    </section>
  );
}
