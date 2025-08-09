import { ReactNode } from 'react'

interface ProseProps {
  children: ReactNode
  className?: string
}

export function Prose({ children, className = '' }: ProseProps) {
  return (
    <div className={`markdown-content ${className}`}>
      {children}
    </div>
  )
}
