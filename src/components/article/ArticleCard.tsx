import { Link } from 'react-router-dom'
import type { Article } from '../../lib/content'
import { typeLabels, formatDate } from '../../lib/content'
import DomainBadge from '../taxonomy/DomainBadge'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      to={`/${article.slug}`}
      style={{ textDecoration: 'none', cursor: 'pointer', display: 'block' }}
    >
      <article
        style={{
          padding: '1.8rem 0',
          borderBottom: '1px solid var(--vv-sand)',
          transition: 'background-color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLElement).style.backgroundColor =
            'rgba(232, 223, 200, 0.3)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
        }}
      >
        {/* Meta: tipo + data + leitura */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            marginBottom: '0.6rem',
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
              {article.readingTime} min
            </span>
          )}
        </div>

        {/* Título */}
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.5rem',
            fontWeight: 600,
            color: 'var(--vv-ink)',
            lineHeight: 1.25,
            marginBottom: '0.5rem',
            letterSpacing: '-0.01em',
          }}
        >
          {article.title}
        </h2>

        {/* Abstract */}
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.95rem',
            color: 'var(--vv-muted)',
            lineHeight: 1.6,
            marginBottom: '0.8rem',
          }}
        >
          {article.abstract}
        </p>

        {/* Tags: tom + domínios */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {article.domain.map((d) => (
            <DomainBadge key={d} domain={d} />
          ))}
        </div>
      </article>
    </Link>
  )
}
