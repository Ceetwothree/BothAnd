// app/components/Banner.tsx
import { accentHex, OrgBranding } from '@/lib/branding'

export default function Banner({ org }: { org: OrgBranding }) {
  const accent = accentHex(org.accent_color)

  if (org.banner_template === 'full-banner' && org.logo_url) {
    return (
      <div
        style={{
          backgroundImage: `url(${org.logo_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '4px',
          padding: '3rem 2rem',
        }}
      >
        <h1 style={{ margin: 0, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
          {org.name}
        </h1>
      </div>
    )
  }

  if (org.banner_template === 'logo-left') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          borderBottom: `3px solid ${accent}`,
          paddingBottom: '1rem',
        }}
      >
        {org.logo_url && (
          <img
            src={org.logo_url}
            alt={`${org.name} logo`}
            style={{ height: '48px', width: '48px', objectFit: 'contain' }}
          />
        )}
        <h1 style={{ margin: 0, color: accent }}>{org.name}</h1>
      </div>
    )
  }

  // 'centered' (default)
  return (
    <div
      style={{
        textAlign: 'center',
        borderBottom: `3px solid ${accent}`,
        paddingBottom: '1rem',
      }}
    >
      {org.logo_url && (
        <img
          src={org.logo_url}
          alt={`${org.name} logo`}
          style={{ height: '56px', width: '56px', objectFit: 'contain', marginBottom: '0.5rem' }}
        />
      )}
      <h1 style={{ margin: 0, color: accent }}>{org.name}</h1>
    </div>
  )
}
