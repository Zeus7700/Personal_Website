interface ExternalLinkProps {
  href: string
  children: React.ReactNode
}

export function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline transition-colors text-[var(--text-secondary)] decoration-[var(--text-muted)] hover:text-[var(--accent-hover)] hover:decoration-[var(--accent-hover)]"
    >
      {children} ↗
    </a>
  )
}
