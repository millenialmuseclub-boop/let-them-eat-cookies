import { Routes, Route } from 'react-router-dom'
import { TopNavBar } from './components/TopNavBar'
import { BottomTabBar } from './components/BottomTabBar'

import { MainPage } from './pages/MainPage'
import { CookieEncyclopediaIndexPage } from './pages/CookieEncyclopediaIndexPage'
import { CookieDetailPage } from './pages/CookieDetailPage'
import { AtlasPage } from './pages/AtlasPage'
import { CollectionsPage } from './pages/CollectionsPage'
import { CollectionDetailPage } from './pages/CollectionDetailPage'
import { PersonalityQuizPage } from './pages/PersonalityQuizPage'
import { WorkshopPage } from './pages/WorkshopPage'
import { CookieAnatomyPage } from './pages/CookieAnatomyPage'
import { BuildACookiePage } from './pages/BuildACookiePage'
import { LabPage } from './pages/LabPage'
import { TroubleshooterPage } from './pages/TroubleshooterPage'
import { SommelierPage } from './pages/SommelierPage'
import { SommelierFindPage } from './pages/SommelierFindPage'
import { CrumbPage } from './pages/CrumbPage'
import { Cookie101Page } from './pages/Cookie101Page'
import { VocabularyPage } from './pages/VocabularyPage'
import { TrailsIndexPage } from './pages/TrailsIndexPage'
import { TrailDetailPage } from './pages/TrailDetailPage'
import { Cookie101QuizPage } from './pages/Cookie101QuizPage'
import { MyCookiesPage } from './pages/MyCookiesPage'
import { CuratedKitchenPage } from './pages/CuratedKitchenPage'
import { AboutPage } from './pages/AboutPage'

function App() {
  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <TopNavBar />
      <div id="main-content" className="app-content">
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
      </div>
      <BottomTabBar />
    </div>
  )
}

export default App
