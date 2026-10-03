import type { CollectionConfig } from 'payload'

const slugify = (value: string): string =>
  value
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

export const ProductAttributes: CollectionConfig = {
  slug: 'product-attributes',
  labels: {
    singular: 'Atributo de producto',
    plural: 'Atributos de producto',
  },
  admin: {
    group: 'CATALOG',
    useAsTitle: 'name',
    defaultColumns: ['name', 'uiType', 'required', 'slug'],
    listSearchableFields: ['name', 'slug'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.options && Array.isArray(data.options)) {
          data.options = data.options.map((opt: { label?: string; value?: string }) => {
            const label = opt.label || ''
            return {
              ...opt,
              value: opt.value && opt.value.trim() ? slugify(opt.value) : slugify(label),
            }
          })
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
      admin: {
        description: 'Nombre visible para el cliente. Ej: "Color", "Capacidad", "Modelo"',
      },
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Identificador técnico único. Se usa en código. Ej: "color", "capacidad"',
      },
    },
    {
      name: 'uiType',
      type: 'select',
      label: 'Tipo de selector',
      required: true,
      defaultValue: 'dropdown',
      options: [
        { label: 'Desplegable (Dropdown)', value: 'dropdown' },
        { label: 'Botones de opción (Radio)', value: 'radio' },
        { label: 'Muestra de color (Swatch)', value: 'swatch' },
        { label: 'Botones de color (Button)', value: 'button' },
      ],
      admin: {
        description:
          'Define cómo se muestra este atributo en la tienda. La UI del storefront solo soporta estos 4 tipos.',
      },
    },
    {
      name: 'options',
      type: 'array',
      label: 'Opciones',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Etiqueta',
          required: true,
          admin: {
            description: 'Texto que verá el cliente. Ej: "Rojo", "64 GB"',
          },
        },
        {
          name: 'value',
          type: 'text',
          label: 'Valor (slug)',
          admin: {
            description:
              'Identificador técnico. Si se deja vacío se genera automáticamente desde la etiqueta.',
          },
        },
      ],
    },
    {
      name: 'required',
      type: 'checkbox',
      label: 'Obligatorio',
      defaultValue: false,
      admin: {
        description: 'Si está activo, el cliente debe elegir una opción antes de agregar al carrito.',
      },
    },
    {
      name: 'description',
      type: 'text',
      label: 'Descripción',
      admin: {
        description: 'Texto de ayuda para el operador (no se muestra al cliente).',
      },
    },
  ],
}