// lib/videoEmbed.ts
//
// Parses a pasted video URL into a safe, constructed embed URL -- never
// renders the pasted string directly as an iframe src. That would let
// anyone with lesson-authoring rights point an embed at an arbitrary
// origin (not classic XSS, since it's an iframe not a script, but a real
// clickjacking/phishing-adjacent risk with no origin allowlist). Only
// recognized YouTube/Vimeo URLs produce an embed; everything else is
// still shown as a plain link, not dropped, and not rendered as an
// iframe of an unrecognized origin.

export interface ParsedVideoEmbed {
  provider: 'youtube' | 'vimeo'
  embedUrl: string
}

export function parseVideoEmbed(rawUrl: string): ParsedVideoEmbed | null {
  let url: URL
  try {
    url = new URL(rawUrl.trim())
  } catch {
    return null
  }

  if (url.protocol !== 'https:') return null

  const host = url.hostname.replace(/^www\./, '')
  const YOUTUBE_ID = /^[\w-]{11}$/

  if (host === 'youtube.com' || host === 'm.youtube.com') {
    let id = url.searchParams.get('v')
    if (!id && url.pathname.startsWith('/embed/')) {
      id = url.pathname.split('/embed/')[1]?.split('/')[0]
    }
    if (!id && url.pathname.startsWith('/shorts/')) {
      id = url.pathname.split('/shorts/')[1]?.split('/')[0]
    }
    if (id && YOUTUBE_ID.test(id)) {
      return { provider: 'youtube', embedUrl: `https://www.youtube-nocookie.com/embed/${id}` }
    }
    return null
  }

  if (host === 'youtu.be') {
    const id = url.pathname.slice(1).split('/')[0]
    if (id && YOUTUBE_ID.test(id)) {
      return { provider: 'youtube', embedUrl: `https://www.youtube-nocookie.com/embed/${id}` }
    }
    return null
  }

  if (host === 'vimeo.com') {
    const id = url.pathname.split('/').filter(Boolean)[0]
    if (id && /^\d+$/.test(id)) {
      return { provider: 'vimeo', embedUrl: `https://player.vimeo.com/video/${id}` }
    }
    return null
  }

  if (host === 'player.vimeo.com') {
    const id = url.pathname.split('/video/')[1]?.split('/')[0]
    if (id && /^\d+$/.test(id)) {
      return { provider: 'vimeo', embedUrl: `https://player.vimeo.com/video/${id}` }
    }
    return null
  }

  return null
}
