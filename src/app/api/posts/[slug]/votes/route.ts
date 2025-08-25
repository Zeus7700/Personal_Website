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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const voteCounts = getVoteCounts(slug)
    
    return NextResponse.json(voteCounts)
  } catch (error) {
    console.error('Error getting vote counts:', error)
    return NextResponse.json({ likes: 0, dislikes: 0 })
  }
}
