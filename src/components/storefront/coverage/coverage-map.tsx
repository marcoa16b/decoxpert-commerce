import { IconInfoCircle, IconMapPin } from "@tabler/icons-react";
import Image from "next/image";

export default function CoverageMap() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:items-center">
          <div className="overflow-hidden rounded-3xl border border-foreground/15 bg-card/60 p-4 backdrop-blur sm:p-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-foreground/10 bg-background/60">
              <Image
                src="/mapa-costa-rica.png"
                alt="Mapa de Costa Rica con la zona de cobertura de instalación resaltada sobre el Gran Área Metropolitana"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain p-4"
              />
            </div>
            <p className="mt-3 flex items-center gap-2 text-[11px] text-foreground/45">
              <IconInfoCircle size={14} className="shrink-0" />
              Mapa referencial. Confirmá tu distrito exacto por WhatsApp antes de
              agendar.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-red-500">
                Cobertura de instalación
              </span>
              <h2 className="text-2xl font-heading font-extrabold uppercase leading-[1.05] sm:text-3xl">
                Dónde llegamos sin costo extra
              </h2>
              <p className="text-sm leading-relaxed text-foreground/70">
                El servicio de instalación a domicilio está incluido dentro del
                Gran Área Metropolitana. Más allá de esa zona se aplica un
                recargo por desplazamiento.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 p-4">
                <span className="mt-0.5 h-3 w-3 shrink-0 rounded-full bg-green-400" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-green-400">
                    Dentro del GAM
                  </span>
                  <p className="text-xs leading-relaxed text-foreground/70">
                    Instalación incluida, sin recargo. San José, Heredia,
                    Cartago y Alajuela (área metropolitana).
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
                <span className="mt-0.5 h-3 w-3 shrink-0 rounded-full bg-amber-400" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-amber-400">
                    Fuera del GAM
                  </span>
                  <p className="text-xs leading-relaxed text-foreground/70">
                    Se cotiza un recargo por desplazamiento según la distancia y
                    se agenda con cita previa.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3 rounded-2xl border border-foreground/15 bg-card/60 p-4">
                <IconMapPin size={16} className="mt-0.5 shrink-0 text-red-500" />
                <p className="text-xs leading-relaxed text-foreground/70">
                  ¿No sabés si tu distrito entra en la cobertura? Escribinos por
                  WhatsApp y te confirmamos al instante.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
