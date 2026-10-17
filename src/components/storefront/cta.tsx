"use client";

import { useCart } from "@/components/storefront/cart/cart-context";
import { buildWhatsappHref } from "@/lib/whatsapp";
import {
  IconBrandWhatsapp,
  IconCalendarEvent,
  IconShieldCheck,
} from "@tabler/icons-react";

const bullets = [
  "Técnico certificado en tu cochera",
  "Garantía por escrito",
  "Conexiones aisladas y protegidas",
];

export default function Cta() {
  const { settings } = useCart();
  const whatsappHref = buildWhatsappHref(
    settings.whatsappNumber,
    settings.whatsappDefaultMessage,
  );

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-foreground/15 bg-linear-to-br from-red-950/70 via-card to-card px-6 py-14 text-center md:px-16 md:py-20">
          <div className="pointer-events-none absolute -top-24 right-0 w-80 h-80 bg-radial from-red-600/40 to-transparent blur-3xl rounded-full" />
          <div className="pointer-events-none absolute -bottom-24 left-0 w-80 h-80 bg-radial from-green-700/30 to-transparent blur-3xl rounded-full" />

          <div className="relative z-1 mx-auto flex max-w-2xl flex-col items-center gap-5">
            <span className="text-xs uppercase tracking-wider font-heading font-bold text-red-400">
              Instalación a domicilio en Costa Rica
            </span>

            <h2 className="text-2xl sm:text-3xl xl:text-4xl leading-[1.08] uppercase font-extrabold font-heading">
              ¿Listo para equipar tu carro sin moverte de casa?
            </h2>

            <p className="text-sm text-foreground/70 leading-relaxed">
              Coordinamos la visita de un técnico certificado en la fecha que
              elijas. Instalación limpia, equipo probado en el momento y soporte
              directo por WhatsApp.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-1">
              <a
                href={buildWhatsappHref(
                  settings.whatsappNumber,
                  "Hola, quiero agendar la instalación a domicilio de mi vehículo. ¿Me ayudan a coordinar una visita?",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition-colors px-6 py-3.5 rounded-xl text-xs font-heading font-extrabold uppercase tracking-wider text-white shadow-button-red"
              >
                <IconCalendarEvent size={16} />
                Agendar instalación
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-green-400/60 bg-green-400/5 hover:bg-green-400 hover:border-green-400 hover:text-black transition-colors px-6 py-3.5 rounded-xl text-xs font-heading font-extrabold uppercase tracking-wider text-green-400"
              >
                <IconBrandWhatsapp size={16} />
                Escribir por WhatsApp
              </a>
            </div>

            <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-foreground/55"
                >
                  <IconShieldCheck size={14} className="text-green-400" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
