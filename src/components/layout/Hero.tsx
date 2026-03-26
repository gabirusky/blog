interface HeroProps {
  title?: string
  subtitle?: string
}

export default function Hero({
  title = 'blog',
  subtitle = 'livre vazão de ideias',
}: HeroProps) {
  return (
    <section
      style={{
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        textAlign: 'center',
        maxWidth: 'var(--wide-max)',
        margin: '0 auto',
      }}
    >
      {/* Foto de perfil */}
      <div
        style={{
          position: 'relative',
        }}
      >
        <div
          style={{
            width: 'clamp(120px, 18vw, 180px)',
            height: 'clamp(120px, 18vw, 180px)',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid var(--vv-sand)',
            boxShadow: '0 8px 32px rgba(44, 36, 22, 0.12)',
          }}
        >
          <img
            src="/profile.png"
            alt="Gabirusky — autor do blog"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
        {/* Acento decorativo */}
        <div
          style={{
            position: 'absolute',
            bottom: '-4px',
            right: '-4px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: 'var(--vv-terracotta)',
          }}
        />
      </div>

      {/* Título */}
      <div>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.8rem, 7vw, 4.5rem)',
            fontWeight: 700,
            color: 'var(--vv-ink)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '0.3em',
          }}
        >
          {title}
          <span style={{ color: 'var(--vv-terracotta)' }}>.</span>
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            color: 'var(--vv-muted)',
            fontStyle: 'italic',
            letterSpacing: '0.01em',
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Linha decorativa */}
      <div
        style={{
          width: '48px',
          height: '2px',
          backgroundColor: 'var(--vv-terracotta)',
          marginTop: '0.5rem',
        }}
      />
    </section>
  )
}
