import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
      setScrolled(scrollTop > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { to: '/', label: 'início' },
    { to: '/arquivo', label: 'arquivo' },
    { to: '/sobre', label: 'sobre' },
  ]

  return (
    <>
      {/* Barra de progresso de leitura */}
      <div
        className="reading-progress"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progresso de leitura"
      />

      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 'var(--nav-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(1rem, 4vw, 3rem)',
          zIndex: 50,
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          backgroundColor: scrolled
            ? 'rgba(245, 239, 224, 0.85)'
            : 'transparent',
          borderBottom: scrolled
            ? '1px solid var(--vv-sand)'
            : '1px solid transparent',
          transition:
            'background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.3rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--vv-ink)',
            cursor: 'pointer',
          }}
        >
          blog<span style={{ color: 'var(--vv-terracotta)' }}>.</span>
        </Link>

        {/* Links */}
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          {navLinks.map(({ to, label }) => {
            const isActive =
              to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(to)

            return (
              <Link
                key={to}
                to={to}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: isActive
                    ? 'var(--vv-terracotta)'
                    : 'var(--vv-muted)',
                  transition: 'color 0.2s ease',
                  cursor: 'pointer',
                  borderBottom: isActive
                    ? '2px solid var(--vv-terracotta)'
                    : '2px solid transparent',
                  paddingBottom: '2px',
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.target as HTMLElement).style.color = 'var(--vv-ink)'
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.target as HTMLElement).style.color = 'var(--vv-muted)'
                }}
              >
                {label}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
