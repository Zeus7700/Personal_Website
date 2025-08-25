import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface VoteData {
  likes: number
  dislikes: number
}

function getVotesFilePath(slug: string): string {
  return path.join(process.cwd(), 'data', 'votes', `${slug}.json`)
}

function ensureVotesDirectory(): void {
  const votesDir = path.join(process.cwd(), 'data', 'votes')
  if (!fs.existsSync(votesDir)) {
    fs.mkdirSync(votesDir, { recursive: true })
  }
}

function getVoteCounts(slug: string): VoteData {
  ensureVotesDirectory()
  const filePath = getVotesFilePath(slug)
  
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, 'utf8')
      return JSON.parse(data)
    } catch (error) {
      console.error('Error reading vote data:', error)
    }
  }
  
  return { likes: 0, dislikes: 0 }
}

function saveVoteCounts(slug: string, voteCounts: VoteData): void {
  ensureVotesDirectory()
  const filePath = getVotesFilePath(slug)
  
  try {
    fs.writeFileSync(filePath, JSON.stringify(voteCounts, null, 2))
  } catch (error) {
    console.error('Error saving vote data:', error)
  }
}

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
    
    const voteCounts = getVoteCounts(slug)
    
    if (action === 'add') {
      // Remove any existing vote first (single selection)
      if (vote === 'like') {
        voteCounts.likes += 1
        voteCounts.dislikes = Math.max(0, voteCounts.dislikes - 1)
      } else {
        voteCounts.dislikes += 1
        voteCounts.likes = Math.max(0, voteCounts.likes - 1)
      }
    } else {
      // Remove vote
      if (vote === 'like') {
        voteCounts.likes = Math.max(0, voteCounts.likes - 1)
      } else {
        voteCounts.dislikes = Math.max(0, voteCounts.dislikes - 1)
      }
    }
    
    saveVoteCounts(slug, voteCounts)
    
    return NextResponse.json(voteCounts)
  } catch (error) {
    console.error('Error processing vote:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
