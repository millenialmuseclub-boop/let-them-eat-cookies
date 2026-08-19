import { productsForContext } from '../lib/data'
import { AffiliateDisclosure } from './AffiliateDisclosure'

export function ContextualCuratedKitchen({ context, title }: { context: string; title: string }) {
  const products = productsForContext(context)
  if (products.length === 0) return null

  return (
    <section className="contextual-curated-kitchen" aria-label={title}>
      <h2>{title}</h2>
      <div className="curated-kitchen-grid curated-kitchen-grid-compact">
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
      <AffiliateDisclosure />
    </section>
  )
}
