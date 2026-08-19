import { useDocumentTitle } from '../lib/useDocumentTitle'
import { FloatingBackButton } from '../components/FloatingBackButton'
import vocabularyJson from '../data/vocabulary.json'
import type { VocabularyTerm } from '../types/trails'

const VOCABULARY = vocabularyJson as VocabularyTerm[]

export function VocabularyPage() {
  useDocumentTitle('Cookie Vocabulary')
  return (
    <main className="page-container">
      <FloatingBackButton />
      <h1>Cookie Vocabulary</h1>
      <dl className="vocabulary-list">
        {VOCABULARY.map((entry) => (
          <div className="vocabulary-item" key={entry.term}>
            <dt>{entry.term}</dt>
            <dd>{entry.definition}</dd>
          </div>
        ))}
      </dl>
    </main>
  )
}
