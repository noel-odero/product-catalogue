import { useState } from 'react'
import type { Variant, CreateVariantDTO, UpdateVariantDTO } from '../../../types'
import { Input, Button, Modal } from '../../../components/ui'
import { cn } from '../../../lib/utils'

interface VariantModalProps {
  productId: string
  variant?: Variant
  onSubmit: (dto: CreateVariantDTO | UpdateVariantDTO) => Promise<Variant>
  onClose: () => void
}

interface VariantFields {
  name: string
  variantCode: string
  colour: string
  size: string
  material: string
  barcode: string
}

interface VariantErrors {
  name?: string
  variantCode?: string
  colour?: string
  size?: string
  material?: string
}

const initialFields: VariantFields = {
  name: '',
  variantCode: '',
  colour: '',
  size: '',
  material: '',
  barcode: '',
}

interface ValidationRule {
  field: keyof VariantErrors
  message: string
}

const validationRules: ValidationRule[] = [
  { field: 'name', message: 'Variant name is required' },
  { field: 'variantCode', message: 'Variant code is required' },
  { field: 'colour', message: 'Colour is required' },
  { field: 'size', message: 'Size is required' },
  { field: 'material', message: 'Material is required' },
]

const validate = (fields: VariantFields): VariantErrors => {
  return validationRules.reduce<VariantErrors>((errors, rule) => {
    if (!fields[rule.field].trim()) errors[rule.field] = rule.message
    return errors
  }, {})
}

export default function VariantModal({
  productId,
  variant,
  onSubmit,
  onClose,
}: VariantModalProps) {
  const isEditing = !!variant

  const [fields, setFields] = useState<VariantFields>(
    variant
      ? {
          name: variant.name,
          variantCode: variant.variantCode,
          colour: variant.colour,
          size: variant.size,
          material: variant.material,
          barcode: variant.barcode ?? '',
        }
      : initialFields,
  )

  const [errors, setErrors] = useState<VariantErrors>({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (field: keyof VariantFields, value: string) => {
    setFields(prev => ({ ...prev, [field]: value }))
    if (errors[field as keyof VariantErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async () => {
    const validationErrors = validate(fields)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setSubmitting(true)
    try {
      const dto = {
        productId,
        name: fields.name,
        variantCode: fields.variantCode,
        colour: fields.colour,
        size: fields.size,
        material: fields.material,
        ...(fields.barcode.trim() && { barcode: fields.barcode }),
      }
      await onSubmit(dto)
      onClose()
    } catch (e) {
      console.error(e)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      onClose={onClose}
      maxWidth="max-w-md"
      title={isEditing ? 'Edit variant' : 'Add variant'}
    >
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Variant name"
            placeholder="e.g. Camel S"
            value={fields.name}
            onChange={e => handleChange('name', e.target.value)}
            error={errors.name}
          />
          <Input
            label="Variant code"
            placeholder="e.g. MWC-001-CAM-S"
            value={fields.variantCode}
            onChange={e => handleChange('variantCode', e.target.value)}
            error={errors.variantCode}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Colour"
            placeholder="e.g. Camel"
            value={fields.colour}
            onChange={e => handleChange('colour', e.target.value)}
            error={errors.colour}
          />
          <Input
            label="Size"
            placeholder="e.g. S, M, L, 32"
            value={fields.size}
            onChange={e => handleChange('size', e.target.value)}
            error={errors.size}
          />
        </div>

        <Input
          label="Material"
          placeholder="e.g. Merino Wool"
          value={fields.material}
          onChange={e => handleChange('material', e.target.value)}
          error={errors.material}
        />

        <Input
          label="Barcode (optional)"
          placeholder="e.g. 5901234123457"
          value={fields.barcode}
          onChange={e => handleChange('barcode', e.target.value)}
        />
      </div>

      <div className={cn('flex items-center justify-end gap-3 pt-2 border-t border-border')}>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button loading={submitting} onClick={handleSubmit}>
          {isEditing ? 'Save changes' : 'Add variant'}
        </Button>
      </div>
    </Modal>
  )
}