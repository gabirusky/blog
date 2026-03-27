import { useState, useMemo } from 'react'
import type { ContentType, Article } from '../lib/content'
import Hero from '../components/layout/Hero'
import FilterBar from '../components/taxonomy/FilterBar'
import ArticleCard from '../components/article/ArticleCard'

// Dados de exemplo — será substituído por carregamento dinâmico de MDX
const sampleArticles: Article[] = [
  {
    slug: 'campo-de-batalha-algoritmico',
    title: 'O Campo de Batalha Algorítmico',
    date: '2025-09-14',
    type: 'essay',
    domain: ['technology-ai', 'surveillance-power'],
    abstract:
      'Uma análise da integração de sistemas de inteligência artificial em operações militares contemporâneas, da Palantir ao Project Maven, e as implicações éticas de delegar decisões letais a modelos de aprendizado de máquina.',
    readingTime: 14,
  },
  {
    slug: 'o-que-nao-coube-nas-notas',
    title: 'O que não coube nas notas de rodapé',
    date: '2025-09-28',
    type: 'dispatch',
    domain: ['technology-ai', 'personal'],
    abstract:
      'As dúvidas, reações e especulações que ficaram de fora do ensaio sobre IA militar — escritas no calor da entrega.',
    readingTime: 5,
    companionSlug: 'campo-de-batalha-algoritmico',
    companionLabel: 'Leia o ensaio acadêmico →',
  },
  {
    slug: 'recaptcha-trabalho-invisivel',
    title: 'O Trabalho Invisível do reCAPTCHA',
    date: '2025-08-20',
    type: 'essay',
    domain: ['labor-ethics', 'technology-ai'],
    abstract:
      'Como o reCAPTCHA transforma a verificação humana em trabalho não remunerado de treinamento de modelos de IA, em uma cadeia de valor que permanece deliberadamente opaca.',
    readingTime: 12,
  },
  {
    slug: 'hofstadter-e-as-maquinas',
    title: 'Hofstadter e as máquinas que (não) pensam',
    date: '2025-07-15',
    type: 'essay',
    domain: ['philosophy-of-mind', 'technology-ai'],
    abstract:
      'Uma leitura de Gödel, Escher, Bach à luz dos LLMs contemporâneos — e por que Hofstadter estaria simultaneamente fascinado e horrorizado.',
    readingTime: 10,
  },
  {
    slug: 'nota-sobre-escrita',
    title: 'Nota sobre escrever apesar de tudo',
    date: '2025-10-02',
    type: 'marginalia',
    domain: ['personal', 'language-writing'],
    abstract:
      'Uma frase de Clarice me encontrou no ônibus. Precisei anotar antes que sumisse.',
    readingTime: 1,
  },
  {
    slug: 'tecnofeudalismo-varoufakis',
    title: 'Tecnofeudalismo: o capital fugiu do mercado',
    date: '2025-06-10',
    type: 'dispatch',
    domain: ['data-society', 'labor-ethics'],
    abstract:
      'Varoufakis argumenta que não vivemos mais no capitalismo, mas em algo pior. Concordo com metade.',
    readingTime: 6,
  },
]

export default function FeedPage() {
  const [filters, setFilters] = useState<{
    type: ContentType | null
    domain: string | null
  }>({ type: null, domain: null })

  const filtered = useMemo(() => {
    return sampleArticles
      .filter((a) => !a.draft)
      .filter((a) => !filters.type || a.type === filters.type)
      .filter((a) => !filters.domain || a.domain.includes(filters.domain))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [filters])

  const availableDomains = useMemo(() => {
    const domains = new Set<string>()
    sampleArticles.forEach((a) => a.domain.forEach((d) => domains.add(d)))
    return Array.from(domains).sort()
  }, [])

  return (
    <>
      <Hero />

      <section
        style={{
          maxWidth: '48rem',
          margin: '0 auto',
          padding: '0 clamp(1rem, 4vw, 3rem) 4rem',
        }}
      >
        <FilterBar
          onFilterChange={setFilters}
          availableDomains={availableDomains}
        />

        <div className="fade-up">
          {filtered.length === 0 ? (
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                color: 'var(--vv-muted)',
                fontStyle: 'italic',
                textAlign: 'center',
                padding: '3rem 0',
              }}
            >
              Nenhum artigo encontrado com esses filtros.
            </p>
          ) : (
            filtered.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))
          )}
        </div>

        {/* Contagem */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--vv-muted)',
            textAlign: 'center',
            marginTop: '2rem',
            letterSpacing: '0.06em',
          }}
        >
          {filtered.length} de {sampleArticles.length} publicações
        </p>
      </section>
    </>
  )
}
