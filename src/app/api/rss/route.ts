import { getAllPosts } from '@/lib/posts'
import { NextResponse } from 'next/server'

export async function GET() {
  const posts = await getAllPosts()
  
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Zach Rempell's Blog</title>
    <description>Thoughts on technology, programming, and whatever else comes to mind.</description>
    <link>https://zachrempell.com</link>
    <language>en-us</language>
    <atom:link href="https://zachrempell.com/api/rss" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${post.title}</title>
      <description>${post.description}</description>
      <link>https://zachrempell.com/blog/${post.slug}</link>
      <guid>https://zachrempell.com/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
