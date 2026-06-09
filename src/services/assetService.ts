import type { Asset, CreateAssetDTO, AssetStatus } from '../types'
import { mockAssets } from '../data'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

let assets: Asset[] = [...mockAssets]

const STATUS: Record<AssetStatus, AssetStatus> = {
  UPLOADED: 'UPLOADED',
  PENDING_REVIEW: 'PENDING_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  ARCHIVED: 'ARCHIVED',
}

export const assetService = {
  async find(): Promise<Asset[]> {
    await delay(500)
    return assets
  },

  async findById(id: string): Promise<Asset> {
    await delay(300)
    const asset = assets.find(a => a.id === id)
    if (!asset) throw new Error(`Asset with id ${id} not found`)
    return asset
  },

  async findByProductId(productId: string): Promise<Asset[]> {
    await delay(300)
    return assets.filter(a => a.productId === productId)
  },

  async findByVariantId(variantId: string): Promise<Asset[]> {
    await delay(300)
    return assets.filter(a => a.variantId === variantId)
  },

  async findPendingReview(): Promise<Asset[]> {
    await delay(300)
    const status: AssetStatus = STATUS.PENDING_REVIEW
    return assets.filter(a => a.status === status)
  },

  async upload(dto: CreateAssetDTO): Promise<Asset> {
    await delay(800)
    const newAsset: Asset = {
      id: `asset-${String(assets.length + 1).padStart(3, '0')}`,
      productId: dto.productId,
      variantId: dto.variantId,
      assetType: dto.assetType,
      title: dto.title,
      description: dto.description,
      tags: dto.tags,
      fileName: dto.file.name,
      fileUrl: URL.createObjectURL(dto.file),
      status: STATUS.PENDING_REVIEW,
      uploadedAt: new Date().toISOString(),
      statusHistory: [
        {
          status: STATUS.PENDING_REVIEW,
          changedAt: new Date().toISOString(),
        },
      ],
    }
    assets = [...assets, newAsset]
    return newAsset
  },

  async approve(id: string): Promise<Asset> {
    await delay(400)
    const index = assets.findIndex(a => a.id === id)
    if (index === -1) throw new Error(`Asset with id ${id} not found`)
    const updatedStatus: AssetStatus = STATUS.APPROVED
    const updated: Asset = {
      ...assets[index],
      status: updatedStatus,
      statusHistory: [
        ...assets[index].statusHistory,
        {
          status: updatedStatus,
          changedAt: new Date().toISOString(),
        },
      ],
    }
    assets = assets.map(a => a.id === id ? updated : a)
    return updated
  },

  async reject(id: string, reason: string): Promise<Asset> {
    await delay(400)
    const index = assets.findIndex(a => a.id === id)
    if (index === -1) throw new Error(`Asset with id ${id} not found`)
    const updatedStatus: AssetStatus = STATUS.REJECTED
    const updated: Asset = {
      ...assets[index],
      status: updatedStatus,
      rejectionReason: reason,
      statusHistory: [
        ...assets[index].statusHistory,
        {
          status: updatedStatus,
          changedAt: new Date().toISOString(),
          reason,
        },
      ],
    }
    assets = assets.map(a => a.id === id ? updated : a)
    return updated
  },
}