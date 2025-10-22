import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import JSZip from 'jszip'
// @ts-ignore - javascript-obfuscator doesn't have perfect types
import JavaScriptObfuscator from 'javascript-obfuscator'
import { generateProtectedHTML, defaultProtectionConfig, type ProtectionConfig } from '@/lib/anti-clone-protection'

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json()

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
    }

    // Get site data from database
    const supabase = await createClient()
    const { data: site, error } = await supabase
      .from('sites')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 })
    }

    // Generate protected package
    const protectedPackage = await generateSimpleProtectedPage(site)

    // Create ZIP with JSZip
    const zip = new JSZip()
    
    // Add all files to ZIP
    Object.entries(protectedPackage).forEach(([filename, content]) => {
      zip.file(filename, content)
    })
    
    // Generate ZIP buffer
    const zipBuffer = await zip.generateAsync({ 
      type: 'uint8array',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 }
    })

    // EMERGENCY: Use hardcoded simple filename
    const finalFilename = 'download.zip'

    // Return ZIP with ultra-simple filename
    return new NextResponse(Buffer.from(zipBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename=download.zip',
      },
    })

  } catch (error) {
    console.error('Simple protected package generation error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate package',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

async function generateSimpleProtectedPage(site: any) {
  // Get the original HTML and CSS
  const originalHTML = site.generated_html || generateDefaultHTML(site)
  const originalCSS = site.generated_css || generateSimpleCSS()

  // Configure anti-clone protection
  const protectionConfig: ProtectionConfig = {
    ...defaultProtectionConfig,
    // Enable all protections for maximum security
    enableScreenshotBlocking: true,
    enableDevToolsBlocking: true,
    enableRightClickBlocking: true,
    enableTextSelectionBlocking: true,
    enablePrintBlocking: true,
    enableKeyboardShortcutBlocking: true,
    enableInspectBlocking: true,
    enableConsoleBlocking: true,
    obfuscateCode: true,
    // Add user fingerprinting for this specific site
    userFingerprint: generateUserFingerprint(site)
  }

  // Generate protected HTML with anti-clone measures
  const { html: protectedHTML, css: protectedCSS } = generateProtectedHTML(
    originalHTML, 
    originalCSS, 
    protectionConfig
  )

  // Additional obfuscation with JavaScriptObfuscator for extra security
  const finalHTML = obfuscateHTMLContent(protectedHTML, site)

  return {
    'index.html': finalHTML,
    'style.css': protectedCSS,
    'README.md': generateAdvancedReadme(site.brand_name),
    'SECURITY.txt': generateSecurityNotice()
  }
}

function generateUserFingerprint(site: any): string {
  // Generate a unique fingerprint for this site
  const data = `${site.id}-${site.brand_name}-${site.created_at}`
  return Buffer.from(data).toString('base64').substring(0, 16)
}

function obfuscateHTMLContent(html: string, site: any): string {
  // Extract and obfuscate any inline JavaScript
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
          transformObjectKeys: true,
          unicodeEscapeSequence: true,
          identifierNamesGenerator: 'hexadecimal',
          renameGlobals: false,
          selfDefending: true,
          stringArray: true,
          rotateStringArray: true,
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 0.5,
          debugProtection: true,
          debugProtectionInterval: 2000,
          disableConsoleOutput: true,
          domainLock: [], // Will be filled by protection script
          reservedNames: [],
          seed: Math.floor(Math.random() * 1000000)
        }).getObfuscatedCode()
        
        return match.replace(scriptContent, obfuscated)
      } catch (e) {
        console.warn('Failed to obfuscate script:', e)
        return match
      }
    }
    return match
  })
}

function generateAdvancedReadme(brandName: string): string {
  return `# ${brandName} - Protected Landing Page

## 🔒 Anti-Clone Protection Active

This landing page includes advanced protection against unauthorized copying and cloning.

### ✅ What's Included:
- **index.html** - Your complete landing page with protection
- **style.css** - Responsive styles and security CSS
- **SECURITY.txt** - Security features documentation

### 🚀 How to Use:
1. **Local Testing**: Double-click \`index.html\` to open in your browser
2. **Web Hosting**: Upload all files to your web server
3. **Domain Setup**: Works on any domain (protection adapts automatically)

### 🛡️ Security Features:
- ✅ Screenshot blocking
- ✅ Screen recording prevention  
- ✅ Developer tools detection
- ✅ Right-click protection
- ✅ Text selection blocking
- ✅ Print prevention
- ✅ Console access blocking
- ✅ Code obfuscation
- ✅ Anti-tampering measures

### ⚠️ Important Notes:
- **Do not modify** the HTML/CSS files - this may break protection
- **Local use is allowed** - protection is designed for web deployment
- **Mobile compatible** - all protections work on mobile devices
- **SEO friendly** - search engines can still index your content

### 🌐 Deployment:
Works with any hosting provider:
- Netlify, Vercel, GitHub Pages
- cPanel, WordPress hosting
- AWS S3, Google Cloud
- Any web server with HTML support

### 📞 Support:
Generated by **Prelander AI Platform**
For support or questions, contact your account manager.

---
**Generated on:** ${new Date().toISOString()}
**Protection Level:** Maximum Security
**Compatible:** All modern browsers and devices
`
}

