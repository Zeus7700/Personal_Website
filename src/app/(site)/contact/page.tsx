import { Container } from '@/components/container'
import { PageNav } from '@/components/page-nav'
import { Prose } from '@/components/prose'
import { getMarkdownContent } from '@/lib/content'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
}

export default async function ContactPage() {
  const content = await getMarkdownContent('contact.md')

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--text-secondary)' }}>
      <Container className="py-16 max-w-2xl">
        <PageNav />
        <Prose>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Prose>
      </Container>
    </div>
  )
}
