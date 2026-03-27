import { useState, useEffect, useCallback } from 'react'

/**
 * Animação de entrada: tela inteira terracota que se contrai
 * em um reveal circular até colapsar no ponto decorativo
 * ao lado da foto de perfil.
 */
export default function IntroReveal() {
  const [phase, setPhase] = useState<'full' | 'shrinking' | 'done'>('full')
  const [dotPos, setDotPos] = useState({ x: '50%', y: '50%' })

  const findDotTarget = useCallback(() => {
    // Posição do ponto decorativo no Hero
    const dot = document.getElementById('hero-dot')
    if (dot) {
      const rect = dot.getBoundingClientRect()
      return {
        x: `${rect.left + rect.width / 2}px`,
        y: `${rect.top + rect.height / 2}px`,
      }
    }
    // Fallback: centro-superior
    return { x: '55%', y: '35%' }
  }, [])

  useEffect(() => {
    // Pequeno delay para o DOM montar e a posição do dot estar certa
    const mountTimer = setTimeout(() => {
      setDotPos(findDotTarget())
      setPhase('shrinking')
    }, 300)

    return () => clearTimeout(mountTimer)
  }, [findDotTarget])

  useEffect(() => {
    if (phase === 'shrinking') {
      const doneTimer = setTimeout(() => {
        setPhase('done')
      }, 1400) // duração da animação
      return () => clearTimeout(doneTimer)
    }
  }, [phase])

  if (phase === 'done') return null

  const clipPath =
    phase === 'full'
      ? 'circle(150% at 50% 50%)'
      : `circle(0% at ${dotPos.x} ${dotPos.y})`

  return (
    <>
      {/* Overlay terracota */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          backgroundColor: 'var(--vv-terracotta)',
          clipPath,
          transition:
            phase === 'shrinking'
              ? 'clip-path 1.2s cubic-bezier(0.77, 0, 0.175, 1)'
              : 'none',
          pointerEvents: 'none',
        }}
      >
        {/* Conteúdo centralizado durante a tela cheia */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: phase === 'full' ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              fontWeight: 700,
              color: 'var(--vv-vellum)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            blog
            <span style={{ color: 'var(--vv-ink)', opacity: 0.3 }}>.</span>
          </span>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
              color: 'rgba(245, 239, 224, 0.6)',
              fontStyle: 'italic',
              marginTop: '0.5rem',
            }}
          >
            livre vazão de ideias
          </span>
        </div>
      </div>

      {/* Grain texture overlay para efeito premium */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          pointerEvents: 'none',
          opacity: phase === 'full' ? 0.04 : 0,
          transition: 'opacity 0.6s ease',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
        }}
      />
    </>
  )
}
