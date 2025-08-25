import { NextRequest, NextResponse } from 'next/server'
import { updateVote } from '@/lib/kv'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const { vote, action } = await request.json()
    
    if (vote !== 'like' && vote !== 'dislike') {
      return NextResponse.json({ error: 'Invalid vote type' }, { status: 400 })
    }
    
    if (action !== 'add' && action !== 'remove') {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
    
    const voteCounts = await updateVote(slug, vote, action)
    
    return NextResponse.json(voteCounts)
  } catch (error) {
    console.error('Error processing vote:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
