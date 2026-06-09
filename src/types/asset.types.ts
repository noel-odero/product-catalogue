export type AssetType = 
  | 'MAIN_IMAGE' 
  | 'VARIANT_IMAGE' 
  | 'LIFESTYLE_IMAGE' 
  | 'MARKETING_BANNER'
  | 'SIZE_GUIDE'
  | 'TECHNICAL_DOCUMENT'

export type AssetStatus = 
  | 'UPLOADED'
  |'PENDING_REVIEW' 
  | 'APPROVED' 
  | 'REJECTED'
  | 'ARCHIVED'


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
  statusHistory: AssetStatusEvent[] // track every status changed over time.
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