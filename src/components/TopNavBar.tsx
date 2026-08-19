import { Link, useLocation } from 'react-router-dom'

export function TopNavBar() {
  const location = useLocation()
  const isMyCookies = location.pathname === '/my-cookies'
  return (
    <header className="top-nav-bar">
      <Link to="/" className="top-nav-brand">
        Let Them Eat Cookies
      </Link>
      <Link
        to="/my-cookies"
        className="top-nav-library-link"
        aria-current={isMyCookies ? 'page' : undefined}
        aria-label="My Cookies"
      >
        <span aria-hidden="true">📚</span>
        <span className="top-nav-library-label">My Cookies</span>
      </Link>
    </header>
  )
}
