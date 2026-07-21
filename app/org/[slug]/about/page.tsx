// app/org/[slug]/about/page.tsx
'use client'

import Link from 'next/link'
import { useOrg } from '../OrgContext'
import { canManageOrgSettings } from '@/lib/permissions'
import { accentHex } from '@/lib/branding'

const SOCIAL_LINKS: { key: 'website_url' | 'facebook_url' | 'instagram_url' | 'x_url'; label: string }[] = [
  { key: 'website_url', label: 'Website' },
  { key: 'facebook_url', label: 'Facebook' },
  { key: 'instagram_url', label: 'Instagram' },
  { key: 'x_url', label: 'X / Twitter' },
]

export default function OrgAboutPage() {
  const { org, role } = useOrg()
  const accent = accentHex(org.accent_color)
  const canManage = canManageOrgSettings(role)

  const links = SOCIAL_LINKS.filter((l) => org[l.key])

  return (
    <div>
      <h1 style={{ color: accent, marginBottom: '1.5rem' }}>About {org.name}</h1>

      {org.about_text ? (
        <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, maxWidth: '65ch' }}>{org.about_text}</p>
      ) : (
        <p style={{ color: '#64748b' }}>
          {org.name} hasn&apos;t added an about section yet.
          {canManage && (
            <>
              {' '}
              <Link href={`/org/${org.slug}/settings`} style={{ color: accent }}>
                Add one in Settings
              </Link>
              .
            </>
          )}
        </p>
      )}

      {(links.length > 0 || org.contact_email) && (
        <section style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Get in touch</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
            {org.contact_email && (
              <a href={`mailto:${org.contact_email}`} style={{ color: accent }}>
                {org.contact_email}
              </a>
            )}
            {links.map((l) => (
              <a
                key={l.key}
                href={org[l.key] as string}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: accent }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
