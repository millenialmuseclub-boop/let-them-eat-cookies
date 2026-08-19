// Curated Kitchen commerce entity. Per master spec §25, Cookies reuses Cake's flat, proven
// AffiliateProduct shape (single offer per product, network/url/active directly on the product)
// rather than Ramen's richer nested offers[] array -- the pragmatic V1 decision documented in the
// master spec, not a simplification made ad hoc here. `apps`/`contexts` still exist so this file
// stays filterable the same way both other apps' catalogs are.

export type ProductCategory = 'bakeware' | 'mixing-prep' | 'cookie-tools' | 'ingredients-pantry' | 'chocolate-decorating' | 'serving-gifting' | 'storage' | 'books'

export type AffiliateNetwork = 'shopmy' | 'ltk' | 'pending'

export type LetThemEatApp = 'cake' | 'ramen' | 'cookies'

export interface AffiliateProduct {
  /** Stable semantic product id -- never a list index/number. */
  id: string
  name: string
  brand?: string
  category: ProductCategory
  description: string
  editorialNote?: string
  url?: string
  network: AffiliateNetwork
  /** True only for a real, verified, user-supplied URL. A product with no verified URL yet
      (imported from the family master as a gap, or awaiting a new link) is false and renders
      "Coming Soon," never a link. */
  active: boolean
  /** True only when imported from the family master flagged needs-verification -- must never
      render as a clickable live link even if a URL happens to be present. */
  needsVerification?: boolean
  apps: LetThemEatApp[]
  /** Contexts this product should surface in beyond the general Curated Kitchen catalog, e.g. Workshop Lab slugs. */
  contexts?: string[]
  /** Which family app this product/link was originally sourced in -- preserved per the commerce
      integrity rule (never fabricate, always preserve source/verification metadata). */
  sourceApp: LetThemEatApp
}
