import type { Page } from "@payload-types";
import { getPayloadClient } from "./payload";

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "pages",
    where: {
      slug: { equals: slug },
      _status: { equals: "published" },
    },
    limit: 1,
    depth: 1,
  });
  return docs[0] ?? null;
}

export async function getPublishedPages(): Promise<Page[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "pages",
    where: { _status: { equals: "published" } },
    sort: "title",
    limit: 100,
    depth: 1,
  });
  return docs;
}
