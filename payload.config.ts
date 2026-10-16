import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'
import { Media } from './src/collections/Media'
import { Categories } from './src/collections/Categories'
import { ProductAttributes } from './src/collections/ProductAttributes'
import { Products } from './src/collections/Products'
import { Orders } from './src/collections/Orders'
import { Pages } from './src/collections/Pages'
import { Settings } from './src/globals/Settings'

const USR = {
  slug: 'users',
  label: 'Users',
  admin: {
    group: 'HOME',
  },
  fields: [],
}

export default buildConfig({
  editor: lexicalEditor(),

  collections: [
    Categories,
    ProductAttributes,
    Products,
    Orders,
    Pages,
    Media,
  ],

  globals: [Settings],

  secret: process.env.PAYLOAD_SECRET || '',

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),

  sharp,

  plugins: [
    seoPlugin({
      collections: ['products', 'categories', 'pages'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `DecoXpert — ${doc?.title || doc?.name || 'Inicio'}`,
      generateDescription: ({ doc }) =>
        doc?.shortDescription ||
        (typeof doc?.description === 'string' ? doc.description : undefined),
    }),
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || 'auto',
        endpoint: process.env.S3_ENDPOINT || '',
        forcePathStyle: true,
      },
    }),
  ],
})
