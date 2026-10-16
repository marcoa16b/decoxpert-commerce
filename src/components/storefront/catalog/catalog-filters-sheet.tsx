"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IconAdjustments } from "@tabler/icons-react";
import { useState, type ReactNode } from "react";

export default function CatalogFiltersSheet({
  count,
  children,
}: {
  count: number;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="inline-flex items-center gap-2 rounded-xl border border-foreground/15 px-3 py-2 text-[11px] font-heading font-extrabold uppercase tracking-wider text-foreground/70 transition-colors hover:border-foreground/40 hover:text-foreground">
        <IconAdjustments size={16} />
        Filtros
        {count > 0 ? (
          <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
            {count}
          </span>
        ) : null}
      </SheetTrigger>

      <SheetContent
        side="left"
        className="overflow-y-auto"
        onClickCapture={(event) => {
          if ((event.target as HTMLElement).closest("a")) setOpen(false);
        }}
      >
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
        </SheetHeader>
        <div className="px-6 pb-8">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
