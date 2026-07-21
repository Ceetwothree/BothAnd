// lib/containers.ts
'use client'

import { useEffect, useState } from 'react'
import { supabase } from './supabase'

export type ContainerKind = 'board' | 'inventory' | 'events' | 'journal' | 'catalog' | 'course'
export type ContainerVisibility = 'public' | 'org' | 'restricted' | 'owner'

export interface Container {
  id: string
  org_id: string
  kind: ContainerKind
  name: string
  visibility: ContainerVisibility
}

// Fetches the container of a given kind for an org. container is null if it
// doesn't exist yet -- callers decide whether/how to offer creating one.
export function useContainer(orgId: string | undefined, kind: ContainerKind) {
  const [container, setContainer] = useState<Container | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!orgId) {
      setContainer(null)
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)

    supabase
      .from('containers')
      .select('id, org_id, kind, name, visibility')
      .eq('org_id', orgId)
      .eq('kind', kind)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) {
          setContainer((data as Container) ?? null)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [orgId, kind])

  return { container, loading, setContainer }
}

// Admin-triggered lazy creation, reusing the existing containers_admin_write
// RLS policy (admin-of-org only) rather than needing a new one. If the
// container already exists (e.g. a race with another admin tab), returns
// the existing row instead of erroring on the unique-ish lookup.
export async function ensureContainer(
  orgId: string,
  kind: ContainerKind,
  name: string,
  visibility: ContainerVisibility = 'org'
): Promise<Container> {
  const { data: existing } = await supabase
    .from('containers')
    .select('id, org_id, kind, name, visibility')
    .eq('org_id', orgId)
    .eq('kind', kind)
    .maybeSingle()

  if (existing) return existing as Container

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('containers')
    .insert({ org_id: orgId, kind, name, visibility, created_by: user?.id ?? null })
    .select('id, org_id, kind, name, visibility')
    .single()

  if (error) throw error
  return data as Container
}
