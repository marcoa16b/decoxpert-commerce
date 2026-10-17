import {
  IconBolt,
  IconCalendarEvent,
  IconShieldCheck,
  IconShoppingCart,
  IconTools,
} from "@tabler/icons-react";
import type { ReactNode } from "react";

type Step = {
  number: string;
  title: string;
  description: string;
  accent: string;
  icon: ReactNode;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Elige tu accesorio o alarma",
    description:
      "Explora nuestro catálogo en línea o consúltanos por WhatsApp el envío exprés compatible con la marca, año y modelo de tu vehículo.",
    accent: "Compatible con tu vehículo",
    icon: <IconShoppingCart size={22} stroke={1.5} />,
  },
  {
    number: "02",
    title: "Agenda fecha y cochera",
    description:
      "Indica tu dirección en cualquier punto del país. Coordinamos la fecha exacta y franja horaria que mejor se adapte a tu rutina.",
    accent: "¡Puntualidad milimétrica!",
    icon: <IconCalendarEvent size={22} stroke={1.5} />,
  },
  {
    number: "03",
    title: "Instalación certificada",
    description:
      "Nuestro técnico móvil arriba equipado, realiza la instalación impecable sin cables a la vista, prueba el sistema contigo y entrega tu garantía por escrito.",
    accent: "Garantía por escrito",
    icon: <IconShieldCheck size={22} stroke={1.5} />,
  },
];

function StepCard({ step }: { step: Step }) {
  return (
    <article className="flex flex-col gap-5 p-6 rounded-2xl border border-foreground/15 bg-card/60 backdrop-blur">
      <header className="flex items-start justify-between">
        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-600 text-white text-sm font-heading font-extrabold tracking-wider shadow-button-red">
          {step.number}
        </span>
        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/10 text-red-500">
          {step.icon}
        </span>
      </header>

      <div className="flex flex-col gap-3">
        <h3 className="text-base font-heading font-extrabold uppercase leading-tight">
          {step.title}
        </h3>
        <p className="text-xs text-foreground/65 leading-relaxed">
          {step.description}
        </p>
        <span className="font-accent text-base text-green-400 leading-none mt-1">
          {step.accent}
        </span>
      </div>
    </article>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col items-center text-center gap-3 mb-10 max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-wider font-heading font-bold text-green-400">
            Protocolo profesional
          </span>
          <h2 className="text-2xl sm:text-3xl xl:text-4xl leading-[1.05] uppercase font-extrabold font-heading">
            ¿Cómo funciona el servicio a domicilio?
          </h2>
          <p className="text-sm text-foreground/70 leading-relaxed">
            Diseñado para que continues con tu día en casa o tu oficina sin
            complicaciones técnicas ni tiempos de espera.
          </p>
        </div>

        {/* STEPS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>

        {/* FOOTER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl border border-foreground/15 bg-card/60 backdrop-blur">
          <div className="flex items-start sm:items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-lg bg-green-400/15 text-green-400">
              <IconTools size={20} />
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-heading font-extrabold uppercase tracking-wider">
                Herramientas aisladas e instrumental de diagnóstico
              </span>
              <p className="text-[11px] text-foreground/60 leading-relaxed">
                Revisamos y probamos el sistema antes y después de cada
                instalación automotriz.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto px-3 py-2 rounded-full bg-red-500/10 border border-red-500/20">
            <IconBolt size={14} className="text-red-400" />
            <span className="text-[11px] font-heading font-extrabold uppercase tracking-wider text-red-400">
              Cableado aislado y protegido
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
