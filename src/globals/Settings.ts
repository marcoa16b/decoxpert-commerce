import type { GlobalConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Configuración del sitio',
  admin: {
    group: 'HOME',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contacto',
          fields: [
            {
              name: 'whatsappNumber',
              type: 'text',
              label: 'Número de WhatsApp',
              required: true,
              admin: {
                description:
                  'Número en formato internacional sin signos. Ej: 50688887777 (Costa Rica).',
              },
            },
            {
              name: 'whatsappDefaultMessage',
              type: 'textarea',
              label: 'Mensaje predeterminado de WhatsApp',
              admin: {
                description:
                  'Mensaje que se envía al iniciar una conversación desde la web. Si está vacío se usa uno genérico.',
              },
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Teléfono de contacto',
            },
            {
              name: 'email',
              type: 'text',
              label: 'Correo de contacto',
            },
            {
              name: 'address',
              type: 'textarea',
              label: 'Dirección física',
            },
          ],
        },
        {
          label: 'Horario',
          fields: [
            {
              name: 'businessHours',
              type: 'array',
              label: 'Horario de atención',
              admin: {
                description: 'Días y horarios en que se atiende al cliente.',
              },
              fields: [
                {
                  name: 'day',
                  type: 'select',
                  label: 'Día',
                  required: true,
                  options: [
                    { label: 'Lunes', value: 'monday' },
                    { label: 'Martes', value: 'tuesday' },
                    { label: 'Miércoles', value: 'wednesday' },
                    { label: 'Jueves', value: 'thursday' },
                    { label: 'Viernes', value: 'friday' },
                    { label: 'Sábado', value: 'saturday' },
                    { label: 'Domingo', value: 'sunday' },
                  ],
                },
                {
                  name: 'open',
                  type: 'text',
                  label: 'Hora de apertura',
                  admin: {
                    description: 'Ej: 08:00',
                  },
                },
                {
                  name: 'close',
                  type: 'text',
                  label: 'Hora de cierre',
                  admin: {
                    description: 'Ej: 18:00',
                  },
                },
                {
                  name: 'closed',
                  type: 'checkbox',
                  label: 'Cerrado este día',
                  defaultValue: false,
                },
              ],
            },
          ],
        },
        {
          label: 'Redes sociales',
          fields: [
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Redes sociales',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  label: 'Plataforma',
                  required: true,
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'TikTok', value: 'tiktok' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'X (Twitter)', value: 'twitter' },
                    { label: 'Otra', value: 'other' },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'URL',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Mensajes del carrito',
          fields: [
            {
              name: 'cartHeaderMessage',
              type: 'textarea',
              label: 'Encabezado del mensaje de WhatsApp',
              defaultValue:
                'Hola DecoXpert, me interesa hacer el siguiente pedido desde la tienda online:',
              admin: {
                description:
                  'Texto que aparece al inicio del mensaje de WhatsApp cuando el cliente envía el carrito.',
              },
            },
            {
              name: 'cartFooterMessage',
              type: 'textarea',
              label: 'Pie del mensaje de WhatsApp',
              defaultValue: 'Quedo atento/a a su respuesta. Gracias.',
              admin: {
                description: 'Texto que aparece al final del mensaje de WhatsApp.',
              },
            },
          ],
        },
        {
          label: 'Información legal',
          fields: [
            {
              name: 'aboutText',
              type: 'richText',
              label: 'Texto "Sobre nosotros"',
              editor: lexicalEditor(),
            },
            {
              name: 'termsAndConditions',
              type: 'richText',
              label: 'Términos y condiciones',
              editor: lexicalEditor(),
            },
            {
              name: 'privacyPolicy',
              type: 'richText',
              label: 'Política de privacidad',
              editor: lexicalEditor(),
            },
          ],
        },
      ],
    },
  ],
}