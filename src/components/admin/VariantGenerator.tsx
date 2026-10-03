'use client'

import React, { useEffect, useState } from 'react'
import { Button, useField, useDocumentInfo } from '@payloadcms/ui'

type AttributeOption = { label: string; value: string }

type Attribute = {
  id: string | number
  name: string
  options: AttributeOption[]
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

type Combination = { attribute: number | string; value: string; label: string }

export const VariantGenerator: React.FC<{
  field: {
    name: string
    label?: string
    admin?: Record<string, unknown>
    path: string
  }
}> = ({ field }) => {
  const baseSkuField = useField<string>({ path: 'sku' })
  const variantsField = useField<unknown[]>({ path: field.path })
  const { id } = useDocumentInfo()

  const [attributes, setAttributes] = useState<Attribute[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      if (!id) {
        if (!cancelled) setAttributes([])
        return
      }
      setLoading(true)
      try {
        const res = await fetch(`/api/products/${id}?depth=1&draft=true&trash=true`, {
          credentials: 'include',
        })
        if (!res.ok) throw new Error('fetch failed')
        const data = await res.json()
        const rel = data?.attributes
        if (!Array.isArray(rel)) {
          if (!cancelled) setAttributes([])
          return
        }
        const list: Attribute[] = []
        for (const item of rel) {
          if (item && typeof item === 'object' && Array.isArray(item.options)) {
            list.push({ id: item.id, name: item.name, options: item.options })
          }
        }
        if (!cancelled) setAttributes(list)
      } catch {
        if (!cancelled) setAttributes([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [id])

  const variantCount = attributes.reduce(
    (acc, a) => acc * Math.max(1, a.options.length),
    1,
  )

  const handleGenerate = () => {
    if (attributes.length === 0) return

    const baseSku = (baseSkuField.value as string) || 'PROD'
    const newVariants: unknown[] = []

    const build = (idx: number, current: Combination[]) => {
      if (idx === attributes.length) {
        const sku = [baseSku, ...current.map((c) => slugify(c.label))]
          .join('-')
          .toUpperCase()
        newVariants.push({
          sku,
          attributeValues: current.map((c) => ({
            attribute: c.attribute,
            value: c.value,
            label: c.label,
          })),
          stock: 0,
          active: true,
        })
        return
      }
      const attr = attributes[idx]
      for (const opt of attr.options) {
        build(idx + 1, [...current, { attribute: attr.id, value: opt.value, label: opt.label }])
      }
    }

    build(0, [])

    const existing = (variantsField.value as unknown[]) || []
    variantsField.setValue([...existing, ...newVariants])
  }

  if (attributes.length === 0) {
    return (
      <div
        style={{
          padding: 16,
          marginBottom: 16,
          background: 'var(--theme-elevation-50)',
          border: '1px solid var(--theme-elevation-100)',
          borderRadius: 4,
          fontSize: 14,
        }}
      >
        <strong>Generador de combinaciones:</strong> primero asigne atributos al producto
        (tab &ldquo;Atributos&rdquo;) para poder generar las variantes.
      </div>
    )
  }

  return (
    <div
      style={{
        padding: 16,
        marginBottom: 16,
        background: 'var(--theme-elevation-50)',
        border: '1px solid var(--theme-elevation-100)',
        borderRadius: 4,
      }}
    >
      <div style={{ marginBottom: 8, fontWeight: 600 }}>
        Generador de combinaciones
      </div>
      <div style={{ marginBottom: 8, fontSize: 14 }}>
        Atributos:{' '}
        {attributes.map((a) => `${a.name} (${a.options.length})`).join(' × ')} ={' '}
        <strong>{variantCount}</strong> variantes
      </div>
      <Button onClick={handleGenerate} disabled={loading}>
        {`Generar ${variantCount} variantes`}
      </Button>
      <div style={{ marginTop: 8, fontSize: 12, color: '#888' }}>
        Las nuevas variantes se agregan a las existentes. Puede editar cada una después.
      </div>
    </div>
  )
}