import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Product, CreateProductDTO } from '../../../types'
import { useProducts } from '../../../hooks'
import { Input, Textarea, Select, Button } from '../../../components/ui'
import { cn } from '../../../lib/utils'
import {
  brandOptions,
  categoryOptions,
  targetMarketOptions,
  seasonOptions,
} from '../../../lib/productOptions'
interface ProductFormProps {
  product?: Product //create/edit
}

interface FormFields {
  name: string
  productCode: string
  description: string
  brand: string
  category: string
  targetMarket: string
  season: string
}

interface FormErrors {
  name?: string
  productCode?: string
  description?: string
  brand?: string
  category?: string
  targetMarket?: string
  season?: string
}

const initialFields: FormFields = {
  name: '',
  productCode: '',
  description: '',
  brand: '',
  category: '',
  targetMarket: '',
  season: '',
}



interface ValidationRule {
  field: keyof FormFields
  message: string
  trim?: boolean
}

const validationRules: ValidationRule[] = [
  { field: 'name', message: 'Product name is required', trim: true },
  { field: 'productCode', message: 'Product code is required', trim: true },
  { field: 'description', message: 'Description is required', trim: true },
  { field: 'brand', message: 'Brand is required' },
  { field: 'category', message: 'Category is required' },
  { field: 'targetMarket', message: 'Target market is required' },
  { field: 'season', message: 'Season is required' },
]

const validate = (fields: FormFields): FormErrors => {
  return validationRules.reduce<FormErrors>((errors, rule) => {
    const value = fields[rule.field]
    const isEmpty = rule.trim ? !value.trim() : !value
    if (isEmpty) errors[rule.field] = rule.message
    return errors
  }, {})
}

export default function ProductForm({ product }: ProductFormProps) {
  const navigate = useNavigate()
  const { createProduct, updateProduct } = useProducts({ fetch: false })
  const isEditing = !!product

  const [fields, setFields] = useState<FormFields>(
    product
      ? {
          name: product.name,
          productCode: product.productCode,
          description: product.description,
          brand: product.brand,
          category: product.category,
          targetMarket: product.targetMarket,
          season: product.season,
        }
      : initialFields,
  )

  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (field: keyof FormFields, value: string) => {
    setFields(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
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
      if (isEditing) {
        await updateProduct(product.id, fields)
        navigate(`/products/${product.id}`)
      } else {
        const newProduct = await createProduct(fields as CreateProductDTO)
        navigate(`/products/${newProduct.id}`)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="bg-surface border border-border rounded-lg p-6 space-y-5">

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Product name"
            placeholder="e.g. Merino Wool Coat"
            value={fields.name}
            onChange={e => handleChange('name', e.target.value)}
            error={errors.name}
          />
          <Input
            label="Product code"
            placeholder="e.g. MWC-001"
            value={fields.productCode}
            onChange={e => handleChange('productCode', e.target.value)}
            error={errors.productCode}
          />
        </div>

        <Textarea
          label="Description"
          placeholder="Describe the product..."
          rows={4}
          value={fields.description}
          onChange={e => handleChange('description', e.target.value)}
          error={errors.description}
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Brand"
            placeholder="Select brand"
            options={brandOptions}
            value={fields.brand}
            onChange={e => handleChange('brand', e.target.value)}
            error={errors.brand}
          />
          <Select
            label="Category"
            placeholder="Select category"
            options={categoryOptions}
            value={fields.category}
            onChange={e => handleChange('category', e.target.value)}
            error={errors.category}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Target market"
            placeholder="Select target market"
            options={targetMarketOptions}
            value={fields.targetMarket}
            onChange={e => handleChange('targetMarket', e.target.value)}
            error={errors.targetMarket}
          />
          <Select
            label="Season"
            placeholder="Select season"
            options={seasonOptions}
            value={fields.season}
            onChange={e => handleChange('season', e.target.value)}
            error={errors.season}
          />
        </div>

        <div className={cn('flex items-center gap-3 pt-2 border-t border-border')}>
          <Button
            variant="ghost"
            onClick={() => navigate(isEditing ? `/products/${product.id}` : '/products')}
          >
            Cancel
          </Button>
          <Button
            loading={submitting}
            onClick={handleSubmit}
          >
            {isEditing ? 'Save changes' : 'Create product'}
          </Button>
        </div>

      </div>
    </div>
  )
}