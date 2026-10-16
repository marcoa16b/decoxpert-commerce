import Breadcrumbs from "@/components/storefront/breadcrumbs";
import { getPageBySlug } from "@/lib/pages";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

const dateFormatter = new Intl.DateTimeFormat("es-CR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return { title: "Página no encontrada" };

  return {
    title: page.meta?.title || `${page.title} | DecoXpert`,
    description: page.meta?.description || page.excerpt || undefined,
  };
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: "Inicio", href: "/" }, { label: page.title }]}
      />

      <header className="flex flex-col gap-2 border-b border-foreground/10 pb-6">
        <span className="text-xs font-heading font-bold uppercase tracking-wider text-red-500">
          Legal
        </span>
        <h1 className="text-2xl font-heading font-extrabold uppercase leading-tight sm:text-3xl">
          {page.title}
        </h1>
        <span className="text-xs text-foreground/50">
          Última actualización: {dateFormatter.format(new Date(page.updatedAt))}
        </span>
      </header>

      <div className="rich-text mt-8">
        <RichText data={page.content} />
      </div>
    </article>
  );
}
