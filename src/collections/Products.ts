import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

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

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Producto',
    plural: 'Productos',
  },
  admin: {
    group: 'Catálogo',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'basePrice', 'requiresInstallation', 'published'],
    listSearchableFields: ['title', 'slug', 'sku'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (Array.isArray(data?.variants)) {
          const baseSku = (data.sku as string) || 'PROD'

          data.variants = data.variants.map(
            (variant: {
              sku?: string
              attributeValues?: Array<{ label?: string; value?: string }>
            }) => {
              let sku = variant.sku?.trim() || ''

              if (!sku && Array.isArray(variant.attributeValues)) {
                const parts = variant.attributeValues
                  .map((av) => slugify(av.label || av.value || ''))
                  .filter(Boolean)
                if (parts.length > 0) {
                  sku = [baseSku, ...parts].join('-').toUpperCase()
                }
              }

              return { ...variant, sku }
            },
          )
        }
        return data
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'title',
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
                description: 'Identificador para URLs. Ej: "alarma-x1"',
              },
            },
            {
              name: 'sku',
              type: 'text',
              label: 'SKU base',
              admin: {
                description:
                  'Código base del producto. Las variantes usan este SKU + los valores de atributos.',
              },
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              label: 'Descripción corta',
              admin: {
                description: 'Resumen de una línea que se muestra en listados y tarjetas.',
              },
            },
            {
              name: 'description',
              type: 'richText',
              label: 'Descripción completa',
              editor: lexicalEditor(),
            },
            {
              name: 'category',
              type: 'relationship',
              label: 'Categoría',
              relationTo: 'categories',
              required: true,
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'Galería de imágenes',
              minRows: 0,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  label: 'Imagen',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'alt',
                  type: 'text',
                  label: 'Texto alternativo',
                },
              ],
            },
            {
              name: 'badges',
              type: 'array',
              label: 'Badges / etiquetas',
              labels: {
                singular: 'Badge',
                plural: 'Badges',
              },
              admin: {
                description:
                  'Etiquetas de la tarjeta y la página de producto. "Promo" se muestra en rojo (ej: "Más vendido") y "Highlight" en verde (ej: "Garantía 1 año"). El descuento (-X% OFF) NO se escribe aquí: se calcula desde el precio tachado.',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Texto',
                  required: true,
                },
                {
                  name: 'style',
                  type: 'select',
                  label: 'Estilo',
                  required: true,
                  defaultValue: 'highlight',
                  options: [
                    { label: 'Promo (rojo)', value: 'promo' },
                    { label: 'Highlight (verde)', value: 'highlight' },
                    { label: 'Info (neutro)', value: 'info' },
                  ],
                },
              ],
            },
            {
              name: 'warrantyMonths',
              type: 'number',
              label: 'Garantía (meses)',
              min: 0,
              admin: {
                description:
                  'Meses de garantía ofrecidos. Se muestra en la tarjeta y la página de producto.',
              },
            },
          ],
        },
        {
          label: 'Precio',
          fields: [
            {
              name: 'basePrice',
              type: 'number',
              label: 'Precio base',
              required: true,
              min: 0,
              admin: {
                description: 'Precio por defecto del producto en colones (CRC).',
              },
            },
            {
              name: 'compareAtPrice',
              type: 'number',
              label: 'Precio tachado',
              min: 0,
              admin: {
                description:
                  'Precio anterior (opcional). Si se define y es mayor al precio base, se muestra tachado.',
              },
            },
          ],
        },
        {
          label: 'Instalación',
          fields: [
            {
              name: 'requiresInstallation',
              type: 'select',
              label: '¿Requiere instalación?',
              required: true,
              defaultValue: 'optional',
              options: [
                { label: 'Obligatoria', value: 'required' },
                { label: 'Opcional', value: 'optional' },
                { label: 'No requiere', value: 'none' },
              ],
              admin: {
                description:
                  'Obligatoria: el cliente debe elegir instalación. Opcional: puede elegir. No requiere: no se ofrece.',
              },
            },
            {
              name: 'installationPrice',
              type: 'number',
              label: 'Precio de instalación',
              min: 0,
              admin: {
                description:
                  'Costo del servicio de instalación a domicilio. Solo aplica si requiere instalación u opcional.',
              },
            },
            {
              name: 'installationNotes',
              type: 'textarea',
              label: 'Notas de instalación',
              admin: {
                description: 'Aclaraciones visibles para el cliente (ej: "Tiempo estimado: 2 horas").',
              },
            },
          ],
        },
        {
          label: 'Atributos y variantes',
          fields: [
            {
              name: 'attributes',
              type: 'relationship',
              label: 'Atributos disponibles',
              relationTo: 'product-attributes' as never,
              hasMany: true,
              admin: {
                description:
                  'Atributos que aplican a este producto (Color, Capacidad, etc.).',
              },
            },
            {
              name: 'variants',
              type: 'array',
              label: 'Variantes',
              admin: {
                description:
                  'Cada variante es una combinación vendible (ej: Color=Rojo + Talla=S). Si tiene atributos configurados arriba, use el generador para crear todas las combinaciones automáticamente.',
              },
              fields: [
                {
                  name: 'sku',
                  type: 'text',
                  label: 'SKU',
                  admin: {
                    description:
                      'Si se deja vacío, se genera automáticamente como "SKU_base - valor1 - valor2" en mayúsculas.',
                  },
                },
                {
                  name: 'attributeValues',
                  type: 'array',
                  label: 'Valores de atributos',
                  admin: {
                    description:
                      'Combinación de atributos que identifica esta variante. Use el dropdown para elegir el valor (se filtra según el atributo seleccionado).',
                  },
                  fields: [
                    {
                      name: 'attribute',
                      type: 'relationship',
                      label: 'Atributo',
                      relationTo: 'product-attributes' as never,
                      required: true,
                    },
                    {
                      name: 'value',
                      type: 'text',
                      label: 'Valor',
                      required: true,
                      admin: {
                        components: {
                          Field:
                            '@/components/admin/VariantAttributeValue#VariantAttributeValue',
                        },
                      },
                    },
                    {
                      name: 'label',
                      type: 'text',
                      label: 'Etiqueta visible',
                      admin: {
                        description: 'Texto legible (ej: "Rojo").',
                      },
                    },
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Precio e instalación (opcional)',
                  admin: {
                    initCollapsed: true,
                    description:
                      'Si se define, sobreescribe el precio base del producto.',
                  },
                  fields: [
                    {
                      name: 'priceOverride',
                      type: 'number',
                      label: 'Precio de la variante',
                      min: 0,
                      admin: {
                        description:
                          'Vacío = usa el precio base del producto.',
                      },
                    },
                    {
                      name: 'compareAtPriceOverride',
                      type: 'number',
                      label: 'Precio tachado de la variante',
                      min: 0,
                    },
                    {
                      name: 'installationPriceOverride',
                      type: 'number',
                      label: 'Precio de instalación de la variante',
                      min: 0,
                    },
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Inventario y medios',
                  admin: {
                    initCollapsed: true,
                  },
                  fields: [
                    {
                      name: 'stock',
                      type: 'number',
                      label: 'Stock disponible',
                      defaultValue: 0,
                      min: 0,
                    },
                    {
                      name: 'image',
                      type: 'upload',
                      label: 'Imagen específica',
                      relationTo: 'media',
                      admin: {
                        description:
                          'Imagen que se muestra cuando el cliente selecciona esta variante.',
                      },
                    },
                  ],
                },
                {
                  name: 'active',
                  type: 'checkbox',
                  label: 'Activa',
                  defaultValue: true,
                  admin: {
                    description: 'Si está inactiva, no se muestra aunque esté publicada.',
                  },
                },
              ],
            },
            {
              name: '_generator',
              type: 'ui',
              label: 'Generador de combinaciones',
              admin: {
                position: 'sidebar',
                components: {
                  Field:
                    '@/components/admin/VariantGenerator#VariantGenerator',
                },
              },
            },
          ],
        },
        {
          label: 'Visibilidad',
          fields: [
            {
              name: 'stock',
              type: 'number',
              label: 'Stock',
              min: 0,
              admin: {
                description:
                  'Disponibilidad del producto cuando NO tiene variantes. Vacío = sin control de stock. 0 = agotado. Si tiene variantes, el stock se controla por variante.',
              },
            },
            {
              name: 'published',
              type: 'checkbox',
              label: 'Publicado',
              defaultValue: false,
              admin: {
                description: 'Si está activo, el producto aparece en la tienda.',
              },
            },
            {
              name: 'featured',
              type: 'checkbox',
              label: 'Destacado',
              defaultValue: false,
              admin: {
                description: 'Mostrar en home o secciones destacadas.',
              },
            },
            {
              name: 'order',
              type: 'number',
              label: 'Orden',
              defaultValue: 0,
              admin: {
                description: 'Orden de aparición dentro de la categoría. Menor = primero.',
              },
            },
          ],
        },
      ],
    },
  ],
}
