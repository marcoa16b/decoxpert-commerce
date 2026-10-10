import HeroImage from "@/app/assets/heroimg.jpg";
import {
  IconBulbFilled,
  IconDeviceTablet,
  IconSatellite,
  IconShieldHalfFilled,
  IconVolume,
} from "@tabler/icons-react";
import Image from "next/image";
import type { ReactNode } from "react";

type Category = {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
};

const categories: Category[] = [
  {
    title: "Alarmas & Seguridad",
    description: "Sensores dobles, pánico y sirenas",
    icon: <IconShieldHalfFilled size={18} stroke={1.5} />,
    href: "/categoria/alarmas-seguridad",
  },
  {
    title: "GPS Satelital con App",
    description: "Corte de motor desde el celular",
    icon: <IconSatellite size={18} stroke={1.5} />,
    href: "/categoria/gps-satelital",
  },
  {
    title: "Pantallas CarPlay",
    description: "Android 13, IPS, QLED & 4K",
    icon: <IconDeviceTablet size={18} stroke={1.5} />,
    href: "/categoria/pantallas-carplay",
  },
  {
    title: "Audio High Fidelity",
    description: "Componentes, bajos & amplis",
    icon: <IconVolume size={18} stroke={1.5} />,
    href: "/categoria/audio-high-fidelity",
  },
  {
    title: "LED & Accesorios",
    description: "Cámaras 360°, turbo LED & DVR",
    icon: <IconBulbFilled size={18} stroke={1.5} />,
    href: "/categoria/led-accesorios",
  },
];

export default function Categories() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wider font-heading font-bold text-red-500">
              Catálogo especializado
            </span>
            <h2 className="text-2xl sm:text-3xl xl:text-4xl leading-[1.05] uppercase font-extrabold font-heading">
              Categorías principales
            </h2>
          </div>
          <p className="text-sm text-foreground/70 lg:max-w-md lg:text-right">
            Sistemas integrados diseñados para conservar la estética y la
            garantía eléctrica original de tu auto.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <a
              key={category.title}
              href={category.href}
              className="group relative flex flex-col justify-end rounded-2xl overflow-hidden border border-foreground/15 aspect-[4/3] sm:aspect-[3/4] sm:min-h-65"
            >
              <Image
                src={HeroImage}
                alt={category.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

              <div className="relative z-1 flex flex-col gap-3 p-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-600 text-white shadow-button-red">
                  {category.icon}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-heading font-extrabold uppercase leading-tight">
                    {category.title}
                  </h3>
                  <p className="text-[11px] text-foreground/70 leading-snug">
                    {category.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
