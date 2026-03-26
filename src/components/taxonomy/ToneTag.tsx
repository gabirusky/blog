import type { Tone } from '../../lib/content'
import { toneLabels } from '../../lib/content'

const toneStyles: Record<Tone, { bg: string; color: string; border: string }> = {
  academic: {
    bg: 'rgba(184, 92, 56, 0.08)',
    color: 'var(--vv-terracotta)',
    border: 'rgba(184, 92, 56, 0.2)',
  },
  hybrid: {
    bg: 'rgba(122, 106, 88, 0.08)',
    color: 'var(--vv-muted)',
    border: 'rgba(122, 106, 88, 0.2)',
  },
  casual: {
    bg: 'rgba(44, 36, 22, 0.05)',
    color: 'var(--vv-ink)',
    border: 'rgba(44, 36, 22, 0.12)',
  },
}

interface ToneTagProps {
  tone: Tone
}

export default function ToneTag({ tone }: ToneTagProps) {
  const style = toneStyles[tone]

  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        padding: '0.2em 0.6em',
        borderRadius: '3px',
        backgroundColor: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
        whiteSpace: 'nowrap',
      }}
    >
      {toneLabels[tone]}
    </span>
  )
}
