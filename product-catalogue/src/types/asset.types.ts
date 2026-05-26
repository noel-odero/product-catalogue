export type AssetType = 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'OTHER'

export type AssetStatus = 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED'

export interface Asset {
  id: string
  productId: string
  variantId?: string
  assetType: AssetType
  title: string
  description: string
  tags: string[]
  fileName: string
  fileUrl: string
  status: AssetStatus
  rejectionReason?: string
  uploadedAt: string
  statusHistory: AssetStatusEvent[]
}

export interface AssetStatusEvent {
  status: AssetStatus
  changedAt: string
  reason?: string
}

export interface CreateAssetDTO {
  productId: string
  variantId?: string
  assetType: AssetType
  title: string
  description: string
  tags: string[]
  file: File
}