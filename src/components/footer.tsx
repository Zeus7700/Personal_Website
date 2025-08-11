'use client'

import Link from 'next/link'
import { Container } from './container'
import { ExternalLink } from './external-link'
import { AnimatedText } from './animated-text'

export function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--background)'}}>
      <Container>
        <div className="py-8 flex justify-between items-center text-sm" style={{ color: 'var(--text-muted)' }}>
          <Link 
            href="/" 
            className="text-sm font-medium transition-colors text-[var(--text-muted)] hover:text-[var(--accent-hover)]"
            style={{
              position: 'relative',
              display: 'inline-block'
            }}
          >
            <AnimatedText text="Zack Rempell" />
          </Link>
          <div className="flex items-center space-x-4 text-xs">
            <ExternalLink href="https://www.linkedin.com/in/zachary-rempell">
              LinkedIn
            </ExternalLink>
            <ExternalLink href="/resume.pdf">
              Resume
            </ExternalLink>
          </div>
        </div>
      </Container>
    </footer>
  )
}
