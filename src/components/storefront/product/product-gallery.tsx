"use client";

import HeroImage from "@/app/assets/heroimg.jpg";
import Image from "next/image";
import { useState } from "react";

type GalleryImage = { url?: string | null; alt?: string | null };

export default function ProductGallery({
  images,
  title,
}: {
  images: GalleryImage[];
  title: string;
}) {
  const list = images.length > 0 ? images : [{ url: null, alt: title }];
  const [active, setActive] = useState(0);
  const current = list[Math.min(active, list.length - 1)] ?? list[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-foreground/15 bg-muted">
        <Image
          src={current.url ?? HeroImage}
          alt={current.alt || title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {list.length > 1 ? (
        <div className="flex flex-wrap gap-2">
          {list.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              className={`relative h-16 w-16 overflow-hidden rounded-lg border transition-colors ${
                index === active ? "border-red-500" : "border-foreground/15 hover:border-foreground/40"
              }`}
            >
              <Image
                src={image.url ?? HeroImage}
                alt={image.alt || title}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
