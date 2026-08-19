// My Cookies persistence schema (master spec §22, adapted from Ramen's lib/myRamen.ts pattern,
// itself adapted from Cake's lib/notebook.ts -- but versioned from day one, matching Ramen's own
// correction of Cake's un-versioned model).

export interface CookieLibraryRecord {
  cookieId: string
  wantToTry: boolean
  baked: boolean
  favorite: boolean
  /** Private, local-only. Only meaningful once `baked` is true, but not force-cleared if baked is toggled back off. */
  note?: string
  savedAt: number
  updatedAt: number
}

export interface CookieLibraryPayload {
  version: number
  items: CookieLibraryRecord[]
}
