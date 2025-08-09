import Link from 'next/link'
import { Container } from '@/components/container'

export function Header() {
  return (
    <header style={{ backgroundColor: 'var(--background)' }}>
      <Container>
        <div className="flex h-16 items-center justify-center">
          <Link 
            href="/" 
            className="text-lg font-medium transition-colors text-[var(--text-primary)] hover:text-[var(--accent-hover)]"
          >
            Zack Rempell
          </Link>
        </div>
      </Container>
    </header>
  )
}
