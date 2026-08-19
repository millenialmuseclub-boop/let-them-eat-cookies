import { useParams, Link, Navigate } from 'react-router-dom'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { getCookie, COOKIES, COLLECTIONS } from '../lib/data'
import { CookieHeroImage } from '../components/CookieHeroImage'
import { FlavorProfileBars } from '../components/FlavorProfileBars'
import { SavedCookieControls } from '../components/SavedCookieControls'
import { FloatingBackButton } from '../components/FloatingBackButton'

export function CookieDetailPage() {
  const { cookieId = '' } = useParams()
  const cookie = getCookie(cookieId)
  useDocumentTitle(cookie?.name ?? 'Cookie')

  if (!cookie) return <Navigate to="/encyclopedia" replace />

  const relatedCollections = COLLECTIONS.filter((c) => c.cookieIds.includes(cookie.id))
  const relatedCookies = COOKIES.filter((c) => c.id !== cookie.id && c.family === cookie.family).slice(0, 3)

  return (
    <main className="page-container cookie-detail-page">
      <FloatingBackButton />
      <CookieHeroImage cookieId={cookie.id} name={cookie.name} />

      <header className="cookie-detail-header">
        <h1>{cookie.name}</h1>
        {cookie.localName && <p className="cookie-detail-local-name">{cookie.localName}</p>}
        <p className="cookie-detail-origin">{cookie.origin}</p>
        <SavedCookieControls cookieId={cookie.id} />
      </header>

      <section className="cookie-detail-section" aria-labelledby="overview-heading">
        <h2 id="overview-heading">Overview</h2>
        <p>{cookie.description}</p>
        <FlavorProfileBars profile={cookie.flavorProfile} />
        <dl className="cookie-detail-facts">
          <dt>Family</dt><dd>{cookie.family}</dd>
          <dt>Texture</dt><dd>{cookie.textureCategory}</dd>
          <dt>Dominant Fat</dt><dd>{cookie.dominantFat}</dd>
          <dt>Sweetener</dt><dd>{cookie.sweetener}</dd>
          <dt>Leavening</dt><dd>{cookie.leavening}</dd>
        </dl>
      </section>

      <section className="cookie-detail-section" aria-labelledby="history-heading">
        <h2 id="history-heading">History</h2>
        <p>{cookie.historicalContext}</p>
      </section>

      <section className="cookie-detail-section" aria-labelledby="culture-heading">
        <h2 id="culture-heading">Cultural Significance</h2>
        <p>{cookie.culturalSignificance}</p>
      </section>

      <section className="cookie-detail-section" aria-labelledby="technique-heading">
        <h2 id="technique-heading">Technique</h2>
        <p>{cookie.preparationOverview}</p>
        {cookie.commonMixIns.length > 0 && (
          <p><strong>Common mix-ins:</strong> {cookie.commonMixIns.join(', ')}</p>
        )}
      </section>

      <section className="cookie-detail-section" aria-labelledby="variations-heading">
        <h2 id="variations-heading">Variations</h2>
        <p className="cookie-detail-variation-note">{cookie.variationNote}</p>
        {cookie.commonVariations.length > 0 && (
          <p><strong>Traditional variations:</strong> {cookie.commonVariations.join(', ')}</p>
        )}
        {cookie.modernVariations.length > 0 && (
          <p><strong>Modern variations:</strong> {cookie.modernVariations.join(', ')}</p>
        )}
      </section>

      {relatedCookies.length > 0 && (
        <section className="cookie-detail-section" aria-labelledby="related-heading">
          <h2 id="related-heading">Related Cookies</h2>
          <ul className="cookie-detail-related-list">
            {relatedCookies.map((related) => (
              <li key={related.id}><Link to={`/encyclopedia/${related.id}`}>{related.name}</Link></li>
            ))}
          </ul>
        </section>
      )}

      {relatedCollections.length > 0 && (
        <section className="cookie-detail-section" aria-labelledby="collections-heading">
          <h2 id="collections-heading">Appears In</h2>
          <ul className="cookie-detail-related-list">
            {relatedCollections.map((collection) => (
              <li key={collection.id}><Link to={`/collections/${collection.id}`}>{collection.title}</Link></li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}
