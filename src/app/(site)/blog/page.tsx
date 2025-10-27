import Link from 'next/link'
import { Container } from '@/components/container'
import { PageNav } from '@/components/page-nav'
import { getAllPosts, getPostsByTag } from '@/lib/posts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
}

interface BlogPageProps {
  searchParams: Promise<{ tag?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { tag } = await searchParams
  const posts = tag ? await getPostsByTag(tag) : await getAllPosts()

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      <Container className="py-16 max-w-2xl">
        <PageNav />
        
        {/* Tag Filter Header */}
        {tag && (
          <div className="mb-8">
            <h2 className="text-2xl font-medium" style={{ color: 'var(--text-primary)' }}>
              Tag: {tag}
            </h2>
            <Link href="/blog" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200">
              ← Back to all posts
            </Link>
          </div>
        )}
        
        <div className="markdown-content space-y-4">
          {posts.map((post) => (
            <div key={post.slug}>
              <Link 
                href={`/blog/${post.slug}`}
                className="relative whitespace-nowrap"
              >
                {post.title}
              </Link>
              <span className="text-sm ml-4" style={{ color: 'var(--text-primary)' }}>
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
