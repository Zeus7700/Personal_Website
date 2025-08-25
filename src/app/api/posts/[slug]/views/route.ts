import { NextRequest, NextResponse } from 'next/server'
import { getViewCount, incrementViewCount } from '@/lib/kv'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const views = await getViewCount(slug)
    
    return NextResponse.json({ views })
  } catch (error) {
    console.error('Error getting view count:', error)
    return NextResponse.json({ views: 0 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const views = await incrementViewCount(slug)
    
    return NextResponse.json({ views })
  } catch (error) {
    console.error('Error incrementing view count:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
