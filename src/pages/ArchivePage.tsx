import { useMemo } from 'react'
import type { Article } from '../lib/content'
import { getAllArticles, typeLabels, formatDate } from '../lib/content'
import { Link } from 'react-router-dom'

const articles = getAllArticles()

interface MonthGroup {
  label: string
  articles: Article[]
}

export default function ArchivePage() {
  const groups = useMemo(() => {
    const map = new Map<string, Article[]>()
    for (const a of articles) {
      const d = new Date(a.date + 'T00:00:00')
      const key = d.toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric',
      })
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(a)
    }
    const result: MonthGroup[] = []
    for (const [label, arts] of map) {
      result.push({ label, articles: arts })
    }
    return result
  }, [])

  return (
    <section
      style={{
        maxWidth: '48rem',
        margin: '0 auto',
        padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 3rem) 4rem',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2rem',
          fontWeight: 600,
          color: 'var(--vv-ink)',
          marginBottom: '0.5rem',
        }}
      >
        arquivo
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          color: 'var(--vv-muted)',
          fontStyle: 'italic',
          marginBottom: '2.5rem',
        }}
      >
        Todas as publicações, por ordem cronológica.
      </p>

      {groups.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.1rem',
              color: 'var(--vv-muted)',
              fontStyle: 'italic',
            }}
          >
            O arquivo está vazio por enquanto.
          </p>
        </div>
      ) : (
        groups.map((group) => (
          <div key={group.label} style={{ marginBottom: '2.5rem' }}>
            {/* Mês */}
            <h2
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--vv-muted)',
                marginBottom: '1rem',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid var(--vv-sand)',
              }}
            >
              {group.label}
            </h2>

            {group.articles.map((a) => (
              <Link
                key={a.slug}
                to={`/${a.slug}`}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '1rem',
                  padding: '0.6rem 0',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s',
                  borderRadius: '3px',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    'rgba(232, 223, 200, 0.3)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    'transparent'
                }}
              >
                {/* Dia */}
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--vv-muted)',
                    minWidth: '2.5rem',
                    flexShrink: 0,
                  }}
                >
                  {formatDate(a.date).split(' de ')[0]}
                </span>

                {/* Tipo */}
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--vv-terracotta)',
                    minWidth: '5rem',
                    flexShrink: 0,
                  }}
                >
                  {typeLabels[a.type]}
                </span>

                {/* Título */}
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1rem',
                    color: 'var(--vv-ink)',
                    flex: 1,
                  }}
                >
                  {a.title}
                </span>
              </Link>
            ))}
          </div>
        ))
      )}
    </section>
  )
}
