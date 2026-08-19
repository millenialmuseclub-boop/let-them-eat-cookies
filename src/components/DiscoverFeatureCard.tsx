import { Link } from 'react-router-dom'

export function DiscoverFeatureCard({ to, title, description, icon }: { to: string; title: string; description: string; icon: string }) {
  return (
    <Link to={to} className="discover-feature-card">
      <div className="discover-feature-card-scrim">
        <span className="discover-feature-card-icon" aria-hidden="true">{icon}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  )
}
