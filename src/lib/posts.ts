import fs from 'fs'
import path from 'path'
import { z } from 'zod'
import { marked } from 'marked'

const frontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
})

export type Post = z.infer<typeof frontmatterSchema> & {
  slug: string
  content: string
  readTime: number
}

export async function getAllPosts(): Promise<Post[]> {
  const contentDir = path.join(process.cwd(), 'content', 'blog')
  
  if (!fs.existsSync(contentDir)) {
    return []
  }

  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.mdx'))
  
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, '')
      const filePath = path.join(contentDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      
      // Parse frontmatter
      const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
      const match = fileContent.match(frontmatterRegex)
      
      if (!match) {
        throw new Error(`No frontmatter found in ${file}`)
      }
      
      const frontmatterYaml = match[1]
      const content = match[2]
      
      // Simple YAML parsing for frontmatter
      const frontmatter: Record<string, string> = {}
      frontmatterYaml.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':')
        if (key && valueParts.length > 0) {
          frontmatter[key.trim()] = valueParts.join(':').trim()
        }
      })
      
      const validatedFrontmatter = frontmatterSchema.parse(frontmatter)
      
      // Parse markdown content to HTML
      const htmlContent = await marked(content)
      
      // Calculate read time (average 200 words per minute)
      const wordCount = content.split(/\s+/).length
      const readTime = Math.ceil(wordCount / 200)
      
      return {
        slug,
        content: htmlContent,
        readTime,
        ...validatedFrontmatter,
      }
    })
  )
  
  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts()
  return posts.find(post => post.slug === slug) || null
}
