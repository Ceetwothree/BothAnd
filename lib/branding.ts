// lib/branding.ts
// Single source of truth for the constrained set of branding options.
// Keep this in sync with the CHECK constraints on orgs.banner_template / orgs.accent_color in schema.sql.

export type BannerTemplateId = 'logo-left' | 'centered' | 'full-banner'
export type AccentColorId = 'slate' | 'blue' | 'green' | 'purple' | 'amber' | 'rose'

export interface OrgBranding {
  name: string
  logo_url: string | null
  banner_template: string
  accent_color: string
}

export const BANNER_TEMPLATES: { id: BannerTemplateId; label: string; description: string }[] = [
  { id: 'logo-left', label: 'Logo left', description: 'Logo beside the org name' },
  { id: 'centered', label: 'Centered', description: 'Logo above the org name, centered' },
  { id: 'full-banner', label: 'Full banner', description: 'Logo image fills the header as a banner' },
]

export const ACCENT_COLORS: { id: AccentColorId; label: string; hex: string }[] = [
  { id: 'slate', label: 'Slate', hex: '#475569' },
  { id: 'blue', label: 'Blue', hex: '#2563eb' },
  { id: 'green', label: 'Green', hex: '#059669' },
  { id: 'purple', label: 'Purple', hex: '#7c3aed' },
  { id: 'amber', label: 'Amber', hex: '#d97706' },
  { id: 'rose', label: 'Rose', hex: '#e11d48' },
]

export function accentHex(id: string): string {
  return ACCENT_COLORS.find((c) => c.id === id)?.hex ?? ACCENT_COLORS[0].hex
}
