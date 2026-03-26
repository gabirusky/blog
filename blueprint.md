# gabirusky/blog — Project Blueprint

> A dual-tone creative writing blog where academic rigour meets accessible reflection.
> Stack: React + shadcn/ui + Tailwind CSS v4 · Deployed on GitHub Pages.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Directory Structure](#2-directory-structure)
3. [Frontmatter Schema](#3-frontmatter-schema)
4. [Content Taxonomy](#4-content-taxonomy)
5. [Stack & Integrations](#5-stack--integrations)
6. [Development Roadmap](#6-development-roadmap)
7. [Content Strategy](#7-content-strategy)
8. [Deployment](#8-deployment)

---

## 1. Project Overview

BLOG is a personal creative writing platform built around a deliberate tension: the same author writing deeply sourced academic essays and casual, first-person dispatches — and making that duality visible and navigable for the reader.

### Design identity

| Token | Value |
|---|---|
| Primary font | Cormorant Garamond (display + body prose) |
| Mono font | Fira Code (code, marginalia timestamps) |
| Background | `--vv-vellum: #F5EFE0` |
| Accent | `--vv-terracotta: #B85C38` |
| Ink | `--vv-ink: #2C2416` |
| Muted | `--vv-muted: #7A6A58` |

### Core principle

Every article sits on an **academic–casual axis**. The interface makes that axis visible — through tone tags, prose typesetting, and the companion-piece model — without turning it into a filter bubble. Readers should stumble across an essay when they came for a dispatch.

---

## 2. Directory Structure

```
blog.vazao/
├── public/
│   ├── fonts/                     # Self-hosted Cormorant Garamond
│   └── og-default.png             # Fallback OpenGraph image
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Shell.tsx           # Root layout wrapper
│   │   │   ├── Navbar.tsx          # Sticky nav + reading progress bar
│   │   │   └── Footer.tsx
│   │   ├── article/
│   │   │   ├── ArticleCard.tsx     # Feed card with ToneTag + DomainBadge
│   │   │   ├── TOC.tsx             # Floating table of contents
│   │   │   ├── ReadingProgress.tsx # Scroll-position progress bar
│   │   │   ├── FootnotePopover.tsx # Inline footnote tooltip
│   │   │   ├── AbstractBlock.tsx   # Styled abstract for essays
│   │   │   └── CompanionCallout.tsx# Cross-links Essay ↔ Dispatch
│   │   ├── taxonomy/
│   │   │   ├── ToneTag.tsx         # Academic / Hybrid / Casual pill
│   │   │   ├── DomainBadge.tsx     # Domain tag chip
│   │   │   └── FilterBar.tsx       # Type × Tone × Domain filter UI
│   │   └── ui/                     # shadcn/ui re-exports + overrides
│   │
│   ├── content/
│   │   ├── essays/                 # Long-form, cited .mdx files
│   │   ├── dispatches/             # Short reflective .mdx files
│   │   └── marginalia/             # Annotations and asides .mdx files
│   │
│   ├── pages/
│   │   ├── index.tsx               # Feed with FilterBar
│   │   ├── [slug].tsx              # Article reader
│   │   ├── archive.tsx             # Timeline grouped by month + type
│   │   └── about.tsx
│   │
│   ├── lib/
│   │   ├── content.ts              # MDX parser + frontmatter loader
│   │   ├── seo.ts                  # OpenGraph + JSON-LD generators
│   │   ├── reading-time.ts         # Word-count → minutes estimator
│   │   └── related.ts              # Cosine similarity on domain tags
│   │
│   └── styles/
│       ├── globals.css             # CSS custom properties + font-face
│       └── prose.css               # Dual-scale typography (academic vs casual)
│
├── content.config.ts               # Zod frontmatter schema (single source of truth)
├── vite.config.ts
├── tailwind.config.ts
└── .github/
    └── workflows/
        └── deploy.yml              # Vite build → Pagefind index → gh-pages
```

---

## 3. Frontmatter Schema

Every MDX file is validated at build time against the Zod schema defined in `content.config.ts`. The fields below are the canonical spec.

### Required fields — all types

```yaml
title:        "The Invisible Labor of reCAPTCHA"   # ≤ 120 chars
slug:         recaptcha-invisible-labor              # lowercase-hyphenated
date:         "2025-09-14"                           # ISO 8601, not in the future
type:         essay                                  # essay | dispatch | marginalia
tone:         academic                               # academic | hybrid | casual
domain:       [technology-ai, labor-ethics]          # 1–4 values from controlled vocab
abstract:     "Short teaser shown on cards and RSS." # 40–280 chars
```

### Optional fields

```yaml
draft:        true                    # Excluded from feed; accessible by direct URL
publishAt:    "2025-10-01"            # Requires draft: true
lastEdited:   "2025-09-20"
tags:         [palantir, recaptcha]   # Freeform, for search indexing only (max 8)
readingTime:  12                      # Auto-generated; override if estimate is wrong
```

### Academic apparatus (Essays)

```yaml
refs:          true                   # Required for type: essay
citationStyle: abnt                   # abnt | chicago | apa
bibFile:       ./refs.bib             # External .bib file (mutually exclusive with references[])
references:                           # Inline references (for short pieces only)
  - id:      zuboff2019
    authors: ["Zuboff, Shoshana"]
    title:   "The Age of Surveillance Capitalism"
    year:    2019
    source:  "PublicAffairs"
```

### Companion linking

```yaml
companionSlug:  recaptcha-what-i-couldnt-footnote
companionLabel: "Read the informal companion →"    # ≤ 60 chars, optional
```

### Display options

```yaml
heroImage:    /images/recaptcha-hero.jpg   # Root-relative or full URL
heroAlt:      "A reCAPTCHA checkbox..."    # Required when heroImage is set; ≤ 125 chars
noToc:        false                        # Disables floating TOC
comments:     true                         # Enables Giscus widget
proseStyle:   academic                     # Overrides tone for typesetting only
```

### SEO block

```yaml
seo:
  title:       "reCAPTCHA and invisible labor"  # ≤ 60 chars
  description: "How reCAPTCHA turns..."         # ≤ 155 chars
  ogImage:     /images/recaptcha-og.jpg
  noIndex:     false
```

### Cross-field validation rules

| Rule | Error |
|---|---|
| `type: essay` → `refs` must be `true` | Essays must declare references |
| `type: essay` → `citationStyle` cannot be `none` | Essays must name a citation style |
| `type: marginalia` → `tone` cannot be `academic` | Marginalia must be hybrid or casual |
| `heroImage` set → `heroAlt` required | Always provide alt text |
| `publishAt` set → `draft` must be `true` | Scheduled posts must be drafts |
| `bibFile` set → `references[]` must be empty | Use one reference strategy per article |

---

## 4. Content Taxonomy

### The three content types

| Type | Voice | Length | Apparatus |
|---|---|---|---|
| **Essay** | Third-person or authorial | 2 000–8 000 words | Abstract, footnotes, bibliography |
| **Dispatch** | First-person, reflective | 400–1 200 words | Links in prose, no citation required |
| **Marginalia** | Any | No minimum | Single paragraph permitted |

### The tone axis

```
◀─────────────────────────────────────────▶
  academic          hybrid           casual
  ─────────         ──────           ──────
  Justified text    Either/both      Ragged-right
  Tight leading     Mixed register   Open leading
  Footnotes         Optional refs    Links only
  Abstract header   Optional         None
```

### Controlled domain vocabulary

**Research domains** (terracotta badges)
- `technology-ai` · `labor-ethics` · `philosophy-of-mind` · `surveillance-power`

**Society & data domains** (blue badges)
- `data-society` · `civic-technology` · `climate-environment`

**Writing domains** (green badges)
- `language-writing` · `creative-fiction` · `prose-craft`

**Personal** (gray badge)
- `personal`

### Reader-facing tone labels

| Internal value | Label shown to reader | Signal |
|---|---|---|
| `academic` | Rigorously sourced | Footnotes, abstract, structured argument |
| `hybrid` | Research-informed | Sourced but conversational |
| `casual` | Personal dispatch | First-person, no citation apparatus |

---

## 5. Stack & Integrations

### Core stack

| Package | Purpose |
|---|---|
| `react` + `vite` | SPA with hash routing (required for GitHub Pages) |
| `shadcn/ui` | Headless component primitives; overridden with blog.vazao tokens |
| `tailwindcss` v4 | Design token layer; CSS vars map to Tailwind scale |
| `@mdx-js/rollup` | MDX pipeline plugin for Vite |
| `zod` | Build-time frontmatter validation |
| `react-router-dom` (HashRouter) | Client-side routing without server rewrites |

### MDX plugins

| Plugin | Role |
|---|---|
| `remark-gfm` | Tables, task lists, strikethrough |
| `remark-footnotes` | `[^1]` footnote syntax for essays |
| `rehype-slug` | Auto-generates `id` attributes on headings |
| `rehype-autolink-headings` | Adds anchor links for TOC deep-linking |

### Typography

```bash
npm install @fontsource/cormorant-garamond @fontsource/fira-code
```

Self-host via Fontsource; load only the weights you use (400, 500, 600 for Cormorant; 400 for Fira Code) to keep the initial bundle lean.

### Discovery & search

| Tool | Why |
|---|---|
| **Pagefind** | Static, client-side full-text search. Built as a post-Vite step. Zero hosting cost. |
| **npm: feed** | Generates `/rss.xml` at build time. Academics and power users expect it. |
| **JSON-LD** | `schema.org/Article` structured data auto-generated from frontmatter via `seo.ts`. |

### Analytics

**Umami** — self-hosted on Vercel free tier. LGPD-compliant (no cookies, no personal data). Ping from GitHub Pages via the Umami script tag.

Custom events to instrument:
- TOC section clicks (tracks reading depth)
- CompanionCallout clicks (tracks companion-piece engagement)
- Filter combinations used in FilterBar

### Comments (optional — Phase 4)

**Giscus** backed by GitHub Discussions. Enable per-article via `comments: true` in frontmatter. Essays only by default.

---

## 6. Development Roadmap

### Phase 1 — Foundation & design tokens (Weeks 1–2)

- [ ] Scaffold: `npm create vite@latest` with React + TypeScript
- [ ] Configure `base` in `vite.config.ts` for GitHub Pages subpath
- [ ] Define CSS custom properties in `globals.css`:
  ```css
  :root {
    --vv-vellum:     #F5EFE0;
    --vv-terracotta: #B85C38;
    --vv-ink:        #2C2416;
    --vv-muted:      #7A6A58;
  }
  ```
- [ ] Install + self-host Cormorant Garamond and Fira Code via Fontsource
- [ ] Install and init shadcn/ui; override `Card`, `Badge`, `Separator` with custom tokens
- [ ] Build `Shell`, `Navbar` (sticky, with reading-progress bar), `Footer`
- [ ] Set up GitHub Actions deploy workflow (see Section 8)

### Phase 2 — Content engine & taxonomy UI (Weeks 3–5)

- [ ] Configure MDX pipeline: `@mdx-js/rollup` + all remark/rehype plugins
- [ ] Write `content.config.ts` — Zod schema (see Section 3)
- [ ] Write `src/lib/content.ts` — loads + validates all MDX files at startup
- [ ] Build `ArticleCard` with `ToneTag` and `DomainBadge`
- [ ] Build `FilterBar` — type × tone × domain; persist state to URL hash params
- [ ] Build article reader page with `TOC`, `FootnotePopover`, `AbstractBlock`
- [ ] Write `prose.css` — dual typography scale:
  - Academic: justified, `line-height: 1.65`, tighter paragraph spacing
  - Casual: ragged-right, `line-height: 1.8`, more paragraph air

### Phase 3 — Discovery & performance (Weeks 6–8)

- [ ] Pagefind integration: run `npx pagefind --site dist` after `vite build`; add `Cmd+K` search modal
- [ ] RSS feed: generate `/dist/rss.xml` via `npm: feed` in a pre-deploy script
- [ ] SEO: write `seo.ts` to generate OpenGraph tags + `schema.org/Article` JSON-LD from frontmatter
- [ ] Archive page: timeline view grouped by month, filterable by type
- [ ] Umami: add script tag; configure custom events for TOC and companion clicks
- [ ] Performance: lazy-load images with blur placeholder; preload Cormorant subset for above-fold text

### Phase 4 — Polish & editorial features (Weeks 9–12)

- [ ] Custom MDX components:
  - `<Callout>` — nota bene / aside block
  - `<Sidenote>` — inline margin annotation (displayed in gutter on wide screens)
  - `<AbstractBlock>` — styled academic abstract header
- [ ] `related.ts` — cosine similarity on domain tags at build time; renders "You might also read" section
- [ ] Dark mode toggle: swap vellum palette to slate; store preference in `localStorage`
- [ ] Print stylesheet: clean, footnote-visible, no UI chrome
- [ ] Giscus comments: conditionally mounted when `comments: true` in frontmatter
- [ ] `CompanionCallout` component: renders at the bottom of any article with `companionSlug` set

---

## 7. Content Strategy

### The companion-piece model

The strongest recurring content pattern for blog.vazao. Publish the Essay first; release the companion Dispatch 1–2 weeks later.

```
Essay:    "O Campo de Batalha Algorítmico"
              ↓  2 weeks later
Dispatch: "O que não coube nas notas de rodapé"
```

The Dispatch unpacks what the formal register couldn't say — reactions, doubts, things that were too speculative for the bibliography. This creates natural content clusters and gives casual readers a low-friction entry point into the academic work.

Link them bidirectionally via `companionSlug` in frontmatter. The `CompanionCallout` component renders at the bottom of both.

### The dual-register rules

**Essay rules (academic register)**
- Abstract at the top, before the body
- Footnotes over inline parentheticals
- Visible argument structure: thesis → evidence → implication
- ABNT for Brazilian sources; Chicago author-date elsewhere
- No first-person in the body (authorial we is acceptable)

**Dispatch rules (casual register)**
- First-person throughout
- Allowed to not conclude — a dispatch can end in a question
- No citations required; link in prose instead
- Can be written in one sitting; rawness is a feature
- The voice is the argument

**Marginalia rules**
- No length requirement; one paragraph is a valid post
- Used for: a link worth framing, a quote that struck you, a correction to an earlier piece
- Always `tone: hybrid` or `tone: casual`

### Editorial cadence

| Type | Target frequency |
|---|---|
| Essay | 1 per month |
| Dispatch | 2–3 per month |
| Marginalia | As they happen |

**Planning principle:** Align long Essays with FATEC submission cycles, when research is already underway. Use the post-submission window for a Dispatch burst — that's when the ideas are freshest and the formal constraint has just lifted.

### Topic anchors

These three domains are the permanent center of gravity for blog.vazao. New pieces should either belong here or be clearly marked as departures (via `domain: [personal]`).

1. **AI ethics & militarization** — LLMs, Palantir, surveillance, the battlefield algorithm
2. **Labor, data, and invisible work** — reCAPTCHA, technofeudalismo, platform capitalism
3. **Philosophy of mind & cognition** — Hofstadter, Metzinger, LLMs as phenomenological probes

### SEO posture by type

| Type | Target query shape | Meta description source |
|---|---|---|
| Essay | Long-tail academic ("`reCAPTCHA labor exploitation`") | `abstract` field |
| Dispatch | Conversational / opinion ("`what is technofeudalismo`") | First paragraph |
| Marginalia | Brand / direct (reader already knows the blog) | `abstract` field |

---

## 8. Deployment

### GitHub Actions workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy BLOG

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci

      - name: Build
        run: npm run build

      - name: Index content (Pagefind)
        run: npx pagefind --site dist

      - name: Generate RSS feed
        run: npm run generate:rss

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

      - uses: actions/deploy-pages@v4
```

### Vite config for GitHub Pages

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default defineConfig({
  base: "/",           // or "/repo-name/" if not on a custom domain
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm, remarkFootnotes],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    }),
    react(),
  ],
});
```

### Routing for GitHub Pages

Use `HashRouter` — GitHub Pages does not support server-side rewrites. `BrowserRouter` will 404 on direct URL access.

```tsx
// src/main.tsx
import { HashRouter } from "react-router-dom";

<HashRouter>
  <App />
</HashRouter>
```

---

*Blueprint version 1.0 · gabirusky/blog · Generated for gabirusky.github.io*
