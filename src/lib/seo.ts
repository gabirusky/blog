/**
 * seo.ts — Geração de OpenGraph meta tags e JSON-LD schema.org/Article
 * a partir do frontmatter dos artigos.
 */

import type { Article } from './content'

const SITE_URL = 'https://gabirusky.github.io/blog'
const SITE_NAME = 'blog — livre vazão de ideias'
const AUTHOR_NAME = 'gabirusky'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`

export interface SEOMeta {
  title: string
  description: string
  canonical: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogType: 'website' | 'article'
  jsonLd: string
}

/**
 * Gera os metadados SEO para um artigo específico.
 */
export function getArticleSEO(article: Article): SEOMeta {
  const title = `${article.title} · blog`
  const description = article.abstract || `${article.title} — ${SITE_NAME}`
  const canonical = `${SITE_URL}/#/artigo/${article.slug}`
  const ogImage = article.heroImage
    ? article.heroImage.startsWith('http')
      ? article.heroImage
      : `${SITE_URL}${article.heroImage}`
    : DEFAULT_OG_IMAGE

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.abstract,
    url: canonical,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    image: ogImage,
    inLanguage: 'pt-BR',
    keywords: article.tags?.join(', ') ?? '',
    articleSection: article.type === 'essay'
      ? 'Ensaio'
      : article.type === 'dispatch'
        ? 'Despacho'
        : 'Marginália',
  })

  return {
    title,
    description,
    canonical,
    ogTitle: article.title,
    ogDescription: description,
    ogImage,
    ogType: 'article',
    jsonLd,
  }
}

/**
 * Gera os metadados SEO para a home/feed.
 */
export function getFeedSEO(): SEOMeta {
  const title = SITE_NAME
  const description = 'Ensaios, despachos e marginália de Gabirusky — onde o rigor acadêmico encontra a reflexão acessível.'
  const canonical = SITE_URL

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: SITE_NAME,
    description,
    url: canonical,
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: canonical,
    },
    inLanguage: 'pt-BR',
  })

  return {
    title,
    description,
    canonical,
    ogTitle: title,
    ogDescription: description,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    jsonLd,
  }
}

/**
 * Hook-like helper para injetar tags no <head> via useEffect.
 * Retorna uma função de cleanup que restaura os títulos originais.
 */
export function applyMeta(meta: SEOMeta): () => void {
  const prevTitle = document.title

  // title
  document.title = meta.title

  // helpers
  const setMeta = (property: string, content: string, useProperty = false) => {
    const attr = useProperty ? 'property' : 'name'
    let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${property}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attr, property)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
    return el
  }

  const setJsonLd = (json: string) => {
    let el = document.querySelector<HTMLScriptElement>('script[data-seo="jsonld"]')
    if (!el) {
      el = document.createElement('script')
      el.type = 'application/ld+json'
      el.setAttribute('data-seo', 'jsonld')
      document.head.appendChild(el)
    }
    el.textContent = json
    return el
  }

  setMeta('description', meta.description)
  setMeta('og:title', meta.ogTitle, true)
  setMeta('og:description', meta.ogDescription, true)
  setMeta('og:image', meta.ogImage, true)
  setMeta('og:type', meta.ogType, true)
  setMeta('og:url', meta.canonical, true)
  const jsonLdEl = setJsonLd(meta.jsonLd)

  return () => {
    document.title = prevTitle
    jsonLdEl?.remove()
  }
}
