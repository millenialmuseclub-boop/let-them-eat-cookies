import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { TopNavBar } from './components/TopNavBar'
import { BottomTabBar } from './components/BottomTabBar'

const MainPage = lazy(() => import('./pages/MainPage').then((m) => ({ default: m.MainPage })))
const CookieEncyclopediaIndexPage = lazy(() => import('./pages/CookieEncyclopediaIndexPage').then((m) => ({ default: m.CookieEncyclopediaIndexPage })))
const CookieDetailPage = lazy(() => import('./pages/CookieDetailPage').then((m) => ({ default: m.CookieDetailPage })))
const AtlasPage = lazy(() => import('./pages/AtlasPage').then((m) => ({ default: m.AtlasPage })))
const CollectionsPage = lazy(() => import('./pages/CollectionsPage').then((m) => ({ default: m.CollectionsPage })))
const CollectionDetailPage = lazy(() => import('./pages/CollectionDetailPage').then((m) => ({ default: m.CollectionDetailPage })))
const PersonalityQuizPage = lazy(() => import('./pages/PersonalityQuizPage').then((m) => ({ default: m.PersonalityQuizPage })))
const WorkshopPage = lazy(() => import('./pages/WorkshopPage').then((m) => ({ default: m.WorkshopPage })))
const CookieAnatomyPage = lazy(() => import('./pages/CookieAnatomyPage').then((m) => ({ default: m.CookieAnatomyPage })))
const BuildACookiePage = lazy(() => import('./pages/BuildACookiePage').then((m) => ({ default: m.BuildACookiePage })))
const LabPage = lazy(() => import('./pages/LabPage').then((m) => ({ default: m.LabPage })))
const TroubleshooterPage = lazy(() => import('./pages/TroubleshooterPage').then((m) => ({ default: m.TroubleshooterPage })))
const SommelierPage = lazy(() => import('./pages/SommelierPage').then((m) => ({ default: m.SommelierPage })))
const SommelierFindPage = lazy(() => import('./pages/SommelierFindPage').then((m) => ({ default: m.SommelierFindPage })))
const CrumbPage = lazy(() => import('./pages/CrumbPage').then((m) => ({ default: m.CrumbPage })))
const Cookie101Page = lazy(() => import('./pages/Cookie101Page').then((m) => ({ default: m.Cookie101Page })))
const VocabularyPage = lazy(() => import('./pages/VocabularyPage').then((m) => ({ default: m.VocabularyPage })))
const TrailsIndexPage = lazy(() => import('./pages/TrailsIndexPage').then((m) => ({ default: m.TrailsIndexPage })))
const TrailDetailPage = lazy(() => import('./pages/TrailDetailPage').then((m) => ({ default: m.TrailDetailPage })))
const Cookie101QuizPage = lazy(() => import('./pages/Cookie101QuizPage').then((m) => ({ default: m.Cookie101QuizPage })))
const MyCookiesPage = lazy(() => import('./pages/MyCookiesPage').then((m) => ({ default: m.MyCookiesPage })))
const CuratedKitchenPage = lazy(() => import('./pages/CuratedKitchenPage').then((m) => ({ default: m.CuratedKitchenPage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })))

function RouteFallback() {
  return <div className="page-container route-fallback" aria-hidden="true" />
}

function App() {
  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <TopNavBar />
      <div id="main-content" className="app-content">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/encyclopedia" element={<CookieEncyclopediaIndexPage />} />
            <Route path="/encyclopedia/:cookieId" element={<CookieDetailPage />} />
            <Route path="/atlas" element={<AtlasPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/collections/:collectionId" element={<CollectionDetailPage />} />
            <Route path="/quiz" element={<PersonalityQuizPage />} />

            <Route path="/workshop" element={<WorkshopPage />} />
            <Route path="/workshop/anatomy" element={<CookieAnatomyPage />} />
            <Route path="/workshop/build-a-cookie" element={<BuildACookiePage />} />
            <Route path="/workshop/labs/:labSlug" element={<LabPage />} />
            <Route path="/workshop/troubleshooter" element={<TroubleshooterPage />} />

            <Route path="/sommelier" element={<SommelierPage />} />
            <Route path="/sommelier/find" element={<SommelierFindPage />} />

            <Route path="/crumb" element={<CrumbPage />} />
            <Route path="/crumb/101" element={<Cookie101Page />} />
            <Route path="/crumb/vocabulary" element={<VocabularyPage />} />
            <Route path="/crumb/trails" element={<TrailsIndexPage />} />
            <Route path="/crumb/trails/:trailId" element={<TrailDetailPage />} />
            <Route path="/crumb/quiz" element={<Cookie101QuizPage />} />

            <Route path="/my-cookies" element={<MyCookiesPage />} />
            <Route path="/curated-kitchen" element={<CuratedKitchenPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Suspense>
      </div>
      <BottomTabBar />
    </div>
  )
}

export default App
