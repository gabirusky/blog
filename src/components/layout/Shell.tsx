import { type ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

interface ShellProps {
  children: ReactNode
}

export default function Shell({ children }: ShellProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbar />
      <main
        style={{
          flex: 1,
          paddingTop: 'var(--nav-height)',
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}
