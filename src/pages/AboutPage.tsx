export default function AboutPage() {
  return (
    <section
      style={{
        maxWidth: '42rem',
        margin: '0 auto',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem)',
      }}
    >
      {/* Cabeçalho */}
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <div
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
            margin: '0 auto 1.5rem',
            border: '2px solid var(--vv-sand)',
          }}
        >
          <img
            src={`profile blog.png`}
            alt="Gabirusky"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2rem',
            fontWeight: 600,
            color: 'var(--vv-ink)',
            marginBottom: '0.5rem',
          }}
        >
          sobre
        </h1>
        <div
          style={{
            width: '32px',
            height: '2px',
            backgroundColor: 'var(--vv-terracotta)',
            margin: '0 auto',
          }}
        />
      </div>

      {/* Corpo */}
      <div className="prose prose-casual">
        <p>
          Este blog existe na tensão entre duas vozes: a acadêmica, que precisa de notas de
          rodapé e referências para respirar, e a pessoal, que quer dizer com as próprias
          palavras o que a bibliografia não alcança.
        </p>

        <p>
          Escrevo sobre inteligência artificial, ética do trabalho digital, vigilância,
          filosofia da mente e, às vezes, sobre nada que seja publicável. São ensaios
          longos, despachos curtos e marginálias que mal dão um parágrafo.
        </p>

        <p>
          A ideia de <em>livre vazão</em> é justamente essa: não escolher um registro e
          fingir que os outros não existem. O rigor e o rascunho moram no mesmo endereço.
        </p>

        <blockquote>
          <p>
            A escrita é o que acontece quando a pesquisa transborda do formato que lhe foi
            dado.
          </p>
        </blockquote>

        <p>
          Se quiser conversar sobre algo que leu aqui, ou discordar publicamente de algo
          que escrevi, fique à vontade.
        </p>
      </div>

      {/* Links */}
      <div
        style={{
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--vv-sand)',
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
        }}
      >
        <a
          href="https://github.com/gabirusky"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.06em',
            color: 'var(--vv-muted)',
            textTransform: 'uppercase',
            borderBottom: '1px solid transparent',
            transition: 'color 0.2s, border-color 0.2s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.color = 'var(--vv-terracotta)'
            el.style.borderBottomColor = 'var(--vv-terracotta)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.color = 'var(--vv-muted)'
            el.style.borderBottomColor = 'transparent'
          }}
        >
          github
        </a>
      </div>
    </section>
  )
}
