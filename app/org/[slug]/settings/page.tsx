// app/org/[slug]/settings/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Banner from '../../../components/Banner'
import { ACCENT_COLORS, AccentColorId, BANNER_TEMPLATES, BannerTemplateId } from '@/lib/branding'
import { useOrg } from '../OrgContext'
import { canManageOrgSettings } from '@/lib/permissions'
import { getInviteCode, regenerateInviteCode } from '@/lib/orgs'

export default function OrgSettingsPage() {
  const { org, role, refreshOrg } = useOrg()
  const canManage = canManageOrgSettings(role)

  const [logoUrl, setLogoUrl] = useState(org.logo_url)
  const [bannerTemplate, setBannerTemplate] = useState(org.banner_template as BannerTemplateId)
  const [accentColor, setAccentColor] = useState(org.accent_color as AccentColorId)
  const [isPublic, setIsPublic] = useState(org.is_public)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [missionStatement, setMissionStatement] = useState(org.mission_statement ?? '')
  const [aboutText, setAboutText] = useState(org.about_text ?? '')
  const [facebookUrl, setFacebookUrl] = useState(org.facebook_url ?? '')
  const [instagramUrl, setInstagramUrl] = useState(org.instagram_url ?? '')
  const [xUrl, setXUrl] = useState(org.x_url ?? '')
  const [websiteUrl, setWebsiteUrl] = useState(org.website_url ?? '')
  const [contactEmail, setContactEmail] = useState(org.contact_email ?? '')
  const [inviteCode, setInviteCode] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [regenerating, setRegenerating] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!canManage) return
    getInviteCode(org.id)
      .then(setInviteCode)
      .catch(() => {})
  }, [canManage, org.id])

  if (!canManage) {
    return (
      <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '2rem' }}>
        <h1>Settings</h1>
        <p>Only org admins can edit settings.</p>
        <Link href={`/org/${org.slug}`}>Back to {org.name}</Link>
      </div>
    )
  }

  // Empty inputs must become null, not '' -- the facebook_url/instagram_url/
  // etc. CHECK constraints require either null or a real https:// value, and
  // '' matches neither.
  const orNull = (v: string) => (v.trim() === '' ? null : v.trim())

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setSaving(true)

    try {
      let newLogoUrl = logoUrl

      if (logoFile) {
        const ext = logoFile.name.split('.').pop()
        const path = `${org.id}/logo-${Date.now()}.${ext}`

        const { error: uploadError } = await supabase.storage
          .from('logos')
          .upload(path, logoFile, { upsert: true })

        if (uploadError) throw uploadError

        const { data: publicUrl } = supabase.storage.from('logos').getPublicUrl(path)
        newLogoUrl = publicUrl.publicUrl
      }

      const profileUpdate = {
        logo_url: newLogoUrl,
        banner_template: bannerTemplate,
        accent_color: accentColor,
        is_public: isPublic,
        mission_statement: orNull(missionStatement),
        about_text: orNull(aboutText),
        facebook_url: orNull(facebookUrl),
        instagram_url: orNull(instagramUrl),
        x_url: orNull(xUrl),
        website_url: orNull(websiteUrl),
        contact_email: orNull(contactEmail),
      }

      const { error: updateError } = await supabase.from('orgs').update(profileUpdate).eq('id', org.id)

      if (updateError) throw updateError

      setLogoUrl(newLogoUrl)
      setLogoFile(null)
      refreshOrg({ ...profileUpdate, logo_url: newLogoUrl })
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleRegenerate = async () => {
    setRegenerating(true)
    setError('')
    try {
      const newCode = await regenerateInviteCode(org.id)
      setInviteCode(newCode)
    } catch (err: any) {
      setError(err.message || 'Failed to regenerate invite code')
    } finally {
      setRegenerating(false)
    }
  }

  const inviteUrl =
    inviteCode && typeof window !== 'undefined' ? `${window.location.origin}/join/${inviteCode}` : ''

  return (
    <div>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
        <h1>{org.name} Settings</h1>
        <nav>
          <Link href={`/org/${org.slug}`}>Back to {org.name}</Link>
        </nav>
      </header>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Preview</h2>
        <Banner org={{ ...org, logo_url: logoUrl, banner_template: bannerTemplate, accent_color: accentColor }} />
      </section>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '1rem' }}>Settings saved.</div>}

      <form onSubmit={handleSave}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="logo" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Logo
          </label>
          <input
            id="logo"
            type="file"
            accept="image/*"
            onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Banner layout
          </label>
          {BANNER_TEMPLATES.map((tpl) => (
            <label key={tpl.id} style={{ display: 'block', marginBottom: '0.5rem' }}>
              <input
                type="radio"
                name="banner_template"
                value={tpl.id}
                checked={bannerTemplate === tpl.id}
                onChange={() => setBannerTemplate(tpl.id)}
                style={{ marginRight: '0.5rem' }}
              />
              {tpl.label} — <small>{tpl.description}</small>
            </label>
          ))}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Accent color
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {ACCENT_COLORS.map((color) => (
              <button
                key={color.id}
                type="button"
                title={color.label}
                onClick={() => setAccentColor(color.id)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: color.hex,
                  border: accentColor === color.id ? '3px solid #000' : '1px solid #ccc',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              style={{ marginRight: '0.5rem' }}
            />
            Public organization
          </label>
          <small>
            {isPublic
              ? 'Anyone can find and join this org from /browse.'
              : "Invite-only -- people can only join via the invite link below."}
          </small>
        </div>

        <div style={{ marginBottom: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
          <h2 style={{ fontSize: '1.1rem', margin: '0 0 1rem' }}>Mission &amp; about</h2>

          <label htmlFor="mission" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Mission statement
          </label>
          <textarea
            id="mission"
            value={missionStatement}
            onChange={(e) => setMissionStatement(e.target.value)}
            rows={2}
            placeholder="A sentence or two -- shown on your home page and on invite links."
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1.5rem' }}
          />

          <label htmlFor="about" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            About
          </label>
          <textarea
            id="about"
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            rows={6}
            placeholder="The longer story -- shown on your organization's About page."
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
          <h2 style={{ fontSize: '1.1rem', margin: '0 0 1rem' }}>Contact &amp; social</h2>

          <label htmlFor="website" style={{ display: 'block', marginBottom: '0.35rem' }}>
            Website
          </label>
          <input
            id="website"
            type="url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="https://..."
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          />

          <label htmlFor="contact_email" style={{ display: 'block', marginBottom: '0.35rem' }}>
            Contact email
          </label>
          <input
            id="contact_email"
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="hello@example.org"
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          />

          <label htmlFor="facebook" style={{ display: 'block', marginBottom: '0.35rem' }}>
            Facebook
          </label>
          <input
            id="facebook"
            type="url"
            value={facebookUrl}
            onChange={(e) => setFacebookUrl(e.target.value)}
            placeholder="https://facebook.com/..."
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          />

          <label htmlFor="instagram" style={{ display: 'block', marginBottom: '0.35rem' }}>
            Instagram
          </label>
          <input
            id="instagram"
            type="url"
            value={instagramUrl}
            onChange={(e) => setInstagramUrl(e.target.value)}
            placeholder="https://instagram.com/..."
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          />

          <label htmlFor="x" style={{ display: 'block', marginBottom: '0.35rem' }}>
            X / Twitter
          </label>
          <input
            id="x"
            type="url"
            value={xUrl}
            onChange={(e) => setXUrl(e.target.value)}
            placeholder="https://x.com/..."
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: saving ? 'not-allowed' : 'pointer',
          }}
        >
          {saving ? 'Saving...' : 'Save settings'}
        </button>
      </form>

      <section style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #ddd' }}>
        <h2>Invite link</h2>
        <p>Share this link to let someone join {org.name}.</p>
        {inviteUrl && (
          <input
            type="text"
            readOnly
            value={inviteUrl}
            onClick={(e) => (e.target as HTMLInputElement).select()}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.75rem' }}
          />
        )}
        <button type="button" onClick={handleRegenerate} disabled={regenerating}>
          {regenerating ? 'Regenerating...' : 'Regenerate link'}
        </button>
        <p>
          <small>Regenerating invalidates the old link immediately.</small>
        </p>
      </section>
    </div>
  )
}
