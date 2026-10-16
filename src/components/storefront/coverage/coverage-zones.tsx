import {
  IconBuildingCommunity,
  IconCheck,
  IconTruckDelivery,
} from "@tabler/icons-react";

const gamProvinces = ["San José", "Heredia", "Cartago", "Alajuela"];

const outsideProvinces = ["Guanacaste", "Puntarenas", "Limón"];

export default function CoverageZones() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="flex flex-col gap-4 rounded-3xl border border-green-500/30 bg-green-500/10 p-6 md:p-8">
            <header className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-400/15 text-green-400">
                <IconBuildingCommunity size={22} />
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-green-400">
                  Sin recargo
                </span>
                <h2 className="text-lg font-heading font-extrabold uppercase leading-tight">
                  Gran Área Metropolitana
                </h2>
              </div>
            </header>

            <p className="text-xs leading-relaxed text-foreground/70">
              Instalación a domicilio <strong>incluida</strong> en los distritos
              del área metropolitana de las provincias:
            </p>

            <ul className="flex flex-wrap gap-2">
              {gamProvinces.map((province) => (
                <li
                  key={province}
                  className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-background/40 px-3 py-1.5 text-xs font-heading font-bold uppercase tracking-wide"
                >
                  <IconCheck size={13} className="text-green-400" />
                  {province}
                </li>
              ))}
            </ul>

            <p className="text-[11px] leading-relaxed text-foreground/50">
              Si estás en las afueras de alguno de estos cantones, consultanos por
              WhatsApp: puede aplicar el recargo por desplazamiento.
            </p>
          </article>

          <article className="flex flex-col gap-4 rounded-3xl border border-amber-500/30 bg-amber-500/10 p-6 md:p-8">
            <header className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/15 text-amber-400">
                <IconTruckDelivery size={22} />
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Con recargo por distancia
                </span>
                <h2 className="text-lg font-heading font-extrabold uppercase leading-tight">
                  Resto del país
                </h2>
              </div>
            </header>

            <p className="text-xs leading-relaxed text-foreground/70">
              También instalamos fuera del GAM y realizamos giras a otras
              provincias. En estos casos sumamos un{" "}
              <strong>recargo por desplazamiento</strong> según la distancia.
            </p>

            <ul className="flex flex-wrap gap-2">
              {outsideProvinces.map((province) => (
                <li
                  key={province}
                  className="inline-flex items-center rounded-full border border-amber-500/30 bg-background/40 px-3 py-1.5 text-xs font-heading font-bold uppercase tracking-wide"
                >
                  {province}
                </li>
              ))}
              <li className="inline-flex items-center rounded-full border border-amber-500/30 bg-background/40 px-3 py-1.5 text-xs font-heading font-bold uppercase tracking-wide">
                Zonas rurales
              </li>
            </ul>

            <p className="text-[11px] leading-relaxed text-foreground/50">
              El recargo se cotiza y confirma por WhatsApp antes de agendar, para
              que sepas el monto final sin sorpresas.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
