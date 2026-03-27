// Motor de conteúdo — tipos, helpers e carregador dinâmico de MDX

export type ContentType = 'essay' | 'dispatch' | 'marginalia'

export interface Article {
  slug: string
  title: string
  date: string
  type: ContentType
  domain: string[]
  abstract: string
  draft?: boolean
  tags?: string[]
  readingTime?: number
  heroImage?: string
  heroAlt?: string
  companionSlug?: string
  companionLabel?: string
}

export const typeLabels: Record<ContentType, string> = {
  essay: 'Ensaio',
  dispatch: 'Despacho',
  marginalia: 'Marginália',
}

export const domainColors: Record<string, string> = {
  'technology-ai':       'terracotta',
  'labor-ethics':        'terracotta',
  'philosophy-of-mind':  'terracotta',
  'surveillance-power':  'terracotta',
  'data-society':        'blue',
  'civic-technology':    'blue',
  'climate-environment': 'blue',
  'language-writing':    'green',
  'creative-fiction':    'green',
  'prose-craft':         'green',
  'personal':            'gray',
}

export const domainLabels: Record<string, string> = {
  'technology-ai':       'Tecnologia & IA',
  'labor-ethics':        'Ética do Trabalho',
  'philosophy-of-mind':  'Filosofia da Mente',
  'surveillance-power':  'Vigilância & Poder',
  'data-society':        'Dados & Sociedade',
  'civic-technology':    'Tecnologia Cívica',
  'climate-environment': 'Clima & Meio Ambiente',
  'language-writing':    'Linguagem & Escrita',
  'creative-fiction':    'Ficção Criativa',
  'prose-craft':         'Ofício da Prosa',
  'personal':            'Pessoal',
}

/** Estima tempo de leitura a partir da contagem de palavras */
export function estimateReadingTime(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 220))
}

/** Formata data ISO para exibição em pt-BR */
export function formatDate(isoDate: string): string {
  const d = new Date(isoDate + 'T00:00:00')
  return d.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// ─── Carregamento dinâmico de MDX ───────────────────────────────────────────

type MDXModule = {
  default: React.ComponentType
  frontmatter: Record<string, unknown>
}

/**
 * Carrega todos os artigos MDX de src/content/.
 * O frontmatter de cada arquivo é exportado como named export `frontmatter`.
 * O slug é derivado do nome do arquivo.
 */
let _cachedArticles: Article[] | null = null

export function getAllArticles(): Article[] {
  if (_cachedArticles !== null) return _cachedArticles

  // import.meta.glob com eager: true carrega em build time (SSG-like)
  const modules = import.meta.glob<MDXModule>(
    '../content/**/*.mdx',
    { eager: true }
  )

  const articles: Article[] = []

  for (const [path, mod] of Object.entries(modules)) {
    const fm = mod.frontmatter ?? {}

    // Deriva slug do nome do arquivo: ../content/essays/meu-post.mdx → meu-post
    const parts = path.split('/')
    const filename = parts[parts.length - 1]
    const slug = (fm.slug as string) ?? filename.replace(/\.mdx$/, '')

    // Deriva type do caminho
    let type: ContentType = 'dispatch'
    if (path.includes('/essays/')) type = 'essay'
    else if (path.includes('/marginalia/')) type = 'marginalia'
    else if (path.includes('/dispatches/')) type = 'dispatch'
    if (fm.type) type = fm.type as ContentType

    const article: Article = {
      slug,
      title: (fm.title as string) ?? 'Sem título',
      date: (fm.date as string) ?? '2025-01-01',
      type,
      domain: (fm.domain as string[]) ?? [],
      abstract: (fm.abstract as string) ?? '',
      draft: (fm.draft as boolean) ?? false,
      tags: (fm.tags as string[]) ?? [],
      readingTime: (fm.readingTime as number) ?? undefined,
      heroImage: (fm.heroImage as string) ?? undefined,
      heroAlt: (fm.heroAlt as string) ?? undefined,
      companionSlug: (fm.companionSlug as string) ?? undefined,
      companionLabel: (fm.companionLabel as string) ?? undefined,
    }

    articles.push(article)
  }

  // Ordena por data decrescente, excluindo drafts por padrão
  _cachedArticles = articles
    .filter((a) => !a.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return _cachedArticles
}

/**
 * Busca um artigo por slug, incluindo o componente MDX renderizável.
 */
export function getArticleComponent(slug: string): React.ComponentType | null {
  const modules = import.meta.glob<MDXModule>(
    '../content/**/*.mdx',
    { eager: true }
  )

  for (const [path, mod] of Object.entries(modules)) {
    const parts = path.split('/')
    const filename = parts[parts.length - 1]
    const fm = mod.frontmatter ?? {}
    const fileSlug = (fm.slug as string) ?? filename.replace(/\.mdx$/, '')

    if (fileSlug === slug) {
      return mod.default
    }
  }

  return null
}
