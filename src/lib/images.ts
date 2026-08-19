// Source-agnostic image lookup. cookieImages.json/sceneImages.json are optional -- any cookie or
// scene without a confident, legally-usable real photo simply has no entry here, and callers fall
// back to a branded placeholder rather than a fabricated or mismatched photo (Phase 1 instruction
// §17-18: "never use an inaccurate food image just to hit 100% coverage").

import type { CookieImage, SceneImage } from '../types/images'
import cookieImagesJson from '../data/cookieImages.json'
import sceneImagesJson from '../data/sceneImages.json'

const COOKIE_IMAGES = cookieImagesJson as Record<string, CookieImage>
const SCENE_IMAGES = sceneImagesJson as Record<string, SceneImage>

export function getCookieImage(cookieId: string): CookieImage | undefined {
  return COOKIE_IMAGES[cookieId]
}

export function getSceneImage(sceneId: string): SceneImage | undefined {
  return SCENE_IMAGES[sceneId]
}

export function cookiePhotographyCoverage(): { total: number; withPhoto: number } {
  return { total: Object.keys(COOKIE_IMAGES).length, withPhoto: Object.keys(COOKIE_IMAGES).length }
}
