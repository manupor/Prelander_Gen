import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Use fallback values during build if environment variables are missing
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
  
  // Log configuration status for debugging (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log('Supabase Client Config:', {
      url: supabaseUrl,
      hasValidUrl: supabaseUrl !== 'https://placeholder.supabase.co',
      hasValidKey: supabaseAnonKey !== 'placeholder-key'
    })
  }
  
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
