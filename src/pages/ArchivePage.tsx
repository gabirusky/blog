import { useMemo } from 'react'
import type { Article } from '../lib/content'
import { typeLabels, formatDate } from '../lib/content'
import { Link } from 'react-router-dom'
import ToneTag from '../components/taxonomy/ToneTag'

// Mesmo sample data — futuramente virá do motor de conteúdo
const sampleArticles: Article[] = [
  {
    slug: 'nota-sobre-escrita',
    title: 'Nota sobre escrever apesar de tudo',
    date: '2025-10-02',
    type: 'marginalia',
    tone: 'casual',
    domain: ['personal', 'language-writing'],
    abstract: 'Uma frase de Clarice me encontrou no ônibus.',
    readingTime: 1,
  },
  {
    slug: 'o-que-nao-coube-nas-notas',
    title: 'O que não coube nas notas de rodapé',
    date: '2025-09-28',
    type: 'dispatch',
    tone: 'casual',
    domain: ['technology-ai', 'personal'],
    abstract: 'As dúvidas que ficaram de fora do ensaio sobre IA militar.',
    readingTime: 5,
  },
  {
    slug: 'campo-de-batalha-algoritmico',
    title: 'O Campo de Batalha Algorítmico',
    date: '2025-09-14',
    type: 'essay',
    tone: 'academic',
    domain: ['technology-ai', 'surveillance-power'],
    abstract: 'IA em operações militares: da Palantir ao Project Maven.',
    readingTime: 14,
  },
  {
    slug: 'recaptcha-trabalho-invisivel',
    title: 'O Trabalho Invisível do reCAPTCHA',
    date: '2025-08-20',
    type: 'essay',
    tone: 'academic',
    domain: ['labor-ethics', 'technology-ai'],
    abstract: 'Como o reCAPTCHA transforma verificação em trabalho.',
    readingTime: 12,
  },
  {
    slug: 'hofstadter-e-as-maquinas',
    title: 'Hofstadter e as máquinas que (não) pensam',
    date: '2025-07-15',
    type: 'essay',
    tone: 'hybrid',
    domain: ['philosophy-of-mind', 'technology-ai'],
    abstract: 'GEB à luz dos LLMs contemporâneos.',
    readingTime: 10,
  },
  {
    slug: 'tecnofeudalismo-varoufakis',
    title: 'Tecnofeudalismo: o capital fugiu do mercado',
    date: '2025-06-10',
    type: 'dispatch',
    tone: 'hybrid',
    domain: ['data-society', 'labor-ethics'],
    abstract: 'Varoufakis argumenta que não vivemos mais no capitalismo.',
    readingTime: 6,
  },
]

interface MonthGroup {
  label: string
  articles: Article[]
}

export default function ArchivePage() {
  const groups = useMemo(() => {
    const sorted = [...sampleArticles].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    const map = new Map<string, Article[]>()
    for (const a of sorted) {
      const d = new Date(a.date + 'T00:00:00')
      const key = d.toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric',
      })
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(a)
    }
    const result: MonthGroup[] = []
    for (const [label, articles] of map) {
      result.push({ label, articles })
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

      {groups.map((group) => (
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

          {/* Artigos do mês */}
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
                ;(e.currentTarget as HTMLElement).style.backgroundColor =
                  'rgba(232, 223, 200, 0.3)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.backgroundColor =
                  'transparent'
              }}
            >
              {/* Data */}
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

              {/* Tom */}
              <span style={{ flexShrink: 0 }}>
                <ToneTag tone={a.tone} />
              </span>
            </Link>
          ))}
        </div>
      ))}
    </section>
  )
}
