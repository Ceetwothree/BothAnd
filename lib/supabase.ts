// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// For client-side use
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For server-side use (with auth context)
export function createServerClient() {
  return createClient(supabaseUrl, supabaseAnonKey)
}
