// lib/branding.ts
// Single source of truth for the constrained set of branding options.
// Keep this in sync with the CHECK constraints on orgs.banner_template / orgs.accent_color in schema.sql.

export type BannerTemplateId = 'logo-left' | 'centered' | 'full-banner'
export type AccentColorId = 'pine' | 'indigo' | 'plum' | 'ochre' | 'clay' | 'ink'

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

// Drawn from the same considered, muted palette as BothAnd's own site
// theme (app/globals.css) -- pine and ochre are literally the site's own
// teal/gold -- rather than the generic default-Tailwind rainbow this
// replaced, so an org's page reads as part of the same design family even
// though the color itself is what makes each org's branding its own.
export const ACCENT_COLORS: { id: AccentColorId; label: string; hex: string }[] = [
  { id: 'pine', label: 'Pine', hex: '#1F6F5C' },
  { id: 'indigo', label: 'Indigo', hex: '#3B5470' },
  { id: 'plum', label: 'Plum', hex: '#6B4271' },
  { id: 'ochre', label: 'Ochre', hex: '#A8761F' },
  { id: 'clay', label: 'Clay', hex: '#B0512E' },
  { id: 'ink', label: 'Ink', hex: '#40474D' },
]

export function accentHex(id: string): string {
  return ACCENT_COLORS.find((c) => c.id === id)?.hex ?? ACCENT_COLORS[0].hex
}
