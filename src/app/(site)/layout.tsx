import { ReactNode } from 'react'
import { Footer } from '@/components/footer'
import { ThemeProvider } from '@/lib/theme-context'

interface SiteLayoutProps {
  children: ReactNode
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
