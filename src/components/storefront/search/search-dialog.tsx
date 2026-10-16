"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ProductSearchResult } from "@/lib/catalog";
import { formatCRC } from "@/lib/format";
import { IconArrowRight, IconLoader2, IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 250;

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const router = useRouter();
  const titleId = useId();

  useEffect(() => {
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      abortRef.current?.abort();
    };
  }, []);

  const runSearch = (value: string) => {
    const term = value.trim();

    abortRef.current?.abort();
    if (debounceRef.current) window.clearTimeout(debounceRef.current);

    if (term.length < MIN_QUERY_LENGTH) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    abortRef.current = controller;

    debounceRef.current = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(term)}`,
          { signal: controller.signal },
        );
        const data = (await response.json()) as {
          results?: ProductSearchResult[];
        };
        setResults(data.results ?? []);
      } catch {
        if (!controller.signal.aborted) setResults([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, DEBOUNCE_MS);
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      abortRef.current?.abort();
      setQuery("");
      setResults([]);
      setLoading(false);
    }
  };

  const goToCatalog = () => {
    const term = query.trim();
    if (!term) return;
    setOpen(false);
    router.push(`/catalogo?q=${encodeURIComponent(term)}`);
  };

  const term = query.trim();
  const hasResults = results.length > 0;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className="mx-10 hidden w-full items-center gap-2 rounded-xl border border-foreground/20 bg-background px-2 py-1.5 text-left text-sm text-foreground/50 transition-colors hover:border-foreground/40 md:flex">
        <IconSearch size={18} className="text-foreground-primary" />
        <span className="w-full px-1">
          Alarmas, GPS, Pantallas Android, Parlantes...
        </span>
      </DialogTrigger>

      <button
        type="button"
        aria-label="Buscar productos"
        onClick={() => setOpen(true)}
        className="rounded-full border border-foreground/20 p-1.5 md:hidden"
      >
        <IconSearch size={20} />
      </button>

      <DialogContent
        aria-labelledby={titleId}
        initialFocus={inputRef}
        className="p-0"
      >
        <div className="flex items-center gap-2 border-b border-foreground/10 px-4 py-3">
          <IconSearch size={18} className="shrink-0 text-foreground/40" />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              goToCatalog();
            }}
            className="flex-1"
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                runSearch(event.target.value);
              }}
              placeholder="Buscar alarmas, GPS, pantallas..."
              className="w-full bg-transparent pr-8 text-sm outline-none placeholder:text-foreground/40"
              autoComplete="off"
            />
          </form>
          {loading ? (
            <IconLoader2 size={16} className="animate-spin text-foreground/40" />
          ) : null}
        </div>

        <DialogTitle id={titleId} className="sr-only">
          Buscar productos
        </DialogTitle>
        <DialogDescription className="sr-only">
          Escribí para buscar productos del catálogo. Los resultados aparecen a
          medida que escribís.
        </DialogDescription>

        <div className="max-h-[60vh] overflow-y-auto p-2 pb-3">
          {term.length < MIN_QUERY_LENGTH ? (
            <p className="px-3 py-8 text-center text-xs text-foreground/50">
              Escribí al menos {MIN_QUERY_LENGTH} letras para ver productos.
            </p>
          ) : !hasResults && !loading ? (
            <p className="px-3 py-8 text-center text-xs text-foreground/50">
              No encontramos productos para “{term}”.
            </p>
          ) : (
            <ul className="flex flex-col gap-0.5">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/producto/${product.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-foreground/5"
                  >
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-foreground/10 bg-muted">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.imageAlt ?? product.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : null}
                    </span>

                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      {product.categoryName ? (
                        <span className="text-[10px] font-heading font-extrabold uppercase tracking-wider text-red-500">
                          {product.categoryName}
                        </span>
                      ) : null}
                      <span className="truncate text-xs font-heading font-extrabold uppercase leading-tight">
                        {product.title}
                      </span>
                      <span className="flex items-baseline gap-1.5">
                        <span className="text-xs font-bold">
                          {formatCRC(product.price)}
                        </span>
                        {product.compareAt != null &&
                        product.compareAt > product.price ? (
                          <span className="text-[11px] line-through text-foreground/40">
                            {formatCRC(product.compareAt)}
                          </span>
                        ) : null}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {term.length >= MIN_QUERY_LENGTH ? (
          <div className="border-t border-foreground/10">
            <button
              type="button"
              onClick={goToCatalog}
              className="flex w-full items-center justify-between gap-2 px-4 py-3 text-[11px] font-heading font-extrabold uppercase tracking-wider text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              Ver todos los resultados
              <IconArrowRight size={14} />
            </button>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
