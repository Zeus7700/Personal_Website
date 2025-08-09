import fs from 'fs'
import path from 'path'
import { z } from 'zod'

const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  url: z.string(),
  summary: z.string(),
  tech: z.array(z.string()),
})

export type Project = z.infer<typeof projectSchema>

export async function getAllProjects(): Promise<Project[]> {
  const projectsPath = path.join(process.cwd(), 'content', 'projects', 'projects.json')
  
  if (!fs.existsSync(projectsPath)) {
    return []
  }
  
  const fileContent = fs.readFileSync(projectsPath, 'utf8')
  const projectsData = JSON.parse(fileContent)
  
  // Validate each project
  const projects = z.array(projectSchema).parse(projectsData)
  
  return projects
}
