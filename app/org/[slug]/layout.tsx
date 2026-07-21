// app/org/[slug]/layout.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useOrgBySlug, Org } from '@/lib/orgs'
import { OrgContext } from './OrgContext'
import OrgSwitcher from '../../components/OrgSwitcher'

export default function OrgLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const { org, role, loading, notFound } = useOrgBySlug(params.slug)
  const [orgOverride, setOrgOverride] = useState<Partial<Org>>({})

  if (loading) {
    return (
      <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '2rem' }}>
        <p>Loading...</p>
      </div>
    )
  }

  if (notFound || !org) {
    // Deliberately identical whether the org doesn't exist or is private
    // and the viewer isn't a member -- RLS just returns nothing either way,
    // so this doesn't leak which private orgs exist.
    return (
      <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '2rem' }}>
        <h1>Not found</h1>
        <p>This organization doesn&apos;t exist, or you don&apos;t have access to it.</p>
        <Link href="/">Back home</Link>
      </div>
    )
  }

  const mergedOrg: Org = { ...org, ...orgOverride }

  return (
    <OrgContext.Provider
      value={{
        org: mergedOrg,
        role,
        refreshOrg: (patch) => setOrgOverride((prev) => ({ ...prev, ...patch })),
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <OrgSwitcher currentOrg={mergedOrg} />
        {children}
      </div>
    </OrgContext.Provider>
  )
}
