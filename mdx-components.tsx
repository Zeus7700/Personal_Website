import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    pre: ({ children, ...props }) => (
      <pre
        {...props}
        className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm dark:border-gray-700 dark:bg-gray-900"
      >
        {children}
      </pre>
    ),
    code: ({ children, ...props }) => (
      <code
        {...props}
        className="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800"
      >
        {children}
      </code>
    ),
    ...components,
  }
}
