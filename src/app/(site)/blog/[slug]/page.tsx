import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/container'
import { PageNav } from '@/components/page-nav'
import { Prose } from '@/components/prose'
import { ReactionButtons } from '@/components/reaction-buttons'
import { ViewTracker } from '@/components/view-tracker'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  
  return {
    title: post.title,
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--text-secondary)' }}>
      <ViewTracker postSlug={slug} />
      <Container className="py-16 max-w-2xl">
        <PageNav />
        <article>
          <header className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Link 
                href="/blog"
                className="text-[var(--text-muted)] hover:text-[var(--accent-hover)] transition-colors"
                aria-label="Back to blog"
              >
                ←
              </Link>
              <h1 className="text-2xl font-medium" style={{ color: 'var(--text-primary)' }}>{post.title}</h1>
            </div>
            <p className="text-base" style={{ color: 'var(--accent-hover)' }}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })} · {post.readTime} min read
            </p>
          </header>
          
          <Prose>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </Prose>
          
          <footer className="mt-16 pt-8 border-t border-[var(--accent-hover)]">
            <div className="flex justify-between items-start">
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                <p className="mb-4">RELATED</p>
                <div className="space-y-2">
                  <div>
                    <Link href="/blog" className="underline transition-all text-[var(--text-secondary)] hover:text-[var(--accent-hover)]">
                      More posts ↗
                    </Link>
                    <span className="ml-4">All posts</span>
                  </div>
                </div>
              </div>
              <ReactionButtons postSlug={slug} />
            </div>
          </footer>
        </article>
      </Container>
    </div>
  )
}
