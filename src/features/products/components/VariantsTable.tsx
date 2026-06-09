import { useState } from 'react'
import type { Variant, CreateVariantDTO, UpdateVariantDTO } from '../../../types'
import { cn } from '../../../lib/utils'
import { Button, EmptyState } from '../../../components/ui'
import VariantModal from './VariantModal'

interface VariantsTableProps {
  variants: Variant[]
  productId: string
  onCreateVariant: (dto: CreateVariantDTO) => Promise<Variant>
  onUpdateVariant: (id: string, dto: UpdateVariantDTO) => Promise<Variant>
  onDeleteVariant: (id: string) => Promise<void>
}

const thClass = 'text-left text-xs text-muted font-normal px-4 py-3'
const tdClass = 'px-4 py-3 text-xs text-content-secondary'
const columns = ['Name', 'Code', 'Colour', 'Size', 'Material', 'Barcode', '']

export default function VariantsTable({
  variants,
  productId,
  onCreateVariant,
  onUpdateVariant,
  onDeleteVariant,
}: VariantsTableProps) {
  const [showModal, setShowModal] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<Variant | undefined>()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleEdit = (variant: Variant) => {
    setSelectedVariant(variant)
    setShowModal(true)
  }

  const handleAdd = () => {
    setSelectedVariant(undefined)
    setShowModal(true)
  }

  const handleClose = () => {
    setSelectedVariant(undefined)
    setShowModal(false)
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await onDeleteVariant(id)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-medium text-content-primary">
          Variants
          <span className="ml-2 text-xs text-content-disabled">
            {variants.length}
          </span>
        </h2>
        <Button size="sm" onClick={handleAdd}>
          <i className="ti ti-plus text-xs" aria-hidden="true" />
          Add variant
        </Button>
      </div>

      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        {variants.length === 0 ? (
          <EmptyState
            icon="ti-color-swatch"
            title="No variants yet"
            description="Add a variant to define colours, sizes and materials."
            action={{ label: '+ Add variant', onClick: handleAdd }}
          />
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {columns.map((col, index) => (
                  <th key={index} className={thClass}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {variants.map((variant, index) => (
                <tr
                  key={variant.id}
                  className={cn(
                    'hover:bg-elevated transition-colors',
                    index !== variants.length - 1 && 'border-b border-border-subtle',
                  )}
                >
                  <td className={cn(tdClass, 'text-content-primary font-medium')}>
                    {variant.name}
                  </td>
                  <td className={tdClass}>{variant.variantCode}</td>
                  <td className={tdClass}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full border border-border"
                        style={{ backgroundColor: variant.colour.toLowerCase() }}
                      />
                      {variant.colour}
                    </div>
                  </td>
                  <td className={tdClass}>{variant.size}</td>
                  <td className={tdClass}>{variant.material}</td>
                  <td className={tdClass}>{variant.barcode ?? '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(variant)}
                        className="text-xs text-content-tertiary hover:text-content-secondary transition-colors"
                      >
                        <i className="ti ti-edit" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => handleDelete(variant.id)}
                        disabled={deletingId === variant.id}
                        className="text-xs text-content-tertiary hover:text-status-rejected-text transition-colors disabled:opacity-50"
                      >
                        <i className="ti ti-trash" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <VariantModal
          productId={productId}
          variant={selectedVariant}
          onSubmit={async (dto: CreateVariantDTO | UpdateVariantDTO) =>
            selectedVariant
              ? onUpdateVariant(selectedVariant.id, dto as UpdateVariantDTO)
              : onCreateVariant(dto as CreateVariantDTO)
          }
          onClose={handleClose}
        />
      )}
    </div>
  )
}