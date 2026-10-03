'use client'

import React, { useEffect, useState } from 'react'
import { SelectInput, useField, useAllFormFields, useDocumentInfo } from '@payloadcms/ui'

type AttributeOption = { label: string; value: string }

type Attribute = {
  id: string | number
  name: string
  slug: string
  options: AttributeOption[]
}

export const VariantAttributeValue: React.FC<{
  field: {
    name: string
    label?: string
    admin?: Record<string, unknown>
    path: string
  }
  path: string
}> = ({ field, path: fieldPath }) => {
  const { value = '', setValue } = useField<string>({ path: fieldPath })

  const [fields] = useAllFormFields()
  const { id } = useDocumentInfo()

  const attributeFieldPath = fieldPath.replace(/\.value$/, '.attribute')
  const attributeId = (fields?.[attributeFieldPath]?.value as string | number) ?? null

  const [options, setOptions] = useState<AttributeOption[]>([])
  const [, setLoading] = useState(false)
  const [attributeName, setAttributeName] = useState<string>('')

  useEffect(() => {
    let cancelled = false

    const fetchAttribute = async () => {
      if (!attributeId) {
        setOptions([])
        setAttributeName('')
        return
      }

      setLoading(true)
      try {
        const res = await fetch(
          `/api/product-attributes/${attributeId}?depth=0&draft=true&trash=true`,
          { credentials: 'include' },
        )
        if (!res.ok) throw new Error('Failed to fetch attribute')
        const data: Attribute = await res.json()
        if (!cancelled) {
          setOptions(data.options || [])
          setAttributeName(data.name || '')
        }
      } catch {
        if (!cancelled) {
          setOptions([])
          setAttributeName('')
        }
      } finally {
        if (!cancelled) {
          /* loaded */
        }
      }
    }

    void fetchAttribute()
    return () => {
      cancelled = true
    }
  }, [attributeId, id])

  const selectOptions = options.map((opt) => ({
    label: opt.label,
    value: opt.value,
  }))

  return (
    <div style={{ marginBottom: 12 }}>
      <SelectInput
        name={fieldPath}
        path={fieldPath}
        label={
          attributeName
            ? `${field.label || 'Valor'} (${attributeName})`
            : field.label || 'Valor'
        }
        options={selectOptions}
        value={value as string}
        onChange={(opt: { value: unknown } | { value: unknown }[]) => {
          const next = Array.isArray(opt) ? opt[0]?.value : opt?.value
          setValue(typeof next === 'string' ? next : '')
        }}
      />
      {!attributeId && (
        <div
          style={{
            marginTop: 4,
            fontSize: 12,
            color: '#999',
          }}
        >
          Primero seleccione un atributo.
        </div>
      )}
    </div>
  )
}