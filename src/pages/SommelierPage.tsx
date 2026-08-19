import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function SommelierPage() {
  useDocumentTitle('Sommelier')
  return (
    <main className="page-container">
      <h1>Sommelier</h1>
      <p>Get matched to a cookie based on what you actually like -- no LLM guesswork, just a deterministic match.</p>
      <div className="workshop-group-grid">
        <Link to="/sommelier/find" className="workshop-link-card">
          <h2>FIND</h2>
          <p>Answer a few questions about your taste and get ranked cookie matches.</p>
        </Link>
        <div className="workshop-link-card workshop-link-card-coming-soon">
          <h2>PAIR</h2>
          <span className="coming-soon-tag">Coming Soon</span>
        </div>
        <div className="workshop-link-card workshop-link-card-coming-soon">
          <h2>CREATE</h2>
          <span className="coming-soon-tag">Coming Soon</span>
        </div>
      </div>
    </main>
  )
}
