// app/org/[slug]/WorkflowNav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS: { href: string; label: string }[] = [
  { href: '', label: 'Board' },
  { href: '/events', label: 'Events' },
  { href: '/catalog', label: 'Catalog' },
  { href: '/journal', label: 'Journal' },
  { href: '/course', label: 'Course' },
]

export default function WorkflowNav({ slug }: { slug: string }) {
  const pathname = usePathname()
  const base = `/org/${slug}`

  return (
    <nav
      style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1.5rem',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid #eee',
        fontSize: '0.9rem',
      }}
    >
      {TABS.map((tab) => {
        const href = `${base}${tab.href}`
        const active = pathname === href
        return (
          <Link
            key={tab.href}
            href={href}
            style={{
              fontWeight: active ? 'bold' : 'normal',
              textDecoration: active ? 'underline' : 'none',
            }}
          >
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
