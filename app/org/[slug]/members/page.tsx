// app/org/[slug]/members/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useOrg } from '../OrgContext'
import { canManageMembers, OrgRole } from '@/lib/permissions'
import { listOrgMembers, updateMemberRole, setMemberStatus, OrgMember } from '@/lib/orgs'

export default function OrgMembersPage() {
  const { org, role } = useOrg()
  const canManage = canManageMembers(role)

  const [members, setMembers] = useState<OrgMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [savingId, setSavingId] = useState<string | null>(null)
  const [selfUserId, setSelfUserId] = useState<string | null>(null)

  useEffect(() => {
    if (!canManage) return

    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setSelfUserId(user?.id ?? null)

      try {
        setMembers(await listOrgMembers(org.id))
      } catch (err: any) {
        setError(err.message || 'Failed to load members')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [canManage, org.id])

  if (!canManage) {
    return (
      <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '2rem' }}>
        <h1>Members</h1>
        <p>Only org admins can manage members.</p>
        <Link href={`/org/${org.slug}`}>Back to {org.name}</Link>
      </div>
    )
  }

  const activeAdminCount = members.filter((m) => m.role === 'admin' && m.status === 'active').length

  const handleRoleChange = async (member: OrgMember, newRole: OrgRole) => {
    if (
      member.user_id === selfUserId &&
      member.role === 'admin' &&
      newRole !== 'admin' &&
      activeAdminCount <= 1
    ) {
      setError("You're the only admin -- promote someone else first.")
      return
    }

    setError('')
    setSavingId(member.id)
    try {
      await updateMemberRole(member.id, newRole)
      setMembers((prev) => prev.map((m) => (m.id === member.id ? { ...m, role: newRole } : m)))
    } catch (err: any) {
      setError(err.message || 'Failed to update role')
    } finally {
      setSavingId(null)
    }
  }

  const handleStatusToggle = async (member: OrgMember) => {
    const newStatus = member.status === 'active' ? 'inactive' : 'active'

    if (member.user_id === selfUserId && newStatus === 'inactive' && activeAdminCount <= 1) {
      setError("You're the only admin -- promote someone else before deactivating yourself.")
      return
    }

    setError('')
    setSavingId(member.id)
    try {
      await setMemberStatus(member.id, newStatus)
      setMembers((prev) => prev.map((m) => (m.id === member.id ? { ...m, status: newStatus } : m)))
    } catch (err: any) {
      setError(err.message || 'Failed to update status')
    } finally {
      setSavingId(null)
    }
  }

  return (
    <div>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
        <h1>{org.name} Members</h1>
        <nav>
          <Link href={`/org/${org.slug}`}>Back to {org.name}</Link>
        </nav>
      </header>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : members.length === 0 ? (
        <p>No members yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
              <th style={{ padding: '0.5rem' }}>Email</th>
              <th style={{ padding: '0.5rem' }}>Role</th>
              <th style={{ padding: '0.5rem' }}>Status</th>
              <th style={{ padding: '0.5rem' }}>Joined</th>
              <th style={{ padding: '0.5rem' }} />
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} style={{ borderBottom: '1px solid #f1f1f1' }}>
                <td style={{ padding: '0.5rem' }}>
                  {m.email ?? 'Unknown'} {m.user_id === selfUserId && <small>(you)</small>}
                </td>
                <td style={{ padding: '0.5rem' }}>
                  <select
                    value={m.role}
                    disabled={savingId === m.id}
                    onChange={(e) => handleRoleChange(m, e.target.value as OrgRole)}
                  >
                    <option value="member">member</option>
                    <option value="staff">staff</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td style={{ padding: '0.5rem' }}>{m.status}</td>
                <td style={{ padding: '0.5rem' }}>{new Date(m.created_at).toLocaleDateString()}</td>
                <td style={{ padding: '0.5rem' }}>
                  <button onClick={() => handleStatusToggle(m)} disabled={savingId === m.id}>
                    {m.status === 'active' ? 'Deactivate' : 'Reactivate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
