import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import JSZip from 'jszip'
// @ts-ignore
import JavaScriptObfuscator from 'javascript-obfuscator'
import { generateProtectedHTML, defaultProtectionConfig } from '@/lib/anti-clone-protection'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 })
    }

    const supabase = await createClient()

    // Verify token
    const { data: tokenData, error: tokenError } = await supabase
      .from('download_tokens')
      .select('*')
      .eq('token', token)
      .single()

    if (tokenError || !tokenData) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 404 })
    }

    // Check if token is expired
    if (new Date(tokenData.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Token expired' }, { status: 410 })
    }

    // Check if token was already used
    if (tokenData.used) {
      return NextResponse.json({ error: 'Token already used - download allowed only once' }, { status: 410 })
    }

    // Get site data
    const { data: site, error: siteError } = await supabase
      .from('sites')
      .select('*')
      .eq('id', tokenData.site_id)
      .single()

    if (siteError || !site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 })
    }

    // Generate protected package
    const protectedPackage = await generateSimpleProtectedPage(site)

    // Create ZIP
    const zip = new JSZip()
    Object.entries(protectedPackage).forEach(([filename, content]) => {
      zip.file(filename, content)
    })
    
    const zipBuffer = await zip.generateAsync({ 
      type: 'uint8array',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 }
    })

    // Mark token as used
    await supabase
      .from('download_tokens')
      .update({ used: true, used_at: new Date().toISOString() })
      .eq('token', token)

    // Return ZIP
    return new NextResponse(Buffer.from(zipBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename=download.zip',
      },
    })

  } catch (error) {
    console.error('Download with token error:', error)
    return NextResponse.json({ 
      error: 'Failed to download',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

async function generateSimpleProtectedPage(site: any) {
  const originalHTML = site.generated_html || generateDefaultHTML(site)
  const originalCSS = site.generated_css || generateSimpleCSS()

  const protectionConfig = {
    ...defaultProtectionConfig,
    enableScreenshotBlocking: true,
    enableDevToolsBlocking: true,
    enableRightClickBlocking: true,
    enableTextSelectionBlocking: true,
    enablePrintBlocking: true,
    enableKeyboardShortcutBlocking: true,
    enableInspectBlocking: true,
    enableConsoleBlocking: true,
    obfuscateCode: true,
    userFingerprint: generateUserFingerprint(site)
  }

  const { html: protectedHTML, css: protectedCSS } = generateProtectedHTML(
    originalHTML, 
    originalCSS, 
    protectionConfig
  )

  const finalHTML = obfuscateHTMLContent(protectedHTML, site)

  return {
    'index.html': finalHTML,
    'style.css': protectedCSS,
    'README.md': generateReadme(site.brand_name),
  }
}

function generateUserFingerprint(site: any): string {
  const data = `${site.id}-${site.brand_name}-${site.created_at}`
  return Buffer.from(data).toString('base64').substring(0, 16)
}

function obfuscateHTMLContent(html: string, site: any): string {
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi
  
  return html.replace(scriptRegex, (match, scriptContent) => {
    if (scriptContent.trim()) {
      try {
        const obfuscated = JavaScriptObfuscator.obfuscate(scriptContent, {
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.8,
          numbersToExpressions: true,
          simplify: true,
          stringArrayShuffle: true,
          splitStrings: true,
          stringArrayThreshold: 0.9,
        }).getObfuscatedCode()
        
        return match.replace(scriptContent, obfuscated)
      } catch (e) {
        return match
      }
    }
    return match
  })
}

function generateReadme(brandName: string): string {
  return `# ${brandName} - Protected Prelander

## 🔒 High-Security Protected Landing Page

This prelander includes advanced anti-clone and anti-scraping protection.

### ✅ What's Included:
- **index.html** - Your complete protected landing page
- **style.css** - Responsive styles
- **README.md** - This file

### 🚀 How to Use:
1. **Test Locally**: Double-click \`index.html\` to open in your browser
2. **Deploy**: Upload all files to your web hosting service
3. **Go Live**: Share your URL and start converting!

### 🛡️ Security Features:
- ✅ Anti-screenshot protection
- ✅ DevTools blocking
- ✅ Code obfuscation & encryption
- ✅ Right-click prevention
- ✅ Single-use download token

---
**Generated by Prelander AI Platform**
**Protection Level:** Maximum Security
**Downloaded:** ${new Date().toLocaleString()}
`
}

function generateDefaultHTML(site: any): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${site.brand_name}</title>
</head>
<body>
    <div class="hero">
        <div class="container">
            ${site.logo_url ? `<img src="${site.logo_url}" alt="${site.brand_name}">` : ''}
            <h1>${site.headline || 'Welcome'}</h1>
            <p>${site.description || 'Experience something amazing'}</p>
            <a href="${site.cta_url || '#'}" class="cta-button">${site.cta || 'Get Started'}</a>
        </div>
    </div>
</body>
</html>`
}

function generateSimpleCSS(): string {
  return `
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin: 0;
  padding: 0;
}
`.trim()
}
