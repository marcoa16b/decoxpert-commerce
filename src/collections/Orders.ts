import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    singular: 'Pedido',
    plural: 'Pedidos',
  },
  admin: {
    group: 'Ventas',
    useAsTitle: 'orderNumber',
    defaultColumns: [
      'orderNumber',
      'customer.name',
      'status',
      'total',
      'paymentStatus',
      'createdAt',
    ],
    listSearchableFields: ['orderNumber', 'customer.name', 'customer.phone'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      label: 'Número de pedido',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Se genera automáticamente. Formato: DX-YYYYMMDD-NNN.',
        readOnly: true,
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Cliente',
          fields: [
            {
              name: 'customer',
              type: 'group',
              label: 'Datos del cliente',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Nombre',
                  required: true,
                },
                {
                  name: 'phone',
                  type: 'text',
                  label: 'Teléfono (WhatsApp)',
                  required: true,
                },
                {
                  name: 'email',
                  type: 'text',
                  label: 'Correo electrónico',
                },
                {
                  name: 'vehicleInfo',
                  type: 'text',
                  label: 'Información del vehículo',
                  admin: {
                    description: 'Marca, modelo, año o placa del vehículo.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Productos',
          fields: [
            {
              name: 'items',
              type: 'array',
              label: 'Productos',
              required: true,
              minRows: 1,
              fields: [
                {
                  name: 'productTitle',
                  type: 'text',
                  label: 'Producto',
                  required: true,
                  admin: {
                    description:
                      'Nombre del producto al momento del pedido (snapshot, no se actualiza si el producto cambia).',
                    readOnly: true,
                  },
                },
                {
                  name: 'variantTitle',
                  type: 'text',
                  label: 'Variante',
                  admin: {
                    description: 'Combinación elegida (ej: "Rojo / 64 GB").',
                    readOnly: true,
                  },
                },
                {
                  name: 'variantSku',
                  type: 'text',
                  label: 'SKU',
                  admin: {
                    readOnly: true,
                  },
                },
                {
                  name: 'quantity',
                  type: 'number',
                  label: 'Cantidad',
                  required: true,
                  min: 1,
                  defaultValue: 1,
                },
                {
                  name: 'unitPrice',
                  type: 'number',
                  label: 'Precio unitario',
                  required: true,
                  min: 0,
                },
                {
                  name: 'requiresInstallation',
                  type: 'checkbox',
                  label: 'Incluye instalación',
                  defaultValue: false,
                },
                {
                  name: 'installationPrice',
                  type: 'number',
                  label: 'Precio de instalación',
                  min: 0,
                  admin: {
                    description: '0 si no incluye instalación.',
                  },
                },
                {
                  name: 'subtotal',
                  type: 'number',
                  label: 'Subtotal',
                  required: true,
                  min: 0,
                },
              ],
            },
          ],
        },
        {
          label: 'Totales',
          fields: [
            {
              name: 'subtotal',
              type: 'number',
              label: 'Subtotal (productos)',
              required: true,
              min: 0,
            },
            {
              name: 'installationTotal',
              type: 'number',
              label: 'Total instalación',
              defaultValue: 0,
              min: 0,
            },
            {
              name: 'total',
              type: 'number',
              label: 'Total',
              required: true,
              min: 0,
            },
          ],
        },
        {
          label: 'Instalación a domicilio',
          fields: [
            {
              name: 'installationAddress',
              type: 'group',
              label: 'Dirección de instalación',
              fields: [
                {
                  name: 'street',
                  type: 'text',
                  label: 'Dirección exacta',
                  admin: {
                    description: 'Calle, número, referencias.',
                  },
                },
                {
                  name: 'city',
                  type: 'text',
                  label: 'Ciudad',
                },
                {
                  name: 'province',
                  type: 'text',
                  label: 'Provincia',
                },
                {
                  name: 'notes',
                  type: 'textarea',
                  label: 'Indicaciones adicionales',
                },
              ],
            },
            {
              name: 'scheduledDate',
              type: 'date',
              label: 'Fecha agendada',
            },
            {
              name: 'scheduledTime',
              type: 'text',
              label: 'Hora agendada',
              admin: {
                description: 'Ej: "10:00 AM", "Mañana 8-12"',
              },
            },
            {
              name: 'installationNotes',
              type: 'textarea',
              label: 'Notas internas de instalación',
            },
          ],
        },
        {
          label: 'Pago y estado',
          fields: [
            {
              name: 'status',
              type: 'select',
              label: 'Estado del pedido',
              required: true,
              defaultValue: 'pending',
              options: [
                { label: 'Pendiente (recibido por WhatsApp)', value: 'pending' },
                { label: 'Confirmado', value: 'confirmed' },
                { label: 'Agendado', value: 'scheduled' },
                { label: 'Completado', value: 'completed' },
                { label: 'Cancelado', value: 'cancelled' },
              ],
            },
            {
              name: 'paymentMethod',
              type: 'select',
              label: 'Método de pago',
              defaultValue: 'pending',
              options: [
                { label: 'Por definir', value: 'pending' },
                { label: 'Transferencia bancaria', value: 'transfer' },
                { label: 'SINPE Móvil', value: 'sinpe' },
                { label: 'Efectivo al instalar', value: 'cash_on_install' },
              ],
            },
            {
              name: 'paymentStatus',
              type: 'select',
              label: 'Estado del pago',
              required: true,
              defaultValue: 'pending',
              options: [
                { label: 'Pendiente', value: 'pending' },
                { label: 'Parcial', value: 'partial' },
                { label: 'Pagado', value: 'paid' },
              ],
            },
            {
              name: 'source',
              type: 'select',
              label: 'Origen del pedido',
              required: true,
              defaultValue: 'whatsapp',
              options: [
                { label: 'WhatsApp', value: 'whatsapp' },
                { label: 'Teléfono', value: 'phone' },
                { label: 'Presencial', value: 'walk_in' },
                { label: 'Otro', value: 'other' },
              ],
            },
            {
              name: 'notes',
              type: 'textarea',
              label: 'Notas internas',
              admin: {
                description: 'Comentarios privados del operador (no se muestran al cliente).',
              },
            },
          ],
        },
      ],
    },
  ],
}
