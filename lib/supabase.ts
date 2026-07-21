// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// This module is imported by both client components and server API routes,
// and Next.js evaluates it during `next build` page-data collection -- so a
// throw here would fail the build itself in any environment missing these
// vars, not just at runtime. Fall back to a placeholder so construction
// always succeeds; a request made without real credentials still fails
// normally (network/auth error) at the point it's actually made.
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables -- requests will fail until they are set')
}

const url = supabaseUrl || 'https://placeholder.supabase.co'
const key = supabaseAnonKey || 'placeholder-anon-key'

// For client-side use
export const supabase = createClient(url, key)

// For server-side use (with auth context)
export function createServerClient() {
  return createClient(url, key)
}
