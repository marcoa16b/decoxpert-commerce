import Breadcrumbs from "@/components/storefront/breadcrumbs";
import Cta from "@/components/storefront/cta";
import CoverageMap from "@/components/storefront/coverage/coverage-map";
import CoverageZones from "@/components/storefront/coverage/coverage-zones";
import { getSettings } from "@/lib/catalog";
import { buildWhatsappHref } from "@/lib/whatsapp";
import { IconBrandWhatsapp, IconShoppingBag } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zonas de cobertura | DecoXpert",
  description:
    "Instalación a domicilio incluida en el Gran Área Metropolitana (GAM). Fuera del GAM se aplica un recargo por desplazamiento según la distancia.",
};

export default async function CoveragePage() {
  const settings = await getSettings();
  const whatsappHref = buildWhatsappHref(
    settings?.whatsappNumber,
    "Hola, quiero confirmar si mi distrito entra en la cobertura de instalación.",
  );

  return (
    <>
      <section className="relative overflow-hidden py-10 md:py-14">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute -top-24 -right-24 aspect-square w-[60vw] max-w-150 rounded-full bg-radial from-red-600/30 to-background/0 blur-[72px]" />
          <div className="absolute -bottom-24 -left-24 aspect-square w-[60vw] max-w-150 rounded-full bg-radial from-green-700/30 to-background/0 blur-[72px]" />
        </div>

        <div className="relative z-1 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/" },
                { label: "Zonas de cobertura" },
              ]}
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <span className="flex w-fit items-center gap-2 rounded-full bg-red-300/20 px-2.5 py-1 text-xs font-heading font-bold uppercase tracking-wide">
              <span className="relative h-2 w-2 animate-pulse rounded-full bg-green-400" />
              Cobertura
            </span>

            <h1 className="text-2xl font-heading font-extrabold uppercase leading-[1.08] sm:text-3xl xl:text-4xl">
              Zonas de cobertura
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-foreground/70">
              Realizamos la instalación a domicilio{" "}
              <span className="font-bold text-foreground">
                sin costo adicional dentro del Gran Área Metropolitana (GAM)
              </span>
              . Fuera del GAM aplicamos un recargo por desplazamiento que
              cotizamos por WhatsApp antes de agendar.
            </p>

            <div className="mt-1 flex flex-wrap justify-center gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-xs font-heading font-extrabold uppercase tracking-wider text-white transition-colors hover:bg-green-700"
              >
                <IconBrandWhatsapp size={16} />
                Confirmar mi zona
              </a>
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-foreground/15 bg-card/60 px-6 py-3.5 text-xs font-heading font-extrabold uppercase tracking-wider text-foreground/80 transition-colors hover:border-foreground/40 hover:text-foreground"
              >
                <IconShoppingBag size={16} />
                Ver catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CoverageMap />
      <CoverageZones />
      <Cta />
    </>
  );
}
