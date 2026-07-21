// app/dashboard/settings/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Banner from '../../components/Banner'
import { ACCENT_COLORS, AccentColorId, BANNER_TEMPLATES, BannerTemplateId, OrgBranding } from '@/lib/branding'

export default function SettingsPage() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [orgId, setOrgId] = useState('')
  const [org, setOrg] = useState<OrgBranding | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      const { data: orgData } = await supabase
        .from('orgs')
        .select('id, name, logo_url, banner_template, accent_color')
        .eq('slug', process.env.NEXT_PUBLIC_DEFAULT_ORG_SLUG)
        .single()

      if (!orgData) {
        setChecking(false)
        return
      }

      setOrgId(orgData.id)
      setOrg(orgData)

      const { data: membership } = await supabase
        .from('memberships')
        .select('role')
        .eq('org_id', orgData.id)
        .eq('user_id', user.id)
        .single()

      setIsAdmin(membership?.role === 'admin')
      setChecking(false)
    }

    load()
  }, [router])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!org) return
    setError('')
    setSuccess(false)
    setSaving(true)

    try {
      let logoUrl = org.logo_url

      if (logoFile) {
        const ext = logoFile.name.split('.').pop()
        const path = `${orgId}/logo-${Date.now()}.${ext}`

        const { error: uploadError } = await supabase.storage
          .from('logos')
          .upload(path, logoFile, { upsert: true })

        if (uploadError) throw uploadError

        const { data: publicUrl } = supabase.storage.from('logos').getPublicUrl(path)
        logoUrl = publicUrl.publicUrl
      }

      const { error: updateError } = await supabase
        .from('orgs')
        .update({
          logo_url: logoUrl,
          banner_template: org.banner_template,
          accent_color: org.accent_color,
        })
        .eq('id', orgId)

      if (updateError) throw updateError

      setOrg({ ...org, logo_url: logoUrl })
      setLogoFile(null)
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Failed to save branding')
    } finally {
      setSaving(false)
    }
  }

  if (checking) {
    return (
      <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '2rem' }}>
        <p>Loading...</p>
      </div>
    )
  }

  if (!isAdmin || !org) {
    return (
      <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '2rem' }}>
        <h1>Settings</h1>
        <p>Only org admins can edit branding.</p>
        <Link href="/dashboard">Back to dashboard</Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
        <h1>Branding Settings</h1>
        <nav>
          <Link href="/dashboard">Back to dashboard</Link>
        </nav>
      </header>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Preview</h2>
        <Banner org={org} />
      </section>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '1rem' }}>Branding saved.</div>}

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
                checked={org.banner_template === tpl.id}
                onChange={() => setOrg({ ...org, banner_template: tpl.id as BannerTemplateId })}
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
                onClick={() => setOrg({ ...org, accent_color: color.id as AccentColorId })}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: color.hex,
                  border: org.accent_color === color.id ? '3px solid #000' : '1px solid #ccc',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
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
          {saving ? 'Saving...' : 'Save branding'}
        </button>
      </form>
    </div>
  )
}
