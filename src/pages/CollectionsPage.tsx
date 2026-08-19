import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { COLLECTIONS } from '../lib/data'

export function CollectionsPage() {
  useDocumentTitle('Curated Collections')
  return (
    <main className="page-container">
      <h1>Curated Collections</h1>
      <div className="collections-grid">
        {COLLECTIONS.map((collection) => (
          <Link to={`/collections/${collection.id}`} className="collection-card" key={collection.id}>
            <h2>{collection.title}</h2>
            <p>{collection.description}</p>
            <span className="collection-preview-count">{collection.cookieIds.length} cookies</span>
          </Link>
        ))}
      </div>
    </main>
  )
}
