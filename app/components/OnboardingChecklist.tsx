// app/components/OnboardingChecklist.tsx
// A brand-new org's first ten minutes today is an empty Settings page --
// this is a dismissible checklist pointing at the handful of things worth
// doing first. Admin-only, computed from data that already exists (no new
// schema beyond where "dismissed" is remembered).
//
// Dismissal is stored in localStorage, keyed by org id -- a deliberate
// first-pass shortcut: it's per-browser, not per-org, so a second admin (or
// the same admin on a different device) sees it again. Fine for a stub;
// would need a real column if that turns out to matter.
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Props {
  orgId: string
  orgSlug: string
  hasMission: boolean
}

export default function OnboardingChecklist({ orgId, orgSlug, hasMission }: Props) {
  const [dismissed, setDismissed] = useState(true) // starts hidden until localStorage is checked, avoids a flash
  const [memberCount, setMemberCount] = useState<number | null>(null)
  const [hasContent, setHasContent] = useState<boolean | null>(null)

  useEffect(() => {
    const key = `bothand-onboarding-dismissed-${orgId}`
    setDismissed(typeof window !== 'undefined' && window.localStorage.getItem(key) === '1')
  }, [orgId])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      const { count } = await supabase
        .from('memberships')
        .select('id', { count: 'exact', head: true })
        .eq('org_id', orgId)
        .eq('status', 'active')
      if (!cancelled) setMemberCount(count ?? 0)

      const { data: containers } = await supabase.from('containers').select('id').eq('org_id', orgId)
      const containerIds = (containers ?? []).map((c: any) => c.id)

      if (containerIds.length === 0) {
        if (!cancelled) setHasContent(false)
        return
      }

      const { count: recordCount } = await supabase
        .from('records')
        .select('id', { count: 'exact', head: true })
        .in('container_id', containerIds)
      if (!cancelled) setHasContent((recordCount ?? 0) > 0)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [orgId])

  if (dismissed || memberCount === null || hasContent === null) return null

  const steps = [
    { label: 'Add a mission statement', done: hasMission, href: `/org/${orgSlug}/settings` },
    { label: 'Invite your first members', done: memberCount > 1, href: `/org/${orgSlug}/settings` },
    { label: 'Create your first post, event, or catalog item', done: hasContent, href: `/org/${orgSlug}` },
  ]

  if (steps.every((s) => s.done)) return null

  const dismiss = () => {
    window.localStorage.setItem(`bothand-onboarding-dismissed-${orgId}`, '1')
    setDismissed(true)
  }

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '6px',
        padding: '1rem 1.25rem',
        margin: '1rem 0',
        background: '#fafafa',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <strong>Getting started</strong>
        <button
          type="button"
          onClick={dismiss}
          style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.85rem' }}
        >
          Dismiss
        </button>
      </div>
      <ul style={{ margin: '0.75rem 0 0', paddingLeft: '1.25rem' }}>
        {steps.map((s) => (
          <li key={s.label} style={{ marginBottom: '0.35rem', color: s.done ? '#16a34a' : 'inherit' }}>
            {s.done ? `✓ ${s.label}` : <Link href={s.href}>{s.label}</Link>}
          </li>
        ))}
      </ul>
    </div>
  )
}
