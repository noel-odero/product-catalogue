import { useState } from 'react'
import type { Variant, CreateAssetDTO, AssetType } from '../../../types'
import { Input, Select, Textarea, Button } from '../../../components/ui'
import { cn } from '../../../lib/utils'

interface AssetUploadModalProps {
  productId: string
  variants: Variant[]
  onUpload: (dto: CreateAssetDTO) => Promise<unknown>
  onClose: () => void
}

interface UploadFields {
  title: string
  description: string
  assetType: AssetType | ''
  variantId: string
  tags: string
}

interface UploadErrors {
  title?: string
  assetType?: string
  file?: string
}

const initialFields: UploadFields = {
  title: '',
  description: '',
  assetType: '',
  variantId: '',
  tags: '',
}

const assetTypeOptions = [
  { value: 'IMAGE', label: 'Image' },
  { value: 'VIDEO', label: 'Video' },
  { value: 'DOCUMENT', label: 'Document' },
  { value: 'OTHER', label: 'Other' },
]

const validate = (fields: UploadFields, file: File | null): UploadErrors => {
  const errors: UploadErrors = {}
  if (!fields.title.trim()) errors.title = 'Title is required'
  if (!fields.assetType) errors.assetType = 'Asset type is required'
  if (!file) errors.file = 'Please select a file'
  return errors
}

export default function AssetUploadModal({
  productId,
  variants,
  onUpload,
  onClose,
}: AssetUploadModalProps) {
  const [fields, setFields] = useState<UploadFields>(initialFields)
  const [file, setFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<UploadErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const variantOptions = variants.map(v => ({
    value: v.id,
    label: v.name,
  }))

  const handleChange = (field: keyof UploadFields, value: string) => {
    setFields(prev => ({ ...prev, [field]: value }))
    if (errors[field as keyof UploadErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile)
    if (errors.file) setErrors(prev => ({ ...prev, file: undefined }))
    if (!fields.title) {
      setFields(prev => ({ ...prev, title: selectedFile.name.split('.')[0] }))
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) handleFile(dropped)
  }

  const handleSubmit = async () => {
    const validationErrors = validate(fields, file)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setSubmitting(true)
    try {
      const dto: CreateAssetDTO = {
        productId,
        variantId: fields.variantId || undefined,
        assetType: fields.assetType as AssetType,
        title: fields.title,
        description: fields.description,
        tags: fields.tags.split(',').map(t => t.trim()).filter(Boolean),
        file: file!,
      }
      await onUpload(dto)
      onClose()
    } catch (e) {
      console.error(e)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-surface border border-border rounded-xl w-full max-w-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-content-primary">Upload asset</h2>
          <button
            onClick={onClose}
            className="text-content-tertiary hover:text-content-secondary transition-colors"
          >
            <i className="ti ti-x text-base" aria-hidden="true" />
          </button>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => document.getElementById('file-input')?.click()}
          className={cn(
            'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
            dragOver
              ? 'border-content-secondary bg-elevated'
              : 'border-border hover:border-content-disabled',
          )}
        >
          <input
            id="file-input"
            type="file"
            className="hidden"
            onChange={e => {
              const selected = e.target.files?.[0]
              if (selected) handleFile(selected)
            }}
          />
          {file ? (
            <div className="flex items-center justify-center gap-2">
              <i className="ti ti-file-check text-status-published-text text-xl" aria-hidden="true" />
              <span className="text-sm text-content-primary">{file.name}</span>
            </div>
          ) : (
            <div className="space-y-1">
              <i className="ti ti-upload text-2xl text-muted" aria-hidden="true" />
              <p className="text-xs text-content-secondary">
                Drag and drop or click to select a file
              </p>
              <p className="text-xs text-content-disabled">
                Images, videos, documents supported
              </p>
            </div>
          )}
        </div>
        {errors.file && (
          <p className="text-xs text-status-rejected-text">{errors.file}</p>
        )}

        <div className="space-y-3">
          <Input
            label="Title"
            placeholder="e.g. Hero shot front"
            value={fields.title}
            onChange={e => handleChange('title', e.target.value)}
            error={errors.title}
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Asset type"
              placeholder="Select type"
              options={assetTypeOptions}
              value={fields.assetType}
              onChange={e => handleChange('assetType', e.target.value)}
              error={errors.assetType}
            />
            <Select
              label="Variant (optional)"
              placeholder="Product level"
              options={variantOptions}
              value={fields.variantId}
              onChange={e => handleChange('variantId', e.target.value)}
            />
          </div>

          <Textarea
            label="Description (optional)"
            placeholder="Describe this asset..."
            rows={2}
            value={fields.description}
            onChange={e => handleChange('description', e.target.value)}
          />

          <Input
            label="Tags (optional, comma separated)"
            placeholder="e.g. hero, front, studio"
            value={fields.tags}
            onChange={e => handleChange('tags', e.target.value)}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button loading={submitting} onClick={handleSubmit}>
            Upload asset
          </Button>
        </div>
      </div>
    </div>
  )
}