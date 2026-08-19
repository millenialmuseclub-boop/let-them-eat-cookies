import { useNavigate } from 'react-router-dom'

export function FloatingBackButton() {
  const navigate = useNavigate()
  return (
    <button type="button" className="floating-back-button" onClick={() => navigate(-1)} aria-label="Go back">
      <span aria-hidden="true">←</span>
    </button>
  )
}
