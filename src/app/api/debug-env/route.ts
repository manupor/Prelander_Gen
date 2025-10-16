import { NextResponse } from 'next/server'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || null
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || null
  const srvr = process.env.SUPABASE_SERVICE_ROLE_KEY || null
  const openai = process.env.OPENAI_API_KEY || null

  const mask = (val: string | null, show: number = 4) =>
    val ? `${val.slice(0, 3)}...${val.slice(-show)}` : null

  return NextResponse.json({
    runtime: 'node',
    nodeEnv: process.env.NODE_ENV || null,
    timestamp: new Date().toISOString(),

    nextPublicSupabaseUrl: url,
    nextPublicSupabaseAnonKey: anon ? mask(anon, 6) : null,
    supabaseServiceRoleKeyPresent: Boolean(srvr),
    openAIPresent: Boolean(openai),

    diagnostics: {
      urlSet: Boolean(url),
      anonSet: Boolean(anon),
      // Helpful for client bundle issues: if these are null here, the server doesn’t see them
      // If they are set here but client still fails, restart dev to rebuild client bundle
    },
  })
}
