import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { Article } from '../lib/content'
import { getAllArticles, getArticleComponent, typeLabels, formatDate } from '../lib/content'
import DomainBadge from '../components/taxonomy/DomainBadge'
import '../styles/prose.css'

const articles = getAllArticles()

/** Extrai headings h2 do conteúdo MDX renderizado */
function extractHeadingsFromDOM(): { id: string; text: string }[] {
  const proseEl = document.querySelector('.prose')
  if (!proseEl) return []
  return Array.from(proseEl.querySelectorAll('h2')).map((el) => ({
    id: el.id,
    text: el.textContent ?? '',
  }))
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()

  const article: Article | undefined = articles.find((a) => a.slug === slug)
  const MDXContent = slug ? getArticleComponent(slug) : null

  const [activeHeading, setActiveHeading] = useState<string>('')
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([])

  // Extrai headings do DOM após renderização do MDX
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeadings(extractHeadingsFromDOM())
    }, 100)
    return () => clearTimeout(timer)
  }, [slug])

  // IntersectionObserver para destacar heading ativo
  useEffect(() => {
    if (!headings.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    )
    for (const h of headings) {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [headings])

  if (!article || !MDXContent) {
    return (
      <section
        style={{
          maxWidth: '42rem',
          margin: '0 auto',
          padding: 'clamp(4rem, 10vw, 8rem) clamp(1rem, 4vw, 3rem)',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.8rem',
            color: 'var(--vv-ink)',
            marginBottom: '1rem',
          }}
        >
          Artigo não encontrado
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            color: 'var(--vv-muted)',
            fontStyle: 'italic',
            marginBottom: '2rem',
          }}
        >
          O slug "{slug}" não corresponde a nenhuma publicação.
        </p>
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--vv-terracotta)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          ← voltar ao início
        </Link>
      </section>
    )
  }

  const isEssay = article.type === 'essay'

  return (
    <div
      style={{
        maxWidth: '72rem',
        margin: '0 auto',
        padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 3rem) 4rem',
        display: isEssay ? 'grid' : 'block',
        gridTemplateColumns: isEssay ? '220px 1fr' : undefined,
        gap: isEssay ? '3rem' : undefined,
      }}
    >
      {/* ─── Sidebar (apenas ensaios) ─── */}
      {isEssay && (
        <aside
          style={{
            position: 'sticky',
            top: 'calc(var(--nav-height) + 2rem)',
            alignSelf: 'start',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}
        >
          {/* Índice */}
          {headings.length > 0 && (
            <nav
              style={{
                backgroundColor: 'var(--vv-cream)',
                borderRadius: '8px',
                padding: '1.2rem 1rem',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--vv-muted)',
                  marginBottom: '0.8rem',
                  fontWeight: 600,
                }}
              >
                Índice
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {headings.map((h) => {
                  const isActive = activeHeading === h.id
                  return (
                    <li key={h.id} style={{ marginBottom: '0.15rem' }}>
                      <a
                        href={`#${h.id}`}
                        onClick={(e) => {
                          e.preventDefault()
                          document
                            .getElementById(h.id)
                            ?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.35rem 0.5rem',
                          borderRadius: '4px',
                          fontFamily: 'var(--font-serif)',
                          fontSize: '0.82rem',
                          color: isActive ? 'var(--vv-terracotta)' : 'var(--vv-muted)',
                          backgroundColor: isActive
                            ? 'rgba(184, 92, 56, 0.06)'
                            : 'transparent',
                          textDecoration: 'none',
                          transition: 'all 0.15s ease',
                          cursor: 'pointer',
                          lineHeight: 1.3,
                          fontWeight: isActive ? 500 : 400,
                        }}
                      >
                        {isActive && (
                          <span
                            style={{
                              color: 'var(--vv-terracotta)',
                              fontSize: '0.7rem',
                              flexShrink: 0,
                            }}
                          >
                            ›
                          </span>
                        )}
                        <span
                          style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {h.text}
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          )}

          {/* Foco de Pesquisa */}
          {article.domain.length > 0 && (
            <div
              style={{
                backgroundColor: 'var(--vv-cream)',
                borderRadius: '8px',
                padding: '1.2rem 1rem',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--vv-muted)',
                  marginBottom: '0.8rem',
                  fontWeight: 600,
                }}
              >
                Foco de Pesquisa
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {article.domain.map((d) => (
                  <DomainBadge key={d} domain={d} />
                ))}
              </div>
            </div>
          )}
        </aside>
      )}

      {/* ─── Conteúdo principal ─── */}
      <article
        style={{
          maxWidth: isEssay ? undefined : '42rem',
          margin: isEssay ? undefined : '0 auto',
        }}
      >
        {/* Cabeçalho */}
        <header style={{ marginBottom: '3rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              marginBottom: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--vv-terracotta)',
                fontWeight: 600,
              }}
            >
              {typeLabels[article.type]}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--vv-muted)',
              }}
            >
              {formatDate(article.date)}
            </span>
            {article.readingTime && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--vv-muted)',
                }}
              >
                {article.readingTime} min de leitura
              </span>
            )}
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 600,
              color: 'var(--vv-ink)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            {article.title}
          </h1>

          {/* Tags para não-ensaios */}
          {!isEssay && article.domain.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                alignItems: 'center',
                marginBottom: '1.5rem',
              }}
            >
              {article.domain.map((d) => (
                <DomainBadge key={d} domain={d} />
              ))}
            </div>
          )}

          {/* Abstract para ensaios */}
          {isEssay && article.abstract && (
            <div
              style={{
                backgroundColor: 'var(--vv-cream)',
                borderLeft: '3px solid var(--vv-terracotta)',
                padding: '1.2rem 1.5rem',
                borderRadius: '0 4px 4px 0',
                marginBottom: '2rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--vv-muted)',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                resumo
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.95rem',
                  color: 'var(--vv-ink)',
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                  margin: 0,
                }}
              >
                {article.abstract}
              </p>
            </div>
          )}

          <hr className="divider" />
        </header>

        {/* Corpo — componente MDX renderizado */}
        <div className="prose">
          <MDXContent />
        </div>

        {/* Companion callout */}
        {article.companionSlug && (
          <div
            style={{
              marginTop: '3rem',
              padding: '1.2rem 1.5rem',
              backgroundColor: 'var(--vv-cream)',
              borderRadius: '4px',
              border: '1px solid var(--vv-sand)',
            }}
          >
            <Link
              to={`/${article.companionSlug}`}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1rem',
                color: 'var(--vv-terracotta)',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {article.companionLabel || 'Leia a peça-complementar →'}
            </Link>
          </div>
        )}

        {/* Voltar */}
        <div
          style={{
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--vv-sand)',
          }}
        >
          <Link
            to="/"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--vv-muted)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--vv-terracotta)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--vv-muted)'
            }}
          >
            ← voltar ao início
          </Link>
        </div>
      </article>
    </div>
  )
}
