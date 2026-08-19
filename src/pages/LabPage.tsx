import { useParams, Navigate } from 'react-router-dom'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { LABS_BY_SLUG } from '../lib/data'
import { LabExplorer } from '../components/LabExplorer'
import { ContextualCuratedKitchen } from '../components/ContextualCuratedKitchen'
import { FloatingBackButton } from '../components/FloatingBackButton'

export function LabPage() {
  const { labSlug = '' } = useParams()
  const lab = LABS_BY_SLUG.get(labSlug)
  useDocumentTitle(lab?.title ?? 'Lab')

  if (!lab) return <Navigate to="/workshop" replace />

  return (
    <main className="page-container">
      <FloatingBackButton />
      <h1>{lab.title}</h1>
      <p>{lab.description}</p>
      <LabExplorer lab={lab} />
      <ContextualCuratedKitchen context={lab.slug} title={`Shop the ${lab.title}`} />
    </main>
  )
}
