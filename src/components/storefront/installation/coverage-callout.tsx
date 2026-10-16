import { IconArrowRight, IconMapPin } from "@tabler/icons-react";
import Link from "next/link";

export default function CoverageCallout() {
  return (
    <section className="pb-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-5 rounded-3xl border border-foreground/15 bg-card/60 p-6 backdrop-blur sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
              <IconMapPin size={22} />
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-heading font-extrabold uppercase leading-tight">
                ¿Tu dirección está dentro del GAM?
              </h2>
              <p className="max-w-xl text-xs leading-relaxed text-foreground/65">
                La instalación está incluida en el Gran Área Metropolitana. Fuera
                del GAM cotizamos un recargo por desplazamiento según la
                distancia.
              </p>
            </div>
          </div>

          <Link
            href="/zonas-de-cobertura"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-xs font-heading font-extrabold uppercase tracking-wider text-white shadow-button-red transition-colors hover:bg-red-700"
          >
            Ver zonas de cobertura
            <IconArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
