import Link from 'next/link'
import { Container } from '@/components/container'
import { PageNav } from '@/components/page-nav'
import { getAllPosts } from '@/lib/posts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      <Container className="py-16 max-w-2xl">
        <PageNav />
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.slug}>
              <Link 
                href={`/blog/${post.slug}`}
                className="underline transition-colors text-[var(--text-secondary)] decoration-[var(--text-muted)] hover:text-[var(--accent-hover)] hover:decoration-[var(--accent-hover)]"
              >
                {post.title} ↗
              </Link>
              <span className="text-sm ml-8" style={{ color: 'var(--text-muted)' }}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          ))}
          
          {posts.length === 0 && (
            <div className="text-center py-12">
              <p style={{ color: 'var(--text-muted)' }}>No posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
