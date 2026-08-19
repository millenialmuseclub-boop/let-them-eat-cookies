import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Capacitor } from '@capacitor/core'
import { App as CapacitorApp } from '@capacitor/app'
import './index.css'
import App from './App.tsx'

// Android hardware back button -- ported directly from Ramen's main.tsx (itself ported from
// Cake's): defer to real browser history, which BrowserRouter keeps in sync with actual route
// navigation, and only exit the app when there's nothing left in this session's history to unwind.
if (Capacitor.isNativePlatform()) {
  CapacitorApp.addListener('backButton', () => {
    const idx = (window.history.state as { idx?: number } | null)?.idx
    if (typeof idx === 'number' && idx > 0) {
      window.history.back()
      return
    }

    CapacitorApp.exitApp()
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
