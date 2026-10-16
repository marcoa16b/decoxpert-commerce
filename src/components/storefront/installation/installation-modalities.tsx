import { IconTools, IconTruckDelivery } from "@tabler/icons-react";
import Link from "next/link";

const modes = [
  {
    title: "Solo envío",
    description:
      "Te enviamos el producto con su arnés e instrucciones a cualquier parte del país. Vos lo instalás a tu ritmo.",
    accent: "border-foreground/15 bg-card/60",
    badge: "text-foreground/70 bg-foreground/5",
    icon: <IconTruckDelivery size={22} stroke={1.5} />,
  },
  {
    title: "+ Instalación a domicilio",
    description:
      "Un técnico certificado lo deja instalado, probado y con garantía escrita en la cochera de tu casa u oficina.",
    accent: "border-green-500/30 bg-green-500/10",
    badge: "text-green-400 bg-green-400/10",
    icon: <IconTools size={22} stroke={1.5} />,
  },
];

export default function InstallationModalities() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center gap-3 text-center">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-green-400">
            Modalidad de compra flexible
          </span>
          <h2 className="text-2xl font-heading font-extrabold uppercase leading-[1.05] sm:text-3xl xl:text-4xl">
            Con o sin instalación, vos decidís
          </h2>
          <p className="text-sm leading-relaxed text-foreground/70">
            En la página de cada producto elegís cómo lo querés recibir. El
            precio de la instalación se muestra aparte, sin sorpresas.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {modes.map((mode) => (
            <article
              key={mode.title}
              className={`flex flex-col gap-3 rounded-2xl border p-6 ${mode.accent}`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${mode.badge}`}
              >
                {mode.icon}
              </span>
              <h3 className="text-base font-heading font-extrabold uppercase leading-tight">
                {mode.title}
              </h3>
              <p className="text-xs leading-relaxed text-foreground/70">
                {mode.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/catalogo"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-foreground/15 bg-card/60 px-6 py-3 text-xs font-heading font-extrabold uppercase tracking-wider text-foreground/80 transition-colors hover:border-foreground/40 hover:text-foreground"
          >
            Explorar el catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}
