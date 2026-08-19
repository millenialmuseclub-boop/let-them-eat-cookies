import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { COOKIES, COLLECTIONS, allCookiesProducts } from '../lib/data'
import { CookieCard } from '../components/CookieCard'
import { DiscoverFeatureCard } from '../components/DiscoverFeatureCard'

function cookieOfTheDay() {
  const dayIndex = Math.floor(Date.now() / 86400000) % COOKIES.length
  return COOKIES[dayIndex]
}

export function MainPage() {
  useDocumentTitle('')
  const featured = cookieOfTheDay()
  const previewCookies = COOKIES.slice(0, 4)
  const previewCollections = COLLECTIONS.slice(0, 3)
  const kitchenCount = allCookiesProducts().length

  return (
    <main className="page-container">
      <section className="hero-section" aria-label="Welcome">
        <h1>Let Them Eat Cookies</h1>
        <p className="hero-tagline">
          An editorial guide to cookies from around the world -- their history, their craft, and where they
          actually come from.
        </p>
      </section>

      <section className="cookie-of-day-section" aria-labelledby="cookie-of-day-heading">
        <h2 id="cookie-of-day-heading">Cookie of the Day</h2>
        <CookieCard cookie={featured} />
      </section>

      <section className="section-with-view-all" aria-labelledby="explore-heading">
        <div className="section-header-row">
          <h2 id="explore-heading">Explore the Encyclopedia</h2>
          <Link to="/encyclopedia" className="view-all-link">View All</Link>
        </div>
        <div className="cookie-grid cookie-grid-compact">
          {previewCookies.map((cookie) => (
            <CookieCard cookie={cookie} key={cookie.id} />
          ))}
        </div>
      </section>

      <section className="discover-feature-grid" aria-label="Discover">
        <DiscoverFeatureCard to="/atlas" title="Browse by Origin" description="A world map of cookie traditions, region by region." icon="🗺️" />
        <DiscoverFeatureCard to="/quiz" title="Cookie Personality Quiz" description="Find the cookie that matches your personality." icon="🍪" />
        <DiscoverFeatureCard to="/sommelier" title="Cookie Sommelier" description="Get a matched recommendation based on your taste." icon="🎯" />
        <DiscoverFeatureCard to="/workshop" title="The Workshop" description="Understand the craft behind every cookie." icon="🥣" />
      </section>

      <section className="section-with-view-all" aria-labelledby="collections-heading">
        <div className="section-header-row">
          <h2 id="collections-heading">Curated Collections</h2>
          <Link to="/collections" className="view-all-link">View All</Link>
        </div>
        <div className="collections-preview-row">
          {previewCollections.map((collection) => (
            <Link to={`/collections/${collection.id}`} className="collection-preview-card" key={collection.id}>
              <h3>{collection.title}</h3>
              <p>{collection.description}</p>
              <span className="collection-preview-count">{collection.cookieIds.length} cookies</span>
            </Link>
          ))}
        </div>
      </section>

      {kitchenCount > 0 && (
        <section className="section-with-view-all" aria-labelledby="kitchen-heading">
          <div className="section-header-row">
            <h2 id="kitchen-heading">Curated Kitchen</h2>
            <Link to="/curated-kitchen" className="view-all-link">View All</Link>
          </div>
          <p>Tools and ingredients from our editorial picks, matched to what you're baking.</p>
        </section>
      )}

      <section className="editorial-module" aria-labelledby="editorial-heading">
        <h2 id="editorial-heading">From the Archive</h2>
        <p>
          Cookies carry more cultural weight than their size suggests -- from Ma'amoul shared across Levantine
          Muslim and Christian households at holidays, to Anzac biscuits engineered to survive a wartime sea
          voyage. Visit <Link to="/crumb">Crumb</Link> for more stories like these.
        </p>
      </section>

      <section className="about-legal-entry" aria-labelledby="about-heading">
        <h2 id="about-heading">About &amp; Legal</h2>
        <Link to="/about" className="about-legal-link">About, Privacy &amp; Terms</Link>
      </section>
    </main>
  )
}