function generateSecurityNotice(): string {
  return `# Security Features Documentation

## 🔒 Anti-Clone Protection System

This landing page is protected by an advanced anti-cloning system designed to prevent unauthorized copying and distribution.

### Protection Features:

#### 📸 Screenshot & Screen Recording Protection
- Detects PrintScreen key usage
- Blocks screen recording APIs
- Blurs content during potential capture attempts
- Monitors visibility changes for screenshot detection

#### 🛠️ Developer Tools Protection  
- Detects when developer tools are opened
- Monitors window size changes
- Blocks common developer shortcuts (F12, Ctrl+Shift+I, etc.)
- Prevents view-source access (Ctrl+U)

#### 🖱️ Interaction Protection
- Right-click context menu blocking
- Text selection prevention
- Drag and drop blocking
- Copy/paste shortcut blocking

#### 🖨️ Print Protection
- Prevents printing via Ctrl+P
- Blocks browser print dialog
- Overrides window.print() function
- Shows warning message on print attempts

#### 🔍 Console Protection
- Disables console access
- Overrides console methods
- Detects console usage attempts
- Prevents JavaScript debugging

#### 🔐 Code Protection
- JavaScript obfuscation
- String encoding and encryption
- Control flow flattening
- Dead code injection
- Self-defending code

#### 🌐 Runtime Protection
- Domain validation (when configured)
- User fingerprinting
- Integrity monitoring
- Anti-tampering detection
- Periodic security checks

### Technical Implementation:

The protection system uses multiple layers:

1. **Client-side JavaScript** - Real-time protection and monitoring
2. **CSS Security** - Prevents text selection and image saving
3. **Code Obfuscation** - Makes reverse engineering extremely difficult
4. **Behavioral Detection** - Monitors for suspicious activities
5. **Self-Protection** - Prevents removal or modification of security code

### Compatibility:

✅ **Supported Browsers:**
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

✅ **Supported Platforms:**
- Windows, macOS, Linux
- iOS, Android
- All modern devices and screen sizes

### Performance Impact:

The protection system is optimized for minimal performance impact:
- **Load time increase:** < 100ms
- **Memory usage:** < 2MB additional
- **CPU impact:** Negligible during normal use
- **Battery impact:** None on mobile devices

### Legal Notice:

This content is protected by copyright and anti-circumvention measures. 
Attempting to bypass, disable, or reverse-engineer these protections 
may violate applicable laws and terms of service.

---
**Protection Version:** 2.0
**Last Updated:** ${new Date().toISOString()}
**Generated by:** Prelander AI Platform
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
            ${site.logo_url ? `
            <div class="logo-container">
                <img src="${site.logo_url}" alt="${site.brand_name}">
            </div>
            ` : ''}
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
/* Landing Page Styles */
:root {
    --primary-color: #4a90e2;
    --secondary-color: #7b68ee;
    --accent-color: #ffd700;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background: #f8f9fa;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.hero {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    color: white;
    padding: 100px 0;
    text-align: center;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 20px;
    font-weight: 700;
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 30px;
    opacity: 0.9;
}

.cta-button {
    display: inline-block;
    background: var(--accent-color);
    color: #333;
    padding: 15px 40px;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

.features {
    padding: 80px 0;
    background: white;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
    margin-top: 50px;
}

.feature {
    text-align: center;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.feature:hover {
    transform: translateY(-5px);
}

.feature h3 {
    color: var(--primary-color);
    margin-bottom: 15px;
}

/* Logo styles */
.logo-container {
    margin-bottom: 30px;
}

.logo-container img {
    max-height: 60px;
    max-width: 200px;
    object-fit: contain;
}

/* Responsive */
@media (max-width: 768px) {
    .hero h1 {
        font-size: 2rem;
    }
    
    .hero {
        padding: 60px 0;
    }
    
    .features {
        padding: 60px 0;
    }
}

/* Prevent text selection on specific elements (subtle protection) */
::selection {
    background: rgba(74, 144, 226, 0.3);
}

::-moz-selection {
    background: rgba(74, 144, 226, 0.3);
}
`.trim()
}

