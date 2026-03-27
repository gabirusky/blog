# blog.vazao

> **blog** · *livre vazão de ideias*.
> blog pessoal de [gabirusky](https://github.com/gabirusky) · hospedado em [gabirusky.github.io/blog](https://gabirusky.github.io/blog).

Uma plataforma de escrita criativa construída em torno de uma tensão deliberada: o mesmo autor escrevendo ensaios acadêmicos rigorosamente referenciados e despachos pessoais casuais, tornando essa dualidade visível e navegável para o leitor.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 19 + Vite 8 |
| Linguagem | TypeScript |
| Estilização | CSS custom properties (sem framework) |
| Roteamento | `react-router-dom` v6 com **HashRouter** (GitHub Pages) |
| Conteúdo | MDX via `@mdx-js/rollup` |
| Validação | Zod (schema de frontmatter) |
| Tipografia | Cormorant Garamond + Fira Code via Fontsource (self-hosted) |
| Deploy | GitHub Actions → GitHub Pages |

---

## Design System

| Token | Valor | Uso |
|---|---|---|
| `--vv-vellum` | `#F5EFE0` | Background principal |
| `--vv-terracotta` | `#B85C38` | Acento, CTAs, headings activos |
| `--vv-ink` | `#2C2416` | Texto principal |
| `--vv-muted` | `#7A6A58` | Texto secundário, metadados |
| `--vv-sand` | `#E8DFC8` | Bordas, separadores |
| `--vv-cream` | `#FBF8F2` | Backgrounds de cards/sidebar |
| `--font-serif` | Cormorant Garamond | Todo o conteúdo editorial |
| `--font-mono` | Fira Code | Metadados, tags, labels |

---

## Estrutura do Projeto

```
blog.vazao/
├── public/
│   ├── profile.png              # Foto de perfil (sem fundo)
│   └── favicon.svg              # Favicon "G" em dark
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Shell.tsx        # Wrapper raiz (Navbar + main + Footer)
│   │   │   ├── Navbar.tsx       # Nav fixo + barra de progresso de leitura
│   │   │   ├── Footer.tsx       # Rodapé com subtítulo
│   │   │   ├── Hero.tsx         # Seção hero com foto + título + ponto decorativo
│   │   │   └── IntroReveal.tsx  # Animação de entrada (clip-path circular → ponto)
│   │   ├── article/
│   │   │   └── ArticleCard.tsx  # Card do feed com tipo, data, abstract, domínios
│   │   └── taxonomy/
│   │       ├── DomainBadge.tsx  # Chip colorido por área de domínio
│   │       └── FilterBar.tsx    # Filtro tipo × domínio (pílulas em mono)
│   │
│   ├── lib/
│   │   └── content.ts           # Tipos, labels ptbr, helpers de data/leitura
│   │
│   ├── pages/
│   │   ├── FeedPage.tsx         # Feed principal com Hero + FilterBar + cards
│   │   ├── ArticlePage.tsx      # Leitor de artigo (layout 2 colunas para ensaios)
│   │   ├── ArchivePage.tsx      # Arquivo cronológico agrupado por mês
│   │   └── AboutPage.tsx        # Página sobre
│   │
│   ├── styles/
│   │   └── prose.css            # Tipografia do corpo de artigo
│   │
│   ├── types/
│   │   └── mdx.d.ts             # Tipos para imports MDX
│   │
│   ├── App.tsx                  # Roteamento + IntroReveal
│   ├── main.tsx                 # Entrada com HashRouter
│   └── index.css                # Tokens globais + reset + utilitários
│
├── blueprint.md                 # Especificação completa do projeto
├── CONTEXT.md                   # Contexto para agentes de codificação
└── vite.config.ts               # Config Vite com MDX + Tailwind + base GitHub Pages
```

---

## Tipos de Conteúdo

| Tipo | Voz | Tamanho | Aparato |
|---|---|---|------|
| **Ensaio** | Terceira pessoa ou autoral | 2.000–8.000 palavras | Resumo, notas de rodapé, bibliografia |
| **Despacho** | Primeira pessoa, reflexiva | 400–1.200 palavras | Links em prosa, sem citação obrigatória |
| **Marginália** | Qualquer | Sem mínimo | Um parágrafo é publicação válida |

### Domínios disponíveis

**Pesquisa** (badges terracota) — `technology-ai` · `labor-ethics` · `philosophy-of-mind` · `surveillance-power`

**Sociedade & Dados** (badges azul) — `data-society` · `civic-technology` · `climate-environment`

**Escrita** (badges verde) — `language-writing` · `creative-fiction` · `prose-craft`

**Pessoal** (badge cinza) — `personal`

---

## Frontmatter Schema

Todo arquivo MDX em `src/content/` deve conter:

```yaml
# Obrigatório (todos os tipos)
title:    "Título do artigo"           # ≤ 120 chars
slug:     titulo-do-artigo             # lowercase-hifenizado
date:     "2025-09-14"                 # ISO 8601
type:     essay                        # essay | dispatch | marginalia
domain:   [technology-ai, labor-ethics] # 1–4 valores do vocabulário controlado
abstract: "Descrição curta."           # 40–280 chars

# Opcional
draft:         true
tags:          [palantir, recaptcha]
readingTime:   12                      # auto-gerado; substituir se errado
companionSlug: outro-artigo-slug
companionLabel: "Leia o ensaio →"
heroImage:     /images/exemplo.jpg
heroAlt:       "Descrição da imagem"
```

---

## Desenvolvimento Local

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build de produção
npm run preview    # preview do build
```

---

## Deploy

O deploy é automático via GitHub Actions em todo push para `main`.

O workflow:
1. Instala dependências (`npm ci`)
2. Builda (`npm run build`)
3. Indexa com Pagefind (`npx pagefind --site dist`)
4. Faz upload e deploy no GitHub Pages

O `HashRouter` é obrigatório — GitHub Pages não suporta rewrites de servidor. URLs ficam no formato `gabirusky.github.io/blog/#/arquivo`.

---

## Princípio Editorial

Todo artigo existe em um **eixo ensaio–despacho**. O modelo de peça-complementar (*companion piece*) é o padrão recorrente mais forte: publica-se o Ensaio primeiro; semanas depois, o Despacho desempacota o que o registro formal não conseguiu dizer — as dúvidas, reações e especulações que ficaram fora da bibliografia.

Tema âncoras: **ética da IA & militarização** · **trabalho, dados e invisibilidade** · **filosofia da mente & cognição**.

Todo o conteúdo é em **português brasileiro** exclusivamente.
