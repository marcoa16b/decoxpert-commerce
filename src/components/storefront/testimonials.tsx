"use client";

import {
  IconCircleCheck,
  IconExternalLink,
  IconMapPin,
  IconStarFilled,
} from "@tabler/icons-react";
import { animate, motion, useMotionValue } from "motion/react";
import { Children, useEffect, useRef } from "react";

type Review = {
  name: string;
  location: string;
  review: string;
  highlight: string;
};

const reviews: Review[] = [
  {
    name: "Carlos M. - Toyota RAV4",
    location: "Escazú",
    review:
      "Increíble puntualidad. Vinieron a mi cochera a las 9 am con su maletín de herramientas y dejaron la pantalla Android de 10\" como si hubiera salido de concesionario. Cero cables pelados y mis botones del timón funcionan al 100%.",
    highlight: "¿Quedó como de fábrica, recomendadísimos!",
  },
  {
    name: "Renato V. - Hyundai Elantra",
    location: "Heredia",
    review:
      "Compré el GPS 4G con corte de motor y la alarma Spy. Me daba desconfianza dejar el auto en una tienda todo el día; verlo hacer en mi propio estacionamiento me dio total tranquilidad. La app móvil es súper rápida para apagar el motor.",
    highlight: "¿Atención de primera y súper honestos!",
  },
  {
    name: "Luciana F. - Nissan Frontier",
    location: "San Pedro",
    review:
      "Pedí parlantes JBL y cámara de retroceso. El técnico trajo su propia aspiradora para dejar la alfombra limpia después de trabajar. El sonido en las rutas largas cambió del cielo a la tierra.",
    highlight: "¿Sin moverte de casa es el mejor invento!",
  },
  {
    name: "Daniela P. - Mazda CX-5",
    location: "Curridabat",
    review:
      "Reservé por WhatsApp un domingo a las 11 pm y el lunes a primera hora ya tenía el técnico coordinado. Instalaron la pantalla CarPlay y calibraron el volante del mando original. Trato impecable y el auto quedó impecable.",
    highlight: "¿Atención que no se consigue ni en concesionario!",
  },
  {
    name: "Óscar R. - Suzuki Swift",
    location: "Alajuela",
    review:
      "El GPS con corte de motor me cambió la vida. Duermo tranquilo sabiendo que desde la app veo dónde está el carro en tiempo real. La instalación fue limpia y me explicaron paso a paso cómo usar cada función.",
    highlight: "¿Vale cada colón, sin exagerar!",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 shrink-0">
      {Array.from({ length: 5 }).map((_, i) => (
        <IconStarFilled
          key={i}
          size={14}
          className="text-green-400 drop-shadow-[0_0_4px_rgba(74,222,128,0.4)]"
        />
      ))}
    </div>
  );
}

function QuoteIcon() {
  return (
    <span className="absolute -top-3 right-2 text-[7rem] leading-none font-heading font-extrabold text-red-500/10 select-none pointer-events-none">
      &ldquo;
    </span>
  );
}

function TestimonialCard({ review }: { review: Review }) {
  return (
    <article className="relative flex flex-col h-full rounded-2xl border border-foreground/15 bg-gradient-to-br from-card/85 to-red-950/10 p-6 gap-5 overflow-hidden">
      <QuoteIcon />

      {/* HEADER: stars + location */}
      <header className="flex items-center justify-between relative z-1">
        <Stars />
        <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-heading font-bold text-foreground/60">
          <IconMapPin size={12} className="text-red-500" />
          {review.location}
        </span>
      </header>

      {/* QUOTE */}
      <p className="relative z-1 text-sm text-foreground/85 leading-relaxed grow">
        &ldquo;{review.review}&rdquo;
      </p>

      {/* DIVIDER */}
      <div className="h-px bg-foreground/10 relative z-1" />

      {/* AUTHOR */}
      <footer className="flex flex-col gap-2 relative z-1">
        <div className="flex items-start justify-between gap-3">
          <span className="text-xs font-heading font-extrabold uppercase leading-tight">
            {review.name}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-heading font-extrabold uppercase tracking-wider text-green-400 shrink-0">
            <IconCircleCheck size={12} stroke={2} />
            Verificado
          </span>
        </div>
        <span className="font-accent text-base text-green-400 leading-none">
          {review.highlight}
        </span>
      </footer>
    </article>
  );
}

type CarouselProps = { children: React.ReactNode };

const SPEED = 45; // px per second

function Carousel({ children }: CarouselProps) {
  const slides = Children.toArray(children);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const start = () => {
      controlsRef.current?.stop();
      const half = track.scrollWidth / 2;
      if (prefersReducedMotion || half <= 0) {
        x.set(0);
        return;
      }
      controlsRef.current = animate(x, [0, -half], {
        duration: half / SPEED,
        ease: "linear",
        repeat: Infinity,
      });
      if (pausedRef.current) controlsRef.current.pause();
    };

    start();

    const ro = new ResizeObserver(start);
    ro.observe(track);

    return () => {
      ro.disconnect();
      controlsRef.current?.stop();
    };
  }, [x]);

  const pause = () => {
    pausedRef.current = true;
    controlsRef.current?.pause();
  };
  const resume = () => {
    pausedRef.current = false;
    controlsRef.current?.play();
  };

  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <motion.div ref={trackRef} style={{ x }} className="flex">
        {[slides, slides].flatMap((copy, copyIdx) =>
          copy.map((slide, i) => (
            <div
              key={`${copyIdx}-${i}`}
              aria-hidden={copyIdx === 1}
              className="shrink-0 w-[85vw] sm:w-[400px] lg:w-[420px] mr-4"
            >
              {slide}
            </div>
          ))
        )}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col gap-5 mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wider font-heading font-bold text-red-500">
              Experiencias reales
            </span>
            <h2 className="text-2xl sm:text-3xl xl:text-4xl leading-[1.05] uppercase font-extrabold font-heading">
              Clientes satisfechos en cochera
            </h2>
          </div>

          {/* Right group: rating + button */}
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <div className="flex items-center gap-2">
              <Stars />
              <span className="text-xs font-heading font-bold text-foreground/70">
                <strong className="text-foreground">4.9/5</strong>
                <span className="text-foreground/50 ml-1">Google Reviews</span>
              </span>
            </div>
            <a
              href="https://www.google.com/maps/place/Decoxpert+Autodecoraci%C3%B3n+CR/@9.7590347,-84.4552704,11.36z/data=!4m6!3m5!1s0x8fa1afa72d73674b:0x79364fe4eaea4f3a!8m2!3d9.7220811!4d-84.3962535!16s%2Fg%2F11nw52nddj?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-green-400/60 bg-green-400/5 hover:bg-green-400 hover:border-green-400 hover:shadow-button transition-all duration-200 text-xs font-heading font-extrabold uppercase tracking-wider text-green-400 hover:text-black"
            >
              <IconStarFilled size={14} />
              Deja tu review en Google
              <IconExternalLink
                size={13}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        {/* CAROUSEL */}
        <Carousel>
          {reviews.map((review) => (
            <TestimonialCard key={review.name} review={review} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
