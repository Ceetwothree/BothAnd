// app/components/OrgSwitcher.tsx
'use client'

import Link from 'next/link'
import { useUserOrgs, Org } from '@/lib/orgs'

export default function OrgSwitcher({ currentOrg }: { currentOrg?: Org }) {
  const { orgs, loading } = useUserOrgs()

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #eee',
        fontSize: '0.9rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Link href="/" style={{ fontWeight: 'bold' }}>
          BothAnd
        </Link>
        {!loading &&
          orgs.map(({ org }) => (
            <Link
              key={org.id}
              href={`/org/${org.slug}`}
              style={{
                fontWeight: currentOrg?.id === org.id ? 'bold' : 'normal',
                textDecoration: currentOrg?.id === org.id ? 'underline' : 'none',
              }}
            >
              {org.name}
            </Link>
          ))}
      </div>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Link href="/browse">Browse</Link>
        <Link href="/orgs/new">Create org</Link>
      </div>
    </nav>
  )
}
