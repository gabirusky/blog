import { Routes, Route, useLocation } from 'react-router-dom'
import Shell from './components/layout/Shell'
import IntroReveal from './components/layout/IntroReveal'
import FeedPage from './pages/FeedPage'
import ArchivePage from './pages/ArchivePage'
import AboutPage from './pages/AboutPage'
import ArticlePage from './pages/ArticlePage'

export default function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      {isHome && <IntroReveal />}
      <Shell>
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/arquivo" element={<ArchivePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/:slug" element={<ArticlePage />} />
        </Routes>
      </Shell>
    </>
  )
}
