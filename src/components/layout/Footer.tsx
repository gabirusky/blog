export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: '1px solid var(--vv-sand)',
        padding: '2.5rem clamp(1rem, 4vw, 3rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.8rem',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '0.95rem',
          color: 'var(--vv-muted)',
          fontStyle: 'italic',
        }}
      >
        livre vazão de ideias
      </p>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--vv-muted)',
          letterSpacing: '0.06em',
        }}
      >
        © {year} gabirusky · construído com café e indignação
      </p>
    </footer>
  )
}
