import LogoImage from "@/app/assets/Logo.png";
import Image from "next/image";
import Link from "next/link";

type FooterLink = { label: string; href: string; highlight?: boolean };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Seguridad & GPS",
    links: [
      { label: "Alarmas con Sensor de Golpe", href: "#" },
      { label: "GPS Tracker en Tiempo Real", href: "#" },
      { label: "Corte de Combustible Remoto", href: "#" },
      { label: "Cámaras DVR Dashboard", href: "#" },
    ],
  },
  {
    title: "Multimedia",
    links: [
      { label: "Pantallas Android 13 CarPlay", href: "#" },
      { label: "Parlantes Componentes", href: "#" },
      { label: "Subwoofers Amplificados", href: "#" },
      { label: "Insonorización Acústica", href: "#" },
    ],
  },
  {
    title: "Atención & Reserva",
    links: [
      { label: "Mapa de Cobertura Express", href: "/zonas-de-cobertura" },
      { label: "Agendar Técnico a Casa", href: "/instalacion-a-domicilio" },
      { label: "Seguimiento de Orden", href: "#" },
      { label: "Canal VIP WhatsApp", href: "#", highlight: true },
    ],
  },
];

const legalLinks = [
  { label: "Términos de Garantía", href: "/paginas/terminos-de-garantia" },
  { label: "Políticas de Instalación", href: "/paginas/politicas-de-instalacion" },
  { label: "Términos y Condiciones", href: "/paginas/terminos-y-condiciones" },
  { label: "Privacidad", href: "/paginas/politica-de-privacidad" },
];

export default function Footer() {
  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.1fr]">
          {/* BRAND */}
          <div className="flex flex-col gap-4 max-w-sm">
            <Image
              src={LogoImage}
              alt="DecoXpert Logo"
              className="max-w-36"
            />
            <p className="text-sm text-foreground/65 leading-relaxed">
              Especialistas en equipamiento premium, car audio de alta
              fidelidad, telemetría GPS y dashboards inteligentes con
              instalación profesional a tu puerta.
            </p>
            <span className="font-accent text-lg text-green-400 leading-none">
              Instalación 100% Sin Cable Suelto Garantizada
            </span>
          </div>

          {/* LINK COLUMNS */}
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <h3 className="text-xs font-heading font-extrabold uppercase tracking-wider">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`text-sm transition-colors ${
                        link.highlight
                          ? "text-green-400 hover:text-green-300"
                          : "text-foreground/60 hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 flex flex-col gap-4 border-t border-foreground/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-foreground/50">
            © 2025 DecoXpert Auto Decoración a Domicilio. Todos los derechos
            reservados.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs text-foreground/50 hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
