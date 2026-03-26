import { domainLabels, domainColors } from '../../lib/content'

const colorMap: Record<string, { bg: string; color: string; border: string }> = {
  terracotta: {
    bg: 'rgba(184, 92, 56, 0.08)',
    color: '#B85C38',
    border: 'rgba(184, 92, 56, 0.18)',
  },
  blue: {
    bg: 'rgba(37, 99, 235, 0.06)',
    color: '#2563EB',
    border: 'rgba(37, 99, 235, 0.15)',
  },
  green: {
    bg: 'rgba(22, 163, 74, 0.06)',
    color: '#16A34A',
    border: 'rgba(22, 163, 74, 0.15)',
  },
  gray: {
    bg: 'rgba(122, 106, 88, 0.06)',
    color: '#7A6A58',
    border: 'rgba(122, 106, 88, 0.15)',
  },
}

interface DomainBadgeProps {
  domain: string
}

export default function DomainBadge({ domain }: DomainBadgeProps) {
  const colorKey = domainColors[domain] || 'gray'
  const colors = colorMap[colorKey] || colorMap.gray
  const label = domainLabels[domain] || domain

  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        letterSpacing: '0.04em',
        padding: '0.15em 0.5em',
        borderRadius: '2px',
        backgroundColor: colors.bg,
        color: colors.color,
        border: `1px solid ${colors.border}`,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  )
}
