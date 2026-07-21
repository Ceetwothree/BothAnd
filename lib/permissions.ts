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

// Matches containers_admin_write RLS exactly (admin-of-org only, not
// staff). This gates *creating a workflow's container* (Events, Catalog,
// Journal, Course setup) -- separate from creating records inside one,
// which uses the looser per-workflow checks below. Mixing these up means a
// staff member's "Set up Events" click would hit an RLS rejection.
export function canManageContainers(role: OrgRole | null | undefined): boolean {
  return atLeast(role, 'admin')
}

// UI-level guard only -- records_write RLS currently allows any active
// member to create a record regardless of role, so this doesn't yet block
// anything at the database layer. Positioned for when that policy is
// tightened.
export function canManageEvents(role: OrgRole | null | undefined): boolean {
  return atLeast(role, 'staff')
}

// Same rank as canManageEvents today (staff+) but kept as its own function
// rather than reused, since course-authoring permissions are plausible to
// diverge from event-organizing permissions later.
export function canManageCourse(role: OrgRole | null | undefined): boolean {
  return atLeast(role, 'staff')
}

export function canPost(role: OrgRole | null | undefined): boolean {
  return atLeast(role, 'member')
}
