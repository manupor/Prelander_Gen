import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import JSZip from 'jszip'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const siteId = searchParams.get('siteId')

    if (!siteId) {
      return NextResponse.json({ error: 'Site ID is required' }, { status: 400 })
    }

    // Verify site ownership and get site data
    const { data: site, error: siteError } = await supabase
      .from('sites')
      .select(`
        *,
        organizations!inner(owner_user_id)
      `)
      .eq('id', siteId)
      .eq('organizations.owner_user_id', user.id)
      .single()

    if (siteError || !site) {
      return NextResponse.json({ error: 'Site not found or access denied' }, { status: 404 })
    }

    // Create ZIP file
    const zip = new JSZip()

    // Add index.html with inlined CSS
    const htmlWithInlinedCSS = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${site.brand_name} - ${site.headline}</title>
  <style>
    ${site.generated_css}
  </style>
</head>
<body>
  ${site.generated_html?.replace('<!DOCTYPE html>', '').replace(/<html[^>]*>/, '').replace('</html>', '').replace(/<head>[\s\S]*?<\/head>/, '').replace(/<body[^>]*>/, '').replace('</body>', '') || ''}
</body>
</html>
    `.trim()

    zip.file('index.html', htmlWithInlinedCSS)

    // Add separate CSS file
    zip.file('styles.css', site.generated_css || '')

    // Add logo if available
    if (site.logo_url) {
      try {
        const logoResponse = await fetch(site.logo_url)
        if (logoResponse.ok) {
          const logoBuffer = await logoResponse.arrayBuffer()
          const logoExt = site.logo_url.split('.').pop() || 'png'
          zip.file(`assets/logo.${logoExt}`, logoBuffer)
        }
      } catch (error) {
        console.warn('Failed to fetch logo for export:', error)
      }
    }

    // Add README with deployment instructions
    const readme = `# ${site.brand_name} Landing Page

This package contains your generated landing page from Olavivo Prelander AI.

## Files Included:
- index.html - Your complete landing page with inlined CSS
- styles.css - Separate CSS file for customization
${site.logo_url ? '- assets/logo.* - Your brand logo\n' : ''}
## Quick Start:

### Option 1: Local Testing
1. Double-click \`index.html\` to open in your browser
2. Your landing page will display immediately

### Option 2: Deploy to Web Hosting
1. Upload all files to your web server's public directory
2. Ensure index.html is in the root
3. Your site is live!

### Option 3: Popular Hosting Platforms

**Netlify (Recommended - Free)**
1. Go to https://app.netlify.com/drop
2. Drag and drop this entire folder
3. Your site is live instantly!

**Vercel (Free)**
1. Go to https://vercel.com/new
2. Upload this folder
3. Deploy in seconds

**GitHub Pages (Free)**
1. Create a new repository
2. Upload these files
3. Enable GitHub Pages in settings

## Customization

Edit \`styles.css\` to customize colors, fonts, and layout.

**Brand Colors Used:**
- Primary: ${site.primary_color}
- Secondary: ${site.secondary_color}  
- Accent: ${site.accent_color}

**Template:** ${site.template_id.toUpperCase()}

---
Generated: ${new Date().toLocaleDateString()}
Powered by Nexus Forge - Olavivo Prelander AI
`

    zip.file('README.md', readme)

    // Generate ZIP buffer
    const zipBuffer = await zip.generateAsync({ 
      type: 'arraybuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 }
    })

    // Return ZIP file
    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${site.brand_name?.replace(/[^a-zA-Z0-9]/g, '-')}-landing-page.zip"`
      }
    })

  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
