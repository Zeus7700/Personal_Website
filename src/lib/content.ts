import fs from 'fs'
import path from 'path'
import { marked } from 'marked'

export async function getMarkdownContent(filename: string): Promise<string> {
  const contentDir = path.join(process.cwd(), 'content')
  const filePath = path.join(contentDir, filename)
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Content file not found: ${filename}`)
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf8')
  let htmlContent = await marked(fileContent)
  
  // Post-process HTML to add target="_blank" to external links and PDFs
  htmlContent = htmlContent.replace(
    /<a href="(https?:\/\/[^"]+)"([^>]*)>/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer"$2>'
  )
  
  // Add target="_blank" to PDF links
  htmlContent = htmlContent.replace(
    /<a href="([^"]*\.pdf)"([^>]*)>/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer"$2>'
  )
  
  return htmlContent
}
