// lib/branding.ts
// Single source of truth for the constrained set of branding options.
// Keep this in sync with the CHECK constraints on orgs.banner_template / orgs.theme in schema.sql.

export type BannerTemplateId = 'logo-left' | 'centered' | 'full-banner'
export type ThemeId = 'bothand' | 'warm' | 'cool' | 'rose'

export interface OrgBranding {
  name: string
  logo_url: string | null
  banner_template: string
  theme: string
}

export const BANNER_TEMPLATES: { id: BannerTemplateId; label: string; description: string }[] = [
  { id: 'logo-left', label: 'Logo left', description: 'Logo beside the org name' },
  { id: 'centered', label: 'Centered', description: 'Logo above the org name, centered' },
  { id: 'full-banner', label: 'Full banner', description: 'Logo image fills the header as a banner' },
]

export interface Theme {
  id: ThemeId
  label: string
  description: string
  paper: string
  ink: string
  accent: string
}

// Replaces a 6-swatch raw color picker (accent line only, plain white page
// underneath every org regardless of choice) with a handful of complete,
// curated looks -- each pairs a page background with a matching accent,
// so picking one actually changes how the page feels, not just one border
// color. "BothAnd" is deliberately identical to the homepage's own theme
// (app/globals.css's --site-* tokens) -- the option for an org that wants
// to look like part of the same family rather than stand apart. The other
// three reuse hues from the palette this replaced (ochre/indigo/plum),
// so nothing here is a color no one already chose.
export const THEMES: Theme[] = [
  {
    id: 'bothand',
    label: 'BothAnd',
    description: 'Same look as the homepage',
    paper: '#eff1ea',
    ink: '#16211d',
    accent: '#1f6f5c',
  },
  {
    id: 'warm',
    label: 'Warm',
    description: 'Cream and ochre',
    paper: '#f7f1e6',
    ink: '#2b2013',
    accent: '#a8761f',
  },
  {
    id: 'cool',
    label: 'Cool',
    description: 'Slate and indigo',
    paper: '#eef1f5',
    ink: '#1c2430',
    accent: '#3b5470',
  },
  {
    id: 'rose',
    label: 'Rose',
    description: 'Warm plum',
    paper: '#f5eef2',
    ink: '#241a22',
    accent: '#6b4271',
  },
]

export function getTheme(id: string): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0]
}
