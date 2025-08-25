import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface ViewData {
  views: number
}

function getViewsFilePath(slug: string): string {
  return path.join(process.cwd(), 'data', 'views', `${slug}.json`)
}

function ensureViewsDirectory(): void {
  const viewsDir = path.join(process.cwd(), 'data', 'views')
  if (!fs.existsSync(viewsDir)) {
    fs.mkdirSync(viewsDir, { recursive: true })
  }
}

function getViewCount(slug: string): ViewData {
  ensureViewsDirectory()
  const filePath = getViewsFilePath(slug)
  
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, 'utf8')
      return JSON.parse(data)
    } catch (error) {
      console.error('Error reading view data:', error)
    }
  }
  
  return { views: 0 }
}

function saveViewCount(slug: string, viewData: ViewData): void {
  ensureViewsDirectory()
  const filePath = getViewsFilePath(slug)
  
  try {
    fs.writeFileSync(filePath, JSON.stringify(viewData, null, 2))
  } catch (error) {
    console.error('Error saving view data:', error)
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const viewData = getViewCount(slug)
    
    return NextResponse.json(viewData)
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
    const viewData = getViewCount(slug)
    
    // Increment view count
    viewData.views += 1
    
    saveViewCount(slug, viewData)
    
    return NextResponse.json(viewData)
  } catch (error) {
    console.error('Error incrementing view count:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
