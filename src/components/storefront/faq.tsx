"use client";

import { useCart } from "@/components/storefront/cart/cart-context";
import { buildWhatsappHref } from "@/lib/whatsapp";
import {
  IconBrandWhatsapp,
  IconMessageCircle,
  IconPlus,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Faq = {
  question: string;
  answer: string;
};

const faqs: Faq[] = [
  {
    question: "¿Los productos son compatibles con mi carro?",
    answer:
      "Sí. Antes de instalar verificamos la marca, modelo y año de tu vehículo. Usamos los arneses y adaptadores específicos para cada modelo y realizamos las conexiones de forma segura, integrando la pantalla, alarma o GPS sin perder funciones del tablero ni de los mandos del timón.",
  },
  {
    question: "¿Qué zonas cubren para instalar a domicilio?",
    answer:
      "Cubrimos el Gran Área Metropolitana (San José, Heredia, Cartago y Alajuela) y realizamos giras a otras provincias con cita previa. Usá el verificador de cobertura del inicio o consultanos por WhatsApp para confirmar tu distrito exacto.",
  },
  {
    question: "¿Cuánto tarda la instalación en la cochera?",
    answer:
      "Depende del equipo: una alarma o GPS toma entre 45 y 90 minutos; una pantalla Android CarPlay puede llevar de 1 a 2 horas. Te confirmamos el tiempo estimado al agendar para que puedas planear tu día sin sorpresas.",
  },
  {
    question: "¿Puedo comprar solo y hacer el envío sin instalación?",
    answer:
      "Claro. En cada producto podés elegir \"Solo envío\" y te lo mandamos con su arnés y las instrucciones de instalación. Si preferís la comodidad de tenerlo funcionando, elegís \"+ Instalación\" y nuestro técnico lo deja probado en tu domicilio.",
  },
  {
    question: "¿La instalación incluye garantía?",
    answer:
      "Sí, entregamos garantía por escrito que cubre tanto el equipo como la mano de obra de la instalación. Si algo falla por nuestra cuenta, lo revisamos sin costo.",
  },
  {
    question: "¿Cómo puedo pagar? ¿Aceptan SINPE o efectivo?",
    answer:
      "Recibimos SINPE Móvil y efectivo y, en pedidos con instalación, podés pagar al finalizar la visita, una vez que verificás que todo quedó funcionando a tu gusto. En cotizaciones de monto alto puede que te solicitemos un adelanto, y te lo pedimos con transparencia: para esos trabajos compramos los repuestos e insumos del equipo por adelantado, así reservamos tu material y aseguramos el precio. El adelanto se descuenta del total y el saldo lo abonás al finalizar la instalación, cuando ya verificaste que todo funciona bien; es una forma de proteger la inversión de ambas partes.",
  },
];

function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: Faq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-2xl border bg-card/60 backdrop-blur overflow-hidden transition-colors duration-200 ${
        isOpen ? "border-red-500/40" : "border-foreground/15"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span className="text-sm font-heading font-extrabold uppercase leading-tight">
          {faq.question}
        </span>
        <span
          className={`flex items-center justify-center w-8 h-8 shrink-0 rounded-full border transition-all duration-300 ${
            isOpen
              ? "rotate-45 border-red-500 bg-red-600 text-white"
              : "border-foreground/20 text-foreground/70"
          }`}
        >
          <IconPlus size={16} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-xs text-foreground/65 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { settings } = useCart();
  const whatsappHref = buildWhatsappHref(
    settings.whatsappNumber,
    settings.whatsappDefaultMessage,
  );

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* LEFT: HEADER + SUPPORT */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider font-heading font-bold text-red-500">
                Preguntas frecuentes
              </span>
              <h2 className="text-2xl sm:text-3xl xl:text-4xl leading-[1.05] uppercase font-extrabold font-heading">
                Todo lo que necesitás saber antes de tu instalación
              </h2>
            </div>

            <p className="text-sm text-foreground/70 leading-relaxed max-w-md">
              Resolvemos las dudas más comunes sobre compatibilidad, zonas de
              cobertura, tiempos de instalación y garantía.
            </p>

            {/* SUPPORT CARD */}
            <div className="flex flex-col gap-4 rounded-2xl border border-foreground/15 bg-card/60 backdrop-blur p-5 max-w-md">
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-lg bg-green-400/15 text-green-400">
                  <IconMessageCircle size={20} />
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-heading font-extrabold uppercase tracking-wider">
                    ¿No encontrás tu respuesta?
                  </span>
                  <p className="text-xs text-foreground/65 leading-relaxed">
                    Escribinos y un técnico te responde al instante, sin
                    compromiso.
                  </p>
                </div>
              </div>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 transition-colors px-4 py-3 rounded-xl text-xs font-heading font-extrabold uppercase tracking-wider text-white shadow-button"
              >
                <IconBrandWhatsapp size={16} />
                Consultar por WhatsApp
              </a>
            </div>
          </div>

          {/* RIGHT: ACCORDION */}
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.question}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
