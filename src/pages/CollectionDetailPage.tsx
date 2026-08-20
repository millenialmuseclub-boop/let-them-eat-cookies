import { useParams, Navigate } from 'react-router-dom'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { COLLECTIONS_BY_ID, getCookiesByIds } from '../lib/data'
import { CookieCard } from '../components/CookieCard'
import { FloatingBackButton } from '../components/FloatingBackButton'
import { PageHeroBand } from '../components/PageHeroBand'
import { getCollectionFlagshipCookieId, getCookieImage } from '../lib/images'

export function CollectionDetailPage() {
  const { collectionId = '' } = useParams()
  const collection = COLLECTIONS_BY_ID.get(collectionId)
  useDocumentTitle(collection?.title ?? 'Collection')

  if (!collection) return <Navigate to="/collections" replace />
  const cookies = getCookiesByIds(collection.cookieIds)
  const flagshipId = getCollectionFlagshipCookieId(collection.id)

  return (
    <main className="page-container">
      <FloatingBackButton />
      <PageHeroBand
        image={flagshipId ? getCookieImage(flagshipId) : undefined}
        eyebrow="Curated Collection"
        title={collection.title}
        description={collection.description}
      />
      <div className="cookie-grid">
        {cookies.map((cookie) => (
          <CookieCard cookie={cookie} key={cookie.id} />
        ))}
      </div>
    </main>
  )
}
