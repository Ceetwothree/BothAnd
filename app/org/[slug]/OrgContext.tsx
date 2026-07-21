// app/org/[slug]/OrgContext.tsx
'use client'

import { createContext, useContext } from 'react'
import { Org } from '@/lib/orgs'
import { OrgRole } from '@/lib/permissions'

export interface OrgContextValue {
  org: Org
  role: OrgRole | null
  refreshOrg: (patch: Partial<Org>) => void
}

export const OrgContext = createContext<OrgContextValue | null>(null)

export function useOrg(): OrgContextValue {
  const ctx = useContext(OrgContext)
  if (!ctx) throw new Error('useOrg must be used within app/org/[slug]/layout.tsx')
  return ctx
}
