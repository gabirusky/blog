import { useState } from 'react'
import type { ContentType, Tone } from '../../lib/content'
import { typeLabels, toneLabels, domainLabels } from '../../lib/content'

interface FilterBarProps {
  onFilterChange: (filters: {
    type: ContentType | null
    tone: Tone | null
    domain: string | null
  }) => void
  availableDomains: string[]
}

export default function FilterBar({
  onFilterChange,
  availableDomains,
}: FilterBarProps) {
  const [activeType, setActiveType] = useState<ContentType | null>(null)
  const [activeTone, setActiveTone] = useState<Tone | null>(null)
  const [activeDomain, setActiveDomain] = useState<string | null>(null)

  function handleType(t: ContentType | null) {
    setActiveType(t)
    onFilterChange({ type: t, tone: activeTone, domain: activeDomain })
  }

  function handleTone(t: Tone | null) {
    setActiveTone(t)
    onFilterChange({ type: activeType, tone: t, domain: activeDomain })
  }

  function handleDomain(d: string | null) {
    setActiveDomain(d)
    onFilterChange({ type: activeType, tone: activeTone, domain: d })
  }

  const pillStyle = (active: boolean) =>
    ({
      fontFamily: 'var(--font-mono)',
      fontSize: '0.65rem',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      padding: '0.3em 0.7em',
      borderRadius: '3px',
      border: active
        ? '1px solid var(--vv-terracotta)'
        : '1px solid var(--vv-sand)',
      backgroundColor: active ? 'rgba(184, 92, 56, 0.08)' : 'transparent',
      color: active ? 'var(--vv-terracotta)' : 'var(--vv-muted)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      whiteSpace: 'nowrap',
    }) as const

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
        padding: '1rem 0',
        marginBottom: '1rem',
      }}
    >
      {/* Tipos */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'var(--vv-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginRight: '0.3rem',
            minWidth: '3rem',
          }}
        >
          tipo
        </span>
        <button style={pillStyle(!activeType)} onClick={() => handleType(null)}>
          todos
        </button>
        {(Object.keys(typeLabels) as ContentType[]).map((t) => (
          <button
            key={t}
            style={pillStyle(activeType === t)}
            onClick={() => handleType(t)}
          >
            {typeLabels[t]}
          </button>
        ))}
      </div>

      {/* Tons */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'var(--vv-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginRight: '0.3rem',
            minWidth: '3rem',
          }}
        >
          tom
        </span>
        <button style={pillStyle(!activeTone)} onClick={() => handleTone(null)}>
          todos
        </button>
        {(Object.keys(toneLabels) as Tone[]).map((t) => (
          <button
            key={t}
            style={pillStyle(activeTone === t)}
            onClick={() => handleTone(t)}
          >
            {toneLabels[t]}
          </button>
        ))}
      </div>

      {/* Domínios */}
      {availableDomains.length > 0 && (
        <div
          style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'var(--vv-muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginRight: '0.3rem',
              minWidth: '3rem',
            }}
          >
            área
          </span>
          <button
            style={pillStyle(!activeDomain)}
            onClick={() => handleDomain(null)}
          >
            todas
          </button>
          {availableDomains.map((d) => (
            <button
              key={d}
              style={pillStyle(activeDomain === d)}
              onClick={() => handleDomain(d)}
            >
              {domainLabels[d] || d}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
