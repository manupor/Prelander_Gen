import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json()

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
    }

    const supabase = await createClient()
    
    // Get user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify site belongs to user
    const { data: site, error: siteError } = await supabase
      .from('sites')
      .select('*')
      .eq('slug', slug)
      .eq('user_id', user.id)
      .single()

    if (siteError || !site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 })
    }

    // Generate unique token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes

    // Store token in database
    const { error: tokenError } = await supabase
      .from('download_tokens')
      .insert({
        token,
        site_id: site.id,
        user_id: user.id,
        expires_at: expiresAt.toISOString(),
        used: false,
        slug: slug
      })

    if (tokenError) {
      console.error('Token creation error:', tokenError)
      console.error('Error details:', JSON.stringify(tokenError, null, 2))
      console.error('User ID:', user.id)
      console.error('Site ID:', site.id)
      return NextResponse.json({ 
        error: 'Failed to create download token',
        details: tokenError.message || 'Database error',
        hint: 'Please ensure the download_tokens table exists in Supabase'
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true,
      token,
      downloadUrl: `/api/download-with-token?token=${token}`,
      expiresAt: expiresAt.toISOString()
    })

  } catch (error) {
    console.error('Generate download token error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate download token',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
