import { useDocumentTitle } from '../lib/useDocumentTitle'
import { PRODUCTS } from '../lib/data'
import { AffiliateDisclosure } from '../components/AffiliateDisclosure'
import type { ProductCategory } from '../types/product'

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  bakeware: 'Bakeware',
  'mixing-prep': 'Mixing & Prep',
  'cookie-tools': 'Cookie Tools',
  'ingredients-pantry': 'Ingredients & Pantry',
  'chocolate-decorating': 'Chocolate & Decorating',
  'serving-gifting': 'Serving & Gifting',
  storage: 'Storage',
  books: 'Books',
}

export function CuratedKitchenPage() {
  useDocumentTitle('Curated Kitchen')
  const cookiesProducts = PRODUCTS.filter((p) => p.apps.includes('cookies'))
  const categories = (Object.keys(CATEGORY_LABELS) as ProductCategory[]).filter((cat) =>
    cookiesProducts.some((p) => p.category === cat)
  )

  return (
    <main className="page-container">
      <h1>Curated Kitchen</h1>
      <p>Tools and ingredients we actually recommend, organized by what you're baking.</p>
      {categories.map((category) => {
        const products = cookiesProducts.filter((p) => p.category === category)
        return (
          <section className="curated-kitchen-category" key={category} aria-labelledby={`kitchen-${category}`}>
            <h2 id={`kitchen-${category}`}>{CATEGORY_LABELS[category]}</h2>
            <div className="curated-kitchen-grid">
              {products.map((product) => (
                <div className="curated-kitchen-card" key={product.id}>
                  <h3>{product.name}</h3>
                  <p>{product.editorialNote ?? product.description}</p>
                  {product.active && product.url && !product.needsVerification ? (
                    <a href={product.url} target="_blank" rel="noreferrer sponsored" className="curated-kitchen-link">
                      Shop {product.name}
                    </a>
                  ) : (
                    <span className="curated-kitchen-pending">Coming Soon</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )
      })}
      <AffiliateDisclosure />
    </main>
  )
}
