import { NavLink } from 'react-router-dom'
import { HUBS } from '../data/hubs'

export function BottomTabBar() {
  return (
    <nav className="bottom-tab-bar" aria-label="Primary">
      {HUBS.map((hub) => (
        <NavLink
          key={hub.id}
          to={hub.path}
          end={hub.path === '/'}
          className={({ isActive }) => `bottom-tab-item${isActive ? ' bottom-tab-item-active' : ''}`}
        >
          <span className="bottom-tab-icon" aria-hidden="true">{hub.icon}</span>
          <span className="bottom-tab-label">{hub.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
