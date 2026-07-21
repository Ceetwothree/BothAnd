// lib/orgs.ts
'use client'

import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { OrgRole } from './permissions'
import { OrgBranding } from './branding'

export interface Org extends OrgBranding {
  id: string
  slug: string
  is_public: boolean
}

export interface UserOrgMembership {
  org: Org
  role: OrgRole
}

const ORG_FIELDS = 'id, name, slug, logo_url, banner_template, accent_color, is_public'

// The viewer's orgs, for the top-level hub and the org switcher.
export function useUserOrgs() {
  const [orgs, setOrgs] = useState<UserOrgMembership[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        if (!cancelled) {
          setOrgs([])
          setLoading(false)
        }
        return
      }

      const { data, error } = await supabase
        .from('memberships')
        .select(`role, orgs (${ORG_FIELDS})`)
        .eq('user_id', user.id)
        .eq('status', 'active')

      if (!cancelled) {
        if (!error && data) {
          setOrgs(
            (data as any[])
              .filter((m) => m.orgs)
              .map((m) => ({ org: m.orgs as Org, role: m.role as OrgRole }))
          )
        }
        setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { orgs, loading }
}

// The org for a given slug, plus the viewer's role in it (null if not a
// member -- private orgs simply won't be returned by RLS for non-members,
// which is what makes them invisible rather than merely access-denied).
export function useOrgBySlug(slug: string) {
  const [org, setOrg] = useState<Org | null>(null)
  const [role, setRole] = useState<OrgRole | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      setNotFound(false)

      const { data: orgData, error } = await supabase
        .from('orgs')
        .select(ORG_FIELDS)
        .eq('slug', slug)
        .single()

      if (cancelled) return

      if (error || !orgData) {
        setOrg(null)
        setRole(null)
        setNotFound(true)
        setLoading(false)
        return
      }

      setOrg(orgData as Org)

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data: membership } = await supabase
          .from('memberships')
          .select('role')
          .eq('org_id', orgData.id)
          .eq('user_id', user.id)
          .eq('status', 'active')
          .maybeSingle()

        if (!cancelled) setRole((membership?.role as OrgRole) ?? null)
      } else if (!cancelled) {
        setRole(null)
      }

      if (!cancelled) setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [slug])

  return { org, role, loading, notFound }
}

export async function listPublicOrgs(): Promise<Org[]> {
  const { data, error } = await supabase
    .from('orgs')
    .select(ORG_FIELDS)
    .eq('is_public', true)
    .order('name')

  if (error) throw error
  return (data ?? []) as Org[]
}

export async function createOrg(params: { name: string; slug: string; isPublic: boolean }): Promise<Org> {
  const { data, error } = await supabase.rpc('create_org_with_admin', {
    p_name: params.name,
    p_slug: params.slug,
    p_is_public: params.isPublic,
  })

  if (error) throw error
  return data as Org
}

export async function joinPublicOrg(orgId: string): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase.from('memberships').insert({
    user_id: user.id,
    org_id: orgId,
    role: 'member',
    status: 'active',
  })

  if (error) throw error
}

export async function joinOrgByInviteCode(code: string) {
  const { data, error } = await supabase.rpc('join_org_by_invite_code', { p_code: code })
  if (error) throw error
  return data
}

export interface OrgInvitePreview {
  id: string
  name: string
  slug: string
  logo_url: string | null
  banner_template: string
  accent_color: string
}

export async function getOrgPreviewByInviteCode(code: string): Promise<OrgInvitePreview | null> {
  const { data, error } = await supabase.rpc('get_org_preview_by_invite_code', { p_code: code })
  if (error) throw error
  // The function returns a table (array); a valid code returns exactly one row.
  return (data && data[0]) ?? null
}

// Deliberately not part of ORG_FIELDS -- fetched separately so the invite
// code doesn't ride along on every general org query, only where it's
// actually shown (the admin settings page).
export async function getInviteCode(orgId: string): Promise<string | null> {
  const { data, error } = await supabase.from('orgs').select('invite_code').eq('id', orgId).single()
  if (error) throw error
  return data?.invite_code ?? null
}

export async function regenerateInviteCode(orgId: string): Promise<string> {
  const newCode = crypto.randomUUID().replace(/-/g, '')
  const { error } = await supabase.from('orgs').update({ invite_code: newCode }).eq('id', orgId)
  if (error) throw error
  return newCode
}

export interface OrgMember {
  id: string // membership id
  user_id: string
  role: OrgRole
  status: string
  created_at: string
  email: string | null
}

// Requires the users_org_admin_read policy (viewer must be an org admin) to
// see anything but their own email in the embedded users(email) -- for
// anyone else it silently returns null rather than erroring.
export async function listOrgMembers(orgId: string): Promise<OrgMember[]> {
  const { data, error } = await supabase
    .from('memberships')
    .select('id, user_id, role, status, created_at, users(email)')
    .eq('org_id', orgId)
    .order('created_at')

  if (error) throw error
  return (data as any[]).map((m) => ({
    id: m.id,
    user_id: m.user_id,
    role: m.role as OrgRole,
    status: m.status,
    created_at: m.created_at,
    email: m.users?.email ?? null,
  }))
}

export async function updateMemberRole(membershipId: string, role: OrgRole): Promise<void> {
  const { error } = await supabase.from('memberships').update({ role }).eq('id', membershipId)
  if (error) throw error
}

export async function setMemberStatus(
  membershipId: string,
  status: 'active' | 'inactive'
): Promise<void> {
  const { error } = await supabase.from('memberships').update({ status }).eq('id', membershipId)
  if (error) throw error
}
