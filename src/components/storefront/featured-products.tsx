import { getFeaturedProducts } from "@/lib/catalog";
import { IconArrowsRightLeft, IconHandStop } from "@tabler/icons-react";
import ProductCard from "./product-card";

function PromoCard() {
  return (
    <article className="relative flex flex-col justify-end overflow-hidden rounded-2xl border border-foreground/15 bg-green-500/10 p-6">
      <div className="flex flex-col gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-400/15 text-green-400">
          <IconHandStop size={20} />
        </span>
        <h3 className="text-lg font-heading font-extrabold uppercase leading-tight">
          Paquete a domicilio
        </h3>
        <p className="text-xs leading-relaxed text-foreground/65">
          Instalamos pantalla + alarma + GPS en una sola sesión a domicilio con
          descuento especial de técnico en sitio.
        </p>
      </div>
      <a
        href="#"
        className="relative z-1 mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-xs font-heading font-extrabold uppercase tracking-wider text-white shadow-button-red transition-colors hover:bg-red-700"
      >
        <IconHandStop size={16} />
        Cotizar paquete completo
      </a>
    </article>
  );
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  if (products.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-wider">
              <span className="relative h-2 w-2 rounded-full bg-red-500" />
              Equipamiento top ventas
            </span>
            <h2 className="text-2xl font-heading font-extrabold uppercase leading-[1.05] sm:text-3xl xl:text-4xl">
              Productos con instalación disponible
            </h2>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-foreground/15 bg-card/60 p-4 backdrop-blur lg:max-w-md">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-400/15 text-green-400">
              <IconArrowsRightLeft size={20} />
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-heading font-extrabold uppercase tracking-wider">
                Modalidad de compra flexible
              </span>
              <p className="text-xs leading-relaxed text-foreground/65">
                Elige en la página de cada producto si lo quieres con o sin
                instalación en tu cochera.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          <PromoCard />
        </div>
      </div>
    </section>
  );
}
