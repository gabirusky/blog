/**
 * reading-time.ts — Estimativa de tempo de leitura por contagem de palavras.
 * Palavras por minuto para leitura em português: ~220 wpm (média adulta).
 */

const WORDS_PER_MINUTE = 220

/**
 * Estima o tempo de leitura de um texto bruto em minutos.
 * @param text Conteúdo do artigo (texto puro, sem markdown/HTML)
 * @returns Número de minutos arredondado para cima (mínimo 1)
 */
export function estimateReadingTime(text: string): number {
  const words = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

/**
 * Formata o tempo de leitura como string em pt-BR.
 * @example formatReadingTime(5) → "5 min de leitura"
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min de leitura`
}

/**
 * Remove tags HTML e markdown antes de contar palavras.
 * Útil para processar conteúdo MDX serializado.
 */
export function stripMarkup(raw: string): string {
  return raw
    .replace(/<[^>]+>/g, ' ')          // remove HTML tags
    .replace(/```[\s\S]*?```/g, ' ')   // remove code blocks
    .replace(/`[^`]+`/g, ' ')          // remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, ' ')  // remove images
    .replace(/\[.*?\]\(.*?\)/g, ' ')   // remove links (keep text)
    .replace(/[#*_~>|]/g, ' ')         // remove markdown syntax chars
    .replace(/\s+/g, ' ')
    .trim()
}
