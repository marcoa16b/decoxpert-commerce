import {
  IconActivity,
  IconCertificate,
  IconCircleCheck,
  IconClock,
  IconPlugConnected,
  IconShieldCheck,
} from "@tabler/icons-react";
import type { ReactNode } from "react";

type Item = { title: string; description: string; icon: ReactNode };

const items: Item[] = [
  {
    title: "Técnico certificado",
    description:
      "Personal capacitado en alarmas, GPS, multimedia y audio automotriz de todas las marcas.",
    icon: <IconShieldCheck size={20} stroke={1.5} />,
  },
  {
    title: "Cableado aislado",
    description:
      "Conexiones protegidas y organizadas, sin cables a la vista ni empalmes precarios.",
    icon: <IconPlugConnected size={20} stroke={1.5} />,
  },
  {
    title: "Diagnóstico profesional",
    description:
      "Revisamos y probamos el estado del vehículo antes y después de cada instalación para no alterar su funcionamiento.",
    icon: <IconActivity size={20} stroke={1.5} />,
  },
  {
    title: "Prueba en el momento",
    description:
      "Probamos el sistema contigo antes de retirarnos para que veas que todo quedó funcionando.",
    icon: <IconCircleCheck size={20} stroke={1.5} />,
  },
  {
    title: "Garantía escrita",
    description:
      "Certificado por escrito que cubre tanto el equipo como la mano de obra de la instalación.",
    icon: <IconCertificate size={20} stroke={1.5} />,
  },
  {
    title: "Franja horaria acordada",
    description:
      "Coordinamos el día y la hora que mejor te convenga, sin que tengas que moverte.",
    icon: <IconClock size={20} stroke={1.5} />,
  },
];

export default function InstallationIncludes() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center gap-3 text-center">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-red-500">
            Incluido en cada visita
          </span>
          <h2 className="text-2xl font-heading font-extrabold uppercase leading-[1.05] sm:text-3xl xl:text-4xl">
            Qué incluye la instalación a domicilio
          </h2>
          <p className="text-sm leading-relaxed text-foreground/70">
            Un servicio pensado para que no tengas que llevar el carro a ningún
            taller: nuestro técnico móvil llega con todo lo necesario.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="flex flex-col gap-3 rounded-2xl border border-foreground/15 bg-card/60 p-5 backdrop-blur"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                {item.icon}
              </span>
              <h3 className="text-sm font-heading font-extrabold uppercase leading-tight">
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed text-foreground/65">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
