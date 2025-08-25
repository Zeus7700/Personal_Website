import { NextRequest, NextResponse } from 'next/server'
import { getVoteCounts } from '@/lib/kv'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const voteCounts = await getVoteCounts(slug)
    
    return NextResponse.json(voteCounts)
  } catch (error) {
    console.error('Error getting vote counts:', error)
    return NextResponse.json({ likes: 0, dislikes: 0 })
  }
}
