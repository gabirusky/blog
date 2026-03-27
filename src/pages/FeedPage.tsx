import { useState, useMemo } from 'react'
import type { ContentType, Article } from '../lib/content'
import { getAllArticles } from '../lib/content'
import Hero from '../components/layout/Hero'
import FilterBar from '../components/taxonomy/FilterBar'
import ArticleCard from '../components/article/ArticleCard'

const articles = getAllArticles()

export default function FeedPage() {
  const [filters, setFilters] = useState<{
    type: ContentType | null
    domain: string | null
  }>({ type: null, domain: null })

  const filtered = useMemo(() => {
    return articles
      .filter((a) => !filters.type || a.type === filters.type)
      .filter((a) => !filters.domain || a.domain.includes(filters.domain))
  }, [filters])

  const availableDomains = useMemo(() => {
    const domains = new Set<string>()
    articles.forEach((a) => a.domain.forEach((d) => domains.add(d)))
    return Array.from(domains).sort()
  }, [])

  return (
    <>
      <Hero />

      <section
        style={{
          maxWidth: '48rem',
          margin: '0 auto',
          padding: '0 clamp(1rem, 4vw, 3rem) 4rem',
        }}
      >
        {articles.length > 0 && (
          <FilterBar
            onFilterChange={setFilters}
            availableDomains={availableDomains}
          />
        )}

        <div className="fade-up">
          {articles.length === 0 ? (
            /* Estado vazio — nenhum post publicado ainda */
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 0',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.2rem',
                  color: 'var(--vv-muted)',
                  fontStyle: 'italic',
                  marginBottom: '0.5rem',
                }}
              >
                Nenhuma publicação ainda.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--vv-sand)',
                  letterSpacing: '0.06em',
                }}
              >
                em breve.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                color: 'var(--vv-muted)',
                fontStyle: 'italic',
                textAlign: 'center',
                padding: '3rem 0',
              }}
            >
              Nenhum artigo encontrado com esses filtros.
            </p>
          ) : (
            filtered.map((article: Article) => (
              <ArticleCard key={article.slug} article={article} />
            ))
          )}
        </div>

        {articles.length > 0 && (
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--vv-muted)',
              textAlign: 'center',
              marginTop: '2rem',
              letterSpacing: '0.06em',
            }}
          >
            {filtered.length} de {articles.length} publicações
          </p>
        )}
      </section>
    </>
  )
}
