<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Proyecto: DecoXpert Commerce

## Descripción del negocio
**DecoXpert** es una empresa de **autodecoración a domicilio**: vende e instala artículos para vehículos (autos/motos). Catálogo incluye alarmas, GPS, botones de encendido, luces, radios, parlantes, y artículos similares del rubro.

## Objetivo de la web
Mejorar la presencia digital de la empresa y **vender productos online**, con dos modalidades:
- **Con instalación a domicilio** (servicio core del negocio).
- **Sin instalación** (productos como accesorios o que el cliente puede instalar por su cuenta).

Algunos artículos requieren instalación obligatoria, otros son opcionales, y otros no la necesitan.

## Stack técnico
- **Next.js 16.3.6** (App Router) — `src/app/`
- **React 19.2.8**
- **Payload CMS 3.90.2** — Headless CMS embebido
- **PostgreSQL** (Neon) via `@payloadcms/db-postgres`
- **@payloadcms/plugin-seo** — SEO meta fields (title, description, image) en admin
- **@payloadcms/storage-s3** — Storage S3-compatible apuntando a **Cloudflare R2**
- **Lexical** como editor rich-text
- **Tailwind CSS 4** + `@tailwindcss/postcss`
- **TypeScript 5** (strict)
- **pnpm 11.28.0** como package manager
- **Sharp** para procesamiento de imágenes
- **ESLint 9** con `eslint-config-next` (core-web-vitals + typescript)

## Convenciones del proyecto
- Aliases: `@/*` → `./src/*`, `@payload-config` → `./payload.config.ts`
- Colecciones de Payload se definen en `src/collections/` y se importan en `payload.config.ts:9`
- App Router de Next.js en `src/app/`
- Payload Admin UI se monta en `src/app/(payload)/`
- Tienda/storefront en `src/app/(store)/`
- Types autogenerados de Payload en `payload-types.ts` (NO editar a mano)
- Variables de entorno: `DATABASE_URL`, `PAYLOAD_SECRET` (en `.env`)

## Estado actual
- Scaffold funcional verificado y dominio ecommerce en construcción.
- Colecciones en `src/collections/`: `Categories`, `ProductAttributes`, `Products`, `Orders`, `Pages` y `Media`.
- Global `Settings` en `src/globals/Settings.ts`.

## Modelo de dominio (a construir)
Entidades principales esperadas para el ecommerce:
- **Products** — artículos (alarmas, GPS, luces, radios, parlantes, etc.)
  - Campo booleano/clave para `requiereInstalacion` u opciones de instalación.
  - Variantes (modelos, capacidades, colores, etc.) según necesidad.
- **Categories** — agrupación del catálogo (Seguridad, Audio, Iluminación, etc.).
- **Orders** — pedidos con dirección de domicilio cuando hay instalación.
- **Customers / Users** — clientes (puede reutilizarse la collection `users` de Payload).
- **Installations** (opcional) — agendamiento/servicio de instalación a domicilio.
- **Pages** — landings, home, about, etc. (ya existe el slug).

## Reglas para los agentes
- Antes de escribir código de Next.js, **consultar `node_modules/next/dist/docs/`** (regla del bloque BEGIN/END arriba).
- Antes de tocar APIs de Payload, **consultar la Skill payload** para leer documentacion actualizada.
- No modificar `payload-types.ts` a mano; regenerar con `payload generate:types`.
- Las colecciones de contenido institucional usan un grupo admin descriptivo y en español (ej: `Páginas legales`); no agruparlas en un grupo genérico tipo `HOME`.
- Tailwind 4: sin `tailwind.config.js` por defecto — config via CSS en `globals.css`.
- Utilizar Openspec para el proceso de desarrollo con utilizando los subagentes.

## Almacenamiento (Cloudflare R2)
- Storage oficial: `@payloadcms/storage-s3` configurado contra Cloudflare R2 (S3-compatible).
- Variables de entorno: `S3_ENDPOINT`, `S3_REGION=auto`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_PUBLIC_URL`.
- Collection `media` (en `src/collections/Media.ts`, grupo `MEDIA`) usa el storage adapter — cuando esté activo, no se guarda nada en disco.
- `forcePathStyle: true` es necesario para R2 (virtual-hosted style no soportado en todos los endpoints R2).
