// Motor de conteúdo — tipos e helpers

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
