import HeroImage from "@/app/assets/heroimg.jpg";
import {
  IconBrandWhatsapp,
  IconCalendarEvent,
  IconMapPin,
  IconShieldCheck,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const chips = [
  "Técnico certificado en tu cochera",
  "Garantía escrita de 12 meses",
  "Cableado aislado y protegido",
  "Equipo probado antes de irnos",
];

const metrics = [
  { value: "45 min", label: "Instalación express*" },
  { value: "100%", label: "Conexiones protegidas" },
  { value: "12 m", label: "Garantía real" },
];

export default function InstallationHero({
  whatsappHref,
}: {
  whatsappHref: string;
}) {
  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 aspect-square w-[60vw] max-w-150 rounded-full bg-radial from-red-600/30 to-background/0 blur-[72px]" />
        <div className="absolute -bottom-24 -left-24 aspect-square w-[60vw] max-w-150 rounded-full bg-radial from-green-700/30 to-background/0 blur-[72px]" />
      </div>

      <div className="relative z-1 mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:px-8">
        <div className="flex flex-col gap-5">
          <span className="flex w-fit items-center gap-2 rounded-full bg-red-300/20 px-2.5 py-1 text-xs font-heading font-bold uppercase tracking-wide">
            <span className="relative h-2 w-2 animate-pulse rounded-full bg-green-400" />
            Servicio a domicilio
          </span>

          <h1 className="text-2xl font-heading font-extrabold uppercase leading-[1.08] sm:text-3xl xl:text-4xl">
            El taller va a <span className="text-red-600">tu cochera</span>
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-foreground/70">
            Instalamos alarmas, GPS, pantallas Android y car audio en la puerta
            de tu casa u oficina. Coordinamos el día, llegamos con las
            herramientas aisladas y te entregamos el equipo funcionando y
            probado.
          </p>

          <ul className="flex flex-col gap-2">
            {chips.map((chip) => (
              <li
                key={chip}
                className="flex items-center gap-2 text-xs text-foreground/75"
              >
                <IconShieldCheck size={16} className="shrink-0 text-green-400" />
                {chip}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-xs font-heading font-extrabold uppercase tracking-wider text-white shadow-button-red transition-colors hover:bg-red-700"
            >
              <IconCalendarEvent size={16} />
              Agendar instalación
            </a>
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-green-400/60 bg-green-400/5 px-6 py-3.5 text-xs font-heading font-extrabold uppercase tracking-wider text-green-400 transition-colors hover:border-green-400 hover:bg-green-400 hover:text-black"
            >
              Ver catálogo
            </Link>
          </div>

          <div className="mt-1 grid grid-cols-3 overflow-hidden rounded-2xl border border-foreground/15 divide-x divide-foreground/15">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex flex-col items-center gap-1 px-2 py-4 text-center"
              >
                <span className="font-heading text-xl font-extrabold text-red-500">
                  {metric.value}
                </span>
                <span className="text-[10px] font-bold uppercase text-foreground/60">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-foreground/40">
            *Alarmas y GPS. Las pantallas multimedia pueden tomar de 1 a 2 horas.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-foreground/15 bg-foreground/10">
            <Image
              src={HeroImage}
              alt="Técnico de DecoXpert instalando equipamiento en el tablero de un vehículo a domicilio"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <span className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-[11px] font-heading font-bold uppercase text-foreground backdrop-blur">
              <IconMapPin size={12} className="text-green-400" />
              Cobertura GAM incluida
            </span>
            <span className="absolute bottom-3 right-3 rounded-full bg-red-600 px-3 py-1.5 text-[11px] font-heading font-extrabold uppercase text-white shadow-button-red">
              Técnicos certificados
            </span>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-foreground/15 bg-card/60 p-3.5">
            <IconBrandWhatsapp size={22} className="shrink-0 text-green-400" />
            <p className="text-xs leading-relaxed text-foreground/70">
              <span className="font-bold text-foreground">
                Coordinación directa:
              </span>{" "}
              escribinos por WhatsApp y confirmamos la fecha, la franja horaria y
              el tiempo estimado de instalación para tu vehículo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
