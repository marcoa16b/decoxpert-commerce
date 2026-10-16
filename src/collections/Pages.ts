import type { CollectionBeforeValidateHook, CollectionConfig } from 'payload'

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const generateSlug: CollectionBeforeValidateHook = ({ data }) => {
  if (data && !data.slug && typeof data.title === 'string') {
    data.slug = slugify(data.title)
  }
  return data
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Página',
    plural: 'Páginas',
  },
  admin: {
    group: 'Páginas legales',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    listSearchableFields: ['title', 'slug'],
    description:
      'Páginas institucionales y legales: privacidad, políticas de instalación y términos.',
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [generateSlug],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description:
          'Identificador para la URL. Se genera solo a partir del título si lo dejás vacío. Ej: "politica-de-privacidad".',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Resumen',
      admin: {
        description: 'Texto corto que se usa como meta descripción y en listados.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenido',
      required: true,
    },
  ],
}
