import { useParams, Navigate } from 'react-router-dom'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { COLLECTIONS_BY_ID, getCookiesByIds } from '../lib/data'
import { CookieCard } from '../components/CookieCard'
import { FloatingBackButton } from '../components/FloatingBackButton'

export function CollectionDetailPage() {
  const { collectionId = '' } = useParams()
  const collection = COLLECTIONS_BY_ID.get(collectionId)
  useDocumentTitle(collection?.title ?? 'Collection')

  if (!collection) return <Navigate to="/collections" replace />
  const cookies = getCookiesByIds(collection.cookieIds)

  return (
    <main className="page-container">
      <FloatingBackButton />
      <h1>{collection.title}</h1>
      <p>{collection.description}</p>
      <div className="cookie-grid">
        {cookies.map((cookie) => (
          <CookieCard cookie={cookie} key={cookie.id} />
        ))}
      </div>
    </main>
  )
}
