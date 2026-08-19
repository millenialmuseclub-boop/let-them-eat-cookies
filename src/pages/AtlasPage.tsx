import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { regionsByWorldRegion, getTradition, worldRegions } from '../lib/atlas'
import { getCookie } from '../lib/data'

export function AtlasPage() {
  useDocumentTitle('Browse by Origin')
  const regions = worldRegions()
  const [active, setActive] = useState<string | null>(null)
  const byRegion = regionsByWorldRegion()

  return (
    <main className="page-container atlas-page">
      <h1>Browse by Origin</h1>
      <p className="atlas-complexity-note">
        Cookie origins aren't always a single point on a map -- some traditions are shared across
        multiple countries, or genuinely disputed. We note that honestly rather than forcing false
        precision.
      </p>

      <div className="atlas-region-chips" role="group" aria-label="World regions">
        {regions.map((region) => (
          <button
            key={region}
            type="button"
            className="atlas-chip"
            aria-pressed={active === region}
            onClick={() => setActive(active === region ? null : region)}
          >
            {region}
          </button>
        ))}
      </div>

      <div className="atlas-origin-grid">
        {regions
          .filter((r) => !active || r === active)
          .map((region) => {
            const tradition = getTradition(region)
            const entries = byRegion.get(region) ?? []
            return (
              <div className="atlas-country-card" key={region}>
                <h2>{region}</h2>
                {tradition && <p>{tradition.introduction}</p>}
                <ul className="atlas-cookie-list">
                  {entries.map((entry) => {
                    const cookie = getCookie(entry.cookieId)
                    if (!cookie) return null
                    return (
                      <li key={entry.id}>
                        <Link to={`/encyclopedia/${cookie.id}`}>{cookie.name}</Link>
                        <span className="atlas-origin-complexity-tag"> · {entry.originComplexity.replace('-', ' ')}</span>
                        <p>{entry.shortDescription}</p>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
      </div>
    </main>
  )
}
