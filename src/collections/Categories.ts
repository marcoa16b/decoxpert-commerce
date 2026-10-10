import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Categoría',
    plural: 'Categorías',
  },
  admin: {
    group: 'Catálogo',
    useAsTitle: 'name',
    listSearchableFields: ['name', 'slug'],
    defaultColumns: ['name', 'parent', 'featured', 'order'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        if (data.parent && originalDoc?.id && String(data.parent) === String(originalDoc.id)) {
          throw new Error('Una categoría no puede ser padre de sí misma.')
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre',
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
        description: 'Identificador para URLs. Ej: "alarmas-para-auto"',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      label: 'Categoría padre',
      relationTo: 'categories',
      admin: {
        description: 'Dejar vacío si es una categoría principal.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Imagen',
      relationTo: 'media',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Orden',
      defaultValue: 0,
      admin: {
        description: 'Orden de aparición dentro del mismo nivel. Menor = primero.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Destacada',
      defaultValue: false,
      admin: {
        description: 'Mostrar en la navegación principal o home.',
      },
    },
  ],
}
