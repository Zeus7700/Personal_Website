import { NextRequest, NextResponse } from 'next/server'
import { getAllTags, getPostsByTag } from '@/lib/posts'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tag = searchParams.get('tag')
    
    if (tag) {
      // Get posts filtered by tag
      const posts = await getPostsByTag(tag)
      return NextResponse.json({ posts, tag })
    } else {
      // Get all available tags
      const tags = await getAllTags()
      return NextResponse.json({ tags })
    }
  } catch (error) {
    console.error('Error fetching tags:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
