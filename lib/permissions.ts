// lib/permissions.ts
// Centralized role checks -- add new distinctions here, not as scattered
// role === 'admin' checks across pages. Keep in sync with org_role in schema.sql.

export type OrgRole = 'admin' | 'staff' | 'member'

const ROLE_RANK: Record<OrgRole, number> = { member: 0, staff: 1, admin: 2 }

function atLeast(role: OrgRole | null | undefined, min: OrgRole): boolean {
  if (!role) return false
  return ROLE_RANK[role] >= ROLE_RANK[min]
}

// Branding, public/private toggle, and invite code are all gated by the
// same orgs_admin_update RLS policy today, so one function is honest about
// what the database actually enforces rather than implying a finer split.
export function canManageOrgSettings(role: OrgRole | null | undefined): boolean {
  return atLeast(role, 'admin')
}

export function canManageMembers(role: OrgRole | null | undefined): boolean {
  return atLeast(role, 'admin')
}

// Positioned for when events/catalog workflows ship -- not enforced
// anywhere yet, since there's no staff-only action to gate.
export function canManageEvents(role: OrgRole | null | undefined): boolean {
  return atLeast(role, 'staff')
}

export function canPost(role: OrgRole | null | undefined): boolean {
  return atLeast(role, 'member')
}
