import HeroImage from "@/app/assets/heroimg.jpg";
import {
  IconMapPin,
  IconRosetteDiscountCheck,
  IconShieldCheck,
} from "@tabler/icons-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-20 -right-20 w-[70vw] max-w-150 aspect-square bg-radial from-red-600/40 to-background/0 blur-[72px] rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-[70vw] max-w-150 aspect-square bg-radial from-green-700/40 to-background/0 blur-[72px] rounded-full" />
      </div>

      <div className="relative z-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:min-h-[calc(100dvh-14rem)]">
        {/* COLUMNA IZQUIERDA */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-xs flex items-center gap-2 bg-red-300/30 w-fit px-2.5 py-1 rounded-full uppercase font-heading font-bold tracking-wide">
              <span className="relative w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Técnicos certificados en ruta
            </span>
            <span className="font-accent text-xl leading-none text-red-400">
              Ahorra tiempo y no hagas filas en talleres!
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl xl:text-4xl leading-[1.08] uppercase font-extrabold font-heading">
            Autodecoración y{" "}
            <span className="text-red-600">equipamiento automotriz</span> a
            domicilio
          </h1>

          <p className="text-sm text-foreground/70 max-w-xl">
            Mejora la seguridad, conectividad y sonido de tu auto sin perder
            tiempo. Instalamos alarmas inteligentes, rastreo GPS 4G con apagado
            remoto, pantallas táctiles Android CarPlay y sonido premium directo
            en la cochera de tu casa u oficina.
          </p>

          <div className="flex flex-wrap gap-2">
            {[
              "#AlarmasEnCasa",
              "#GPSIndetectable",
              "#RadioAndroidCarPlay",
              "#CeroCablesSueltos",
            ].map((tag) => (
              <span
                key={tag}
                className="text-xs font-heading font-bold px-3 py-1.5 rounded-full border border-foreground/15 bg-foreground/5 text-foreground/80"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* VERIFICAR COBERTURA */}
          <div className="mt-1 rounded-2xl border border-foreground/15 bg-card/60 backdrop-blur p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <span className="flex items-center gap-2 text-xs sm:text-sm font-heading font-extrabold uppercase tracking-wider">
                <IconMapPin size={16} className="text-red-500" />
                Verificar cobertura en tu distrito
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-green-400">
                <span className="relative w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Respuesta inmediata
              </span>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 flex-1 rounded-xl border border-foreground/15 bg-background/60 px-3">
                <IconMapPin size={16} className="text-foreground/40 shrink-0" />
                <input
                  placeholder="Ingresa tu distrito, barrio o código postal..."
                  className="w-full bg-transparent outline-none text-sm py-2.5 placeholder:text-foreground/40"
                />
              </div>
              <button className="bg-red-600 hover:bg-red-700 duration-200 px-4 rounded-xl text-sm font-heading font-extrabold uppercase shadow-button-red flex items-center gap-2 shrink-0">
                <IconRosetteDiscountCheck size={18} />
                Comprobar
              </button>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="flex flex-col gap-4">
          {/* MEDIA */}
          <div className="relative rounded-2xl overflow-hidden border border-foreground/15 bg-foreground/10 aspect-video">
            <Image
              src={HeroImage}
              alt="Técnico de DecoXpert instalando una pantalla multimedia en el tablero de un vehículo"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <span className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-black/60 backdrop-blur px-3 py-1.5 text-[11px] font-heading font-bold uppercase text-foreground">
              <IconMapPin size={12} className="text-green-400" />
              Instalación a domicilio
            </span>
            <span className="absolute bottom-3 right-3 rounded-full bg-red-600 px-3 py-1.5 text-[11px] font-heading font-extrabold uppercase text-white shadow-button-red">
              Técnicos certificados
            </span>
          </div>

          {/* MÉTRICAS */}
          <div className="grid grid-cols-3 rounded-2xl border border-foreground/15 overflow-hidden divide-x divide-foreground/15">
            <div className="flex flex-col items-center gap-1 py-4 px-2 text-center">
              <span className="font-heading font-extrabold text-2xl text-red-500">
                4,850+
              </span>
              <span className="text-[10px] font-bold uppercase text-foreground/60">
                Instalaciones
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 py-4 px-2 text-center">
              <span className="font-heading font-extrabold text-2xl text-green-400">
                100%
              </span>
              <span className="text-[10px] font-bold uppercase text-foreground/60">
                Conexiones protegidas
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 py-4 px-2 text-center">
              <span className="font-heading font-extrabold text-2xl">
                12 m
              </span>
              <span className="text-[10px] font-bold uppercase text-foreground/60">
                Garantía real
              </span>
            </div>
          </div>

          {/* AVISO GARANTÍA */}
          <div className="flex items-start gap-3 rounded-2xl border border-foreground/15 bg-card/60 p-3.5">
            <IconShieldCheck size={22} className="text-green-400 shrink-0" />
            <p className="text-xs text-foreground/70 leading-relaxed">
              <span className="font-bold text-foreground">
                Instalación profesional y segura:
              </span>{" "}
              hacemos las conexiones necesarias con cableado aislado, protegido
              y bien organizado, respetando la configuración de fábrica de tu
              marca y modelo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
