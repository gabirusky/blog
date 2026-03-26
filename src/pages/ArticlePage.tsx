import { useParams, Link } from 'react-router-dom'
import type { Article } from '../lib/content'
import { typeLabels, toneLabels, formatDate } from '../lib/content'
import ToneTag from '../components/taxonomy/ToneTag'
import DomainBadge from '../components/taxonomy/DomainBadge'
import '../styles/prose.css'

// Dados de exemplo — futuramente será dinâmico
const articlesMap: Record<string, Article & { body: string }> = {
  'campo-de-batalha-algoritmico': {
    slug: 'campo-de-batalha-algoritmico',
    title: 'O Campo de Batalha Algorítmico',
    date: '2025-09-14',
    type: 'essay',
    tone: 'academic',
    domain: ['technology-ai', 'surveillance-power'],
    abstract:
      'Uma análise da integração de sistemas de inteligência artificial em operações militares contemporâneas, da Palantir ao Project Maven, e as implicações éticas de delegar decisões letais a modelos de aprendizado de máquina.',
    readingTime: 14,
    companionSlug: 'o-que-nao-coube-nas-notas',
    companionLabel: 'Leia o despacho pessoal →',
    body: `
A integração de inteligência artificial em operações militares não é uma previsão futurista — é uma realidade operacional. O Project Maven, iniciado pelo Departamento de Defesa dos Estados Unidos em 2017, utilizou modelos de aprendizado de máquina para analisar imagens capturadas por drones, classificar objetos e identificar alvos potenciais com uma velocidade impossível para analistas humanos.

A Palantir Technologies, fundada por Peter Thiel com investimento inicial da In-Q-Tel (braço de capital de risco da CIA), fornece plataformas de integração de dados que permitem a agências de inteligência e forças armadas cruzar informações de múltiplas fontes — vigilância por satélite, interceptação de comunicações, registros financeiros — em dashboards unificados.

## O problema da delegação letal

A questão central não é se a IA pode identificar um alvo com precisão. É se a cadeia de responsabilidade moral pode sobreviver à mediação algorítmica. Quando um operador de drone recebe uma recomendação de engajamento gerada por um modelo de IA, a decisão de disparar já foi parcialmente tomada pelo sistema.

Hannah Arendt escreveu sobre a "banalidade do mal" — a capacidade de indivíduos comuns cometerem atos monstruosos quando a responsabilidade é distribuída por uma burocracia. A IA militar cria uma nova forma de banalização: a responsabilidade não é apenas distribuída entre humanos, mas estendida a sistemas que não podem ser responsabilizados.

## Considerações finais

O campo de batalha algorítmico não é o futuro. É o presente operacional de múltiplas forças armadas. A questão não é se devemos regulamentá-lo, mas se já é tarde demais para fazê-lo de forma significativa.
    `.trim(),
  },
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? articlesMap[slug] : null

  if (!article) {
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

  const proseClass =
    article.tone === 'academic'
      ? 'prose prose-academic'
      : article.tone === 'casual'
        ? 'prose prose-casual'
        : 'prose prose-hybrid'

  return (
    <article
      style={{
        maxWidth: '42rem',
        margin: '0 auto',
        padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 3rem) 4rem',
      }}
    >
      {/* Cabeçalho */}
      <header style={{ marginBottom: '3rem' }}>
        {/* Meta */}
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
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--vv-muted)',
            }}
          >
            {article.readingTime} min de leitura
          </span>
        </div>

        {/* Título */}
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

        {/* Tags */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <ToneTag tone={article.tone} />
          {article.domain.map((d) => (
            <DomainBadge key={d} domain={d} />
          ))}
        </div>

        {/* Abstract (ensaios) */}
        {article.type === 'essay' && (
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
              }}
            >
              {article.abstract}
            </p>
          </div>
        )}

        <hr className="divider" />
      </header>

      {/* Corpo do artigo */}
      <div className={proseClass}>
        {article.body.split('\n\n').map((paragraph, i) => {
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={i}>{paragraph.replace('## ', '')}</h2>
            )
          }
          return <p key={i}>{paragraph}</p>
        })}
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
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            {article.companionLabel || 'Leia a peça-complementar →'}
          </Link>
        </div>
      )}

      {/* Voltar */}
      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--vv-sand)' }}>
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
  )
}
