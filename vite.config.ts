import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFootnotes from 'remark-footnotes'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export default defineConfig({
  base: '/blog',
  plugins: [
    mdx({
      remarkPlugins: [
        remarkGfm,
        // @ts-ignore — remark-footnotes bundles its own vfile version (type conflict)
        [remarkFootnotes, { inlineNotes: true }],
      ],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    }),
    react(),
    tailwindcss(),
  ],
})
