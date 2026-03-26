import { Routes, Route } from 'react-router-dom'
import Shell from './components/layout/Shell'
import FeedPage from './pages/FeedPage'
import ArchivePage from './pages/ArchivePage'
import AboutPage from './pages/AboutPage'
import ArticlePage from './pages/ArticlePage'

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/arquivo" element={<ArchivePage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/:slug" element={<ArticlePage />} />
      </Routes>
    </Shell>
  )
}
