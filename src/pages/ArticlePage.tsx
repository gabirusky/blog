import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import type { Article } from '../lib/content'
import { typeLabels, formatDate, domainLabels } from '../lib/content'
import DomainBadge from '../components/taxonomy/DomainBadge'
import '../styles/prose.css'

// Dados de exemplo — futuramente será dinâmico
const articlesMap: Record<string, Article & { body: string }> = {
  'campo-de-batalha-algoritmico': {
    slug: 'campo-de-batalha-algoritmico',
    title: 'O Campo de Batalha Algorítmico',
    date: '2025-09-14',
    type: 'essay',
    domain: ['technology-ai', 'surveillance-power'],
    abstract:
      'Uma análise da integração de sistemas de inteligência artificial em operações militares contemporâneas, da Palantir ao Project Maven, e as implicações éticas de delegar decisões letais a modelos de aprendizado de máquina.',
    readingTime: 14,
    companionSlug: 'o-que-nao-coube-nas-notas',
    companionLabel: 'Leia o despacho pessoal →',
    body: `A integração de inteligência artificial em operações militares não é uma previsão futurista — é uma realidade operacional. O Project Maven, iniciado pelo Departamento de Defesa dos Estados Unidos em 2017, utilizou modelos de aprendizado de máquina para analisar imagens capturadas por drones, classificar objetos e identificar alvos potenciais com uma velocidade impossível para analistas humanos.

A Palantir Technologies, fundada por Peter Thiel com investimento inicial da In-Q-Tel (braço de capital de risco da CIA), fornece plataformas de integração de dados que permitem a agências de inteligência e forças armadas cruzar informações de múltiplas fontes — vigilância por satélite, interceptação de comunicações, registros financeiros — em dashboards unificados.

## A ilusão da autonomia

A narrativa da "IA autônoma" é, em si mesma, uma construção política. Nenhum sistema de armas opera sem supervisão humana — o que muda é o grau de mediação entre a decisão algorítmica e a ação letal. O conceito de "human-in-the-loop" se tornou um escudo retórico.

## Arquitetura global da anotação

A cadeia de valor da IA militar depende de uma infraestrutura global de anotação de dados que permanece invisível. Empresas como Scale AI, Labelbox e Enabled Intelligence contratam anotadores em países com mão de obra barata para classificar imagens de satélite, transcrever comunicações e rotular alvos potenciais.

## O problema da delegação letal

A questão central não é se a IA pode identificar um alvo com precisão. É se a cadeia de responsabilidade moral pode sobreviver à mediação algorítmica. Quando um operador de drone recebe uma recomendação de engajamento gerada por um modelo de IA, a decisão de disparar já foi parcialmente tomada pelo sistema.

Hannah Arendt escreveu sobre a "banalidade do mal" — a capacidade de indivíduos comuns cometerem atos monstruosos quando a responsabilidade é distribuída por uma burocracia. A IA militar cria uma nova forma de banalização: a responsabilidade não é apenas distribuída entre humanos, mas estendida a sistemas que não podem ser responsabilizados.

> *Em última análise, a inteligência artificial não está substituindo o trabalho humano; está meramente reestruturando-o e ocultando-o. A indústria criou com sucesso uma vasta fábrica digital invisível onde humanos são reduzidos a algoritmos biológicos.*

## Guerra algorítmica

A integração rápida desta tecnologia no complexo militar-industrial demonstra as profundas implicações geopolíticas. Empresas como Scale AI, Labelbox e Enabled Intelligence não são mais apenas startups de tecnologia — são empreiteiras de defesa segurando as chaves de bilhões de dólares para o futuro da guerra algorítmica e da segurança global.

## Considerações finais

O campo de batalha algorítmico não é o futuro. É o presente operacional de múltiplas forças armadas. A questão não é se devemos regulamentá-lo, mas se já é tarde demais para fazê-lo de forma significativa.

Enquanto as realidades estruturais deste trabalho oculto não forem trazidas à luz e fundamentalmente reformadas, os avanços majestosos da inteligência artificial permanecerão inextricavelmente ligados à degradação e exploração dos humanos que a constroem.`,
  },
}

/** Extrai headings do corpo para gerar o TOC */
function extractHeadings(body: string): { id: string; text: string }[] {
  return body
    .split('\n\n')
    .filter((p) => p.startsWith('## '))
    .map((p) => {
      const text = p.replace('## ', '')
      const id = text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      return { id, text }
    })
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? articlesMap[slug] : null
  const [activeHeading, setActiveHeading] = useState<string>('')

  const headings = useMemo(
    () => (article ? extractHeadings(article.body) : []),
    [article]
  )

  // Observer para destacar heading ativo no TOC
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
                        color: isActive
                          ? 'var(--vv-terracotta)'
                          : 'var(--vv-muted)',
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

          {/* Foco de Pesquisa */}
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
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.4rem',
              }}
            >
              {article.domain.map((d) => (
                <DomainBadge key={d} domain={d} />
              ))}
            </div>
          </div>
        </aside>
      )}

      {/* ─── Conteúdo principal ─── */}
      <article style={{ maxWidth: isEssay ? undefined : '42rem', margin: isEssay ? undefined : '0 auto' }}>
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

          {/* Tags (apenas para não-ensaios, pois ensaios mostram na sidebar) */}
          {!isEssay && (
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

          {/* Abstract (ensaios) */}
          {isEssay && (
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
        <div className="prose">
          {article.body.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('## ')) {
              const text = paragraph.replace('## ', '')
              const id = text
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
              return <h2 key={i} id={id}>{text}</h2>
            }
            if (paragraph.startsWith('> ')) {
              const quoteText = paragraph.replace(/^>\s?/gm, '')
              return (
                <blockquote key={i}>
                  <p dangerouslySetInnerHTML={{ __html: quoteText }} />
                </blockquote>
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
    </div>
  )
}
