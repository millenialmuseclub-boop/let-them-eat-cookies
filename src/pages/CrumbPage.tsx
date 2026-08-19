import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function CrumbPage() {
  useDocumentTitle('Crumb')
  return (
    <main className="page-container">
      <h1>Crumb</h1>
      <p>Culture, history, vocabulary, and cookie trivia -- the stories behind the recipes.</p>
      <div className="workshop-group-grid">
        <Link to="/crumb/101" className="workshop-link-card">
          <h2>Cookie 101</h2>
          <p>The essential primer on how cookies work.</p>
        </Link>
        <Link to="/atlas" className="workshop-link-card">
          <h2>Cookie Traditions</h2>
          <p>Explore traditions by region.</p>
        </Link>
        <Link to="/crumb/vocabulary" className="workshop-link-card">
          <h2>Cookie Vocabulary</h2>
          <p>Key baking terms explained.</p>
        </Link>
        <Link to="/sommelier/find" className="workshop-link-card">
          <h2>Find Your Cookie</h2>
          <p>Get matched to a cookie based on your taste.</p>
        </Link>
        <Link to="/crumb/trails" className="workshop-link-card">
          <h2>Cookie Trails</h2>
          <p>Themed paths through the Encyclopedia.</p>
        </Link>
        <Link to="/crumb/quiz" className="workshop-link-card">
          <h2>Cookie 101 Quiz</h2>
          <p>Test what you've learned.</p>
        </Link>
      </div>
    </main>
  )
}
