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

  // Add target="_blank" to external links and PDFs when missing
  htmlContent = htmlContent.replace(
    /<a href="([^"]+)"([^>]*)>/g,
    (match, href, attrs) => {
      const isExternal = /^https?:\/\//.test(href)
      const isPdf = href.toLowerCase().endsWith('.pdf')
      const hasTarget = /target\s*=/.test(attrs)

      if ((isExternal || isPdf) && !hasTarget) {
        return `<a href="${href}" target="_blank" rel="noopener noreferrer"${attrs}>`
      }

      return match
    }
  )

  return htmlContent
}
