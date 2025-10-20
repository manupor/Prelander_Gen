import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { renderTemplate as renderT6 } from '@/templates/t6/server'
import { renderTemplate as renderT7 } from '@/templates/t7/server'
import { renderTemplate as renderT9 } from '@/templates/t9/server'
import { renderTemplate as renderT10 } from '@/templates/t10/server'
import { renderTemplate as renderT11 } from '@/templates/t11/server'
import { renderTemplate as renderT12 } from '@/templates/t12/server'
import { renderTemplate as renderT13 } from '@/templates/t13/server'

const templateRenderers = {
  t6: renderT6,
  t7: renderT7,
  t9: renderT9,
  t10: renderT10,
  t11: renderT11,
  t12: renderT12,
  t13: renderT13,
}

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json()

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Get site data
    const { data: site, error: siteError } = await supabase
      .from('sites')
      .select('*')
      .eq('slug', slug)
      .single()

    if (siteError || !site) {
      return NextResponse.json(
        { success: false, error: 'Site not found' },
        { status: 404 }
      )
    }

    // Regenerate based on template_id
    const templateId = site.template_id
    const renderer = templateRenderers[templateId as keyof typeof templateRenderers]
    
    if (renderer) {
      const brandConfig = {
        brandName: site.brand_name,
        logoUrl: site.logo_url || '',
        colors: {
          primary: site.primary_color || '#4a90e2',
          secondary: site.secondary_color || '#7b68ee',
          accent: site.accent_color || '#ffd700'
        },
        copy: {
          headline: site.headline || 'YOUR TITLE HERE',
          subheadline: site.subheadline || '',
          cta: site.cta || 'PLAY NOW'
        },
        industry: site.industry || 'Casino & Gaming',
        description: site.description || '',
        ctaUrl: site.cta_url || 'https://example.com',
        popupTitle: site.popup_title || 'WINNER!',
        popupMessage: site.popup_message || 'Congratulations! You\'ve won!',
        popupPrize: site.popup_prize || '$1,000 + 50 FREE SPINS',
        gameBalance: site.game_balance || 1000
      } as any

      const { html, css } = renderer(brandConfig)

      // Update generated HTML
      const { error: updateError } = await supabase
        .from('sites')
        .update({
          generated_html: html,
          generated_css: css
        })
        .eq('slug', slug)

      if (updateError) {
        throw updateError
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Regenerate error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
