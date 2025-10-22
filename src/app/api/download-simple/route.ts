import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import JSZip from 'jszip'

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json()

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
    }

    console.log('[API] Download request for slug:', slug)

    // Get site from database
    const supabase = await createClient()
    const { data: site, error } = await supabase
      .from('sites')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !site) {
      console.error('[API] Site not found:', error)
      return NextResponse.json({ error: 'Site not found' }, { status: 404 })
    }

    console.log('[API] Site found:', site.brand_name)

    // Create simple ZIP
    const zip = new JSZip()
    
    // Add HTML file
    const html = site.generated_html || `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${site.brand_name}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        .container {
            text-align: center;
            max-width: 600px;
        }
        h1 {
            font-size: 3em;
            margin-bottom: 20px;
        }
        .cta {
            display: inline-block;
            background: #ffd700;
            color: #333;
            padding: 15px 40px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        ${site.logo_url ? `<img src="${site.logo_url}" alt="${site.brand_name}" style="max-width: 200px; margin-bottom: 20px;">` : ''}
        <h1>${site.headline || site.brand_name}</h1>
        <p>${site.description || 'Welcome to our landing page'}</p>
        <a href="${site.cta_url || '#'}" class="cta">${site.cta || 'Get Started'}</a>
    </div>
</body>
</html>
    `.trim()

    zip.file('index.html', html)
    
    // Add README
    zip.file('README.md', `# ${site.brand_name}

## Deployment Instructions

1. Upload the index.html file to your web hosting
2. Access via your domain

Your landing page is ready to use!
`)

    console.log('[API] Generating ZIP...')
    const zipBuffer = await zip.generateAsync({ type: 'uint8array' })
    console.log('[API] ZIP generated, size:', zipBuffer.length)

    return new NextResponse(Buffer.from(zipBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="' + (site.brand_name || 'prelander').replace(/[^a-z0-9]/gi, '_') + '.zip"',
      },
    })

  } catch (error) {
    console.error('[API] Error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate download',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
