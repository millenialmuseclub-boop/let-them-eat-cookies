// Local-only My Cookies persistence store. Module-level pub/sub + an in-memory cache for
// referential stability, backing a useSyncExternalStore hook -- ported from Ramen's
// lib/myRamen.ts, versioned from day one per Phase 1 §22 (Ramen's own correction of Cake's
// un-versioned original). No accounts, no cloud sync, no auth.

import type { CookieLibraryRecord, CookieLibraryPayload } from '../types/myCookies'

const STORAGE_KEY = 'letThemEatCookies.myCookies'
const CURRENT_VERSION = 1

let cache: CookieLibraryRecord[] = load()
const listeners = new Set<() => void>()

function load(): CookieLibraryRecord[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CookieLibraryPayload
    if (!parsed || parsed.version !== CURRENT_VERSION || !Array.isArray(parsed.items)) return []
    return parsed.items
  } catch {
    return []
  }
}

function persist() {
  if (typeof window === 'undefined') return
  const payload: CookieLibraryPayload = { version: CURRENT_VERSION, items: cache }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  listeners.forEach((l) => l())
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getSnapshot(): CookieLibraryRecord[] {
  return cache
}

function getOrCreate(cookieId: string): CookieLibraryRecord {
  const existing = cache.find((r) => r.cookieId === cookieId)
  if (existing) return existing
  const now = Date.now()
  const record: CookieLibraryRecord = { cookieId, wantToTry: false, baked: false, favorite: false, savedAt: now, updatedAt: now }
  cache = [...cache, record]
  return record
}

function update(cookieId: string, patch: Partial<CookieLibraryRecord>) {
  const record = getOrCreate(cookieId)
  cache = cache.map((r) => (r.cookieId === cookieId ? { ...record, ...patch, updatedAt: Date.now() } : r))
  persist()
}

export function toggleWantToTry(cookieId: string) {
  const record = getOrCreate(cookieId)
  update(cookieId, { wantToTry: !record.wantToTry })
}

export function toggleBaked(cookieId: string) {
  const record = getOrCreate(cookieId)
  update(cookieId, { baked: !record.baked })
}

export function toggleFavorite(cookieId: string) {
  const record = getOrCreate(cookieId)
  update(cookieId, { favorite: !record.favorite })
}

export function setNote(cookieId: string, note: string) {
  update(cookieId, { note })
}

export function getRecord(cookieId: string): CookieLibraryRecord | undefined {
  return cache.find((r) => r.cookieId === cookieId)
}
