import { useEffect } from 'react'

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title
    document.title = title ? `${title} · Let Them Eat Cookies` : 'Let Them Eat Cookies'
    return () => {
      document.title = previous
    }
  }, [title])
}
