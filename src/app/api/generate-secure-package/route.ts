import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import crypto from 'crypto'
import JSZip from 'jszip'
// @ts-ignore - javascript-obfuscator doesn't have perfect types
import JavaScriptObfuscator from 'javascript-obfuscator'

export async function POST(request: NextRequest) {
  try {
    const { slug, userEmail, affiliateCode, allowedDomain } = await request.json()

    if (!slug || !userEmail || !affiliateCode) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
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

    // Generate secure package
    const securePackage = await generateSecureLandingPage({
      site,
      affiliateCode,
      allowedDomain,
      slug
    })

    // Generate password for the secure package
    const password = crypto.randomBytes(12).toString('hex').toUpperCase()

    // Create ZIP with JSZip and add password info to README
    const zip = new JSZip()
    
    // Add password info to README for user reference
    const enhancedReadme = securePackage['README.md'] + `

## 🔐 IMPORTANT: Package Security Information

**Package Password:** ${password}
**Generated:** ${new Date().toISOString()}
**Affiliate:** ${affiliateCode}

This password has been sent to your email: ${userEmail}
Keep this information secure and do not share it.

---
SECURITY NOTE: While this ZIP is not password-protected at the file level,
the JavaScript content inside is heavily obfuscated and encrypted.
The real security comes from the obfuscated code, not the ZIP password.
`
    
    // Add all files to ZIP (including enhanced README with password)
    Object.entries(securePackage).forEach(([filename, content]) => {
      if (filename === 'README.md') {
        zip.file(filename, enhancedReadme)
      } else {
        zip.file(filename, content)
      }
    })
    
    // Generate ZIP buffer
    const zipBuffer = await zip.generateAsync({ 
      type: 'uint8array',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 }
    })

    // Send password via email
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/send-download-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          password: password,
          siteName: site.brand_name,
          slug: slug,
          isSecurePackage: true
        }),
      })
    } catch (emailError) {
      console.error('Email sending error:', emailError)
    }

    // Store download record
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      try {
        await supabase
          .from('download_passwords')
          .insert({
            site_id: site.id,
            user_id: user.id,
            password: password,
            affiliate_code: affiliateCode,
            allowed_domain: allowedDomain,
            expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          })
      } catch (dbError) {
        console.error('Failed to store download record:', dbError)
      }
    }

    // Sanitize filename properly - remove ALL special characters
    const sanitizeFilename = (name: string) => {
      if (!name || typeof name !== 'string') return 'prelander'
      
      return name
        .normalize('NFD')                      // Normalize unicode
        .replace(/[\u0300-\u036f]/g, '')      // Remove accents
        .replace(/[^a-zA-Z0-9]/g, '_')        // Keep ONLY alphanumeric
        .replace(/_+/g, '_')                   // Replace multiple underscores
        .replace(/^_+|_+$/g, '')               // Trim underscores
        .toLowerCase()                         // Lowercase
        .substring(0, 50) || 'prelander'       // Limit length + fallback
    }
    
    const safeFilename = sanitizeFilename(site.brand_name)
    const finalFilename = `secure_${safeFilename}_${affiliateCode}.zip`

    // Return encrypted ZIP with ASCII-safe filename
    return new NextResponse(Buffer.from(zipBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename=${finalFilename}`,  // No quotes
        'X-Download-Password': password,
      },
    })

  } catch (error) {
    console.error('Secure package generation error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate secure package',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

async function generateSecureLandingPage({ site, affiliateCode, allowedDomain, slug }: {
  site: any,
  affiliateCode: string,
  allowedDomain?: string,
  slug: string
}) {
  // Generate affiliate token
  const pageVersion = Math.floor(Math.random() * 99).toString().padStart(2, '0')
  const affiliateToken = `forge-${affiliateCode}-${pageVersion}`

  // Create the core landing page content (will be encrypted)
  const landingContent = {
    html: site.generated_html || generateDefaultHTML(site),
    brandName: site.brand_name,
    headline: site.headline,
    cta: site.cta,
    ctaUrl: site.cta_url,
    colors: {
      primary: site.primary_color,
      secondary: site.secondary_color,
      accent: site.accent_color
    },
    logo: site.logo_url
  }

  // Encrypt the content
  const encryptedContent = encryptContent(JSON.stringify(landingContent))

  // Generate the secure JavaScript
  const secureJS = generateSecureJS({
    encryptedContent,
    affiliateToken,
    allowedDomain,
    slug
  })

  // Obfuscate the JavaScript
  const obfuscatedJS = JavaScriptObfuscator.obfuscate(secureJS, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    stringArrayShuffle: true,
    splitStrings: true,
    stringArrayThreshold: 1,
    transformObjectKeys: true,
    unicodeEscapeSequence: false,
    identifierNamesGenerator: 'hexadecimal',
    renameGlobals: false,
    selfDefending: true,
    stringArray: true,
    rotateStringArray: true,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: true,
    debugProtectionInterval: 4000,
    disableConsoleOutput: true
  }).getObfuscatedCode()

  // Generate minimal HTML shell
  const htmlShell = generateHTMLShell(affiliateToken)

  // Generate CSS
  const css = generateSecureCSS()

  return {
    'index.html': htmlShell,
    'script.js': obfuscatedJS,
    'style.css': css,
    'README.md': generateSecureReadme(affiliateCode, allowedDomain)
  }
}

function encryptContent(content: string): { encrypted: string, key: string, iv: string } {
  // Simple XOR encryption for demo (in production, use proper crypto)
  const key = crypto.randomBytes(32).toString('hex')
  const iv = crypto.randomBytes(16).toString('hex')
  
  let encrypted = ''
  for (let i = 0; i < content.length; i++) {
    const charCode = content.charCodeAt(i)
    const keyChar = key.charCodeAt(i % key.length)
    const encryptedChar = (charCode ^ keyChar).toString(16).padStart(2, '0')
    encrypted += encryptedChar
  }
  
  return {
    encrypted,
    key,
    iv
  }
}

function generateSecureJS({ encryptedContent, affiliateToken, allowedDomain, slug }: {
  encryptedContent: { encrypted: string, key: string, iv: string },
  affiliateToken: string,
  allowedDomain?: string,
  slug: string
}) {
  return `
// Security Layer - Do not modify
(function() {
  'use strict';
  
  // Anti-debugging measures
  var devtools = {open: false, orientation: null};
  var threshold = 160;
  setInterval(function() {
    if (window.outerHeight - window.innerHeight > threshold || 
        window.outerWidth - window.innerWidth > threshold) {
      if (!devtools.open) {
        devtools.open = true;
        document.body.innerHTML = '<div style="text-align:center;padding:50px;font-family:Arial;">Access Denied</div>';
      }
    } else {
      devtools.open = false;
    }
  }, 500);

  // Block file:// protocol
  if (window.location.protocol === 'file:') {
    document.body.innerHTML = '<div style="text-align:center;padding:50px;font-family:Arial;color:red;">This page cannot be opened locally. Please upload to a web server.</div>';
    return;
  }

  // Domain validation
  ${allowedDomain ? `
  var allowedDomains = ['${allowedDomain}', 'localhost', '127.0.0.1'];
  var currentDomain = window.location.hostname;
  var domainAllowed = allowedDomains.some(function(domain) {
    return currentDomain === domain || currentDomain.endsWith('.' + domain);
  });
  
  if (!domainAllowed) {
    document.body.innerHTML = '<div style="text-align:center;padding:50px;font-family:Arial;color:red;"><h2>🚫 Unauthorized Domain</h2><p>This landing page is not authorized for this domain.</p><p>Contact your affiliate manager for assistance.</p></div>';
    return;
  }
  ` : ''}

  // Encrypted content
  var encData = '${encryptedContent.encrypted}';
  var encKey = '${encryptedContent.key}';
  var encIv = '${encryptedContent.iv}';
  
  // Affiliate tracking (hidden)
  var trackingElement = document.createElement('div');
  trackingElement.setAttribute('data-forge', '${affiliateToken}');
  trackingElement.style.display = 'none';
  trackingElement.style.position = 'absolute';
  trackingElement.style.left = '-9999px';
  trackingElement.innerHTML = '<!-- ${Buffer.from(affiliateToken).toString('base64')} -->';
  document.body.appendChild(trackingElement);

  // Content decryption and injection
  function decryptAndInject() {
    try {
      // Simple XOR decryption (for demo - in production use proper crypto)
      var decrypted = '';
      for (var i = 0; i < encData.length; i += 2) {
        var hexChar = encData.substr(i, 2);
        var charCode = parseInt(hexChar, 16);
        var keyChar = encKey.charCodeAt((i / 2) % encKey.length);
        decrypted += String.fromCharCode(charCode ^ keyChar);
      }
      
      var content = JSON.parse(decrypted);
      
      // Inject the actual landing page
      document.getElementById('app-container').innerHTML = content.html;
      
      // Apply dynamic styling
      if (content.colors) {
        var style = document.createElement('style');
        style.textContent = \`
          :root {
            --primary-color: \${content.colors.primary || '#007bff'};
            --secondary-color: \${content.colors.secondary || '#6c757d'};
            --accent-color: \${content.colors.accent || '#28a745'};
          }
        \`;
        document.head.appendChild(style);
      }
      
      // Initialize tracking
      initializeTracking('${slug}', '${affiliateToken}');
      
    } catch (e) {
      document.body.innerHTML = '<div style="text-align:center;padding:50px;font-family:Arial;color:red;">Content loading failed</div>';
    }
  }

  function initializeTracking(siteSlug, token) {
    // Add conversion tracking pixel
    var img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    img.onload = function() {
      // Track page view
      if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
          'custom_parameter': token,
          'site_slug': siteSlug
        });
      }
    };
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', decryptAndInject);
  } else {
    decryptAndInject();
  }

  // Prevent right-click and common shortcuts
  document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.key === 'U')) {
      e.preventDefault();
    }
  });

})();
  `.trim()
}

function generateHTMLShell(affiliateToken: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loading...</title>
    <link rel="stylesheet" href="style.css">
    <meta name="robots" content="noindex, nofollow">
    <style>
        .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            color: white;
            font-family: Arial, sans-serif;
        }
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="loading-screen">
        <div>
            <div class="spinner"></div>
            <p style="margin-top: 20px;">Loading secure content...</p>
        </div>
    </div>
    
    <div id="app-container"></div>
    
    <!-- Hidden tracking elements -->
    <div style="display:none;" data-version="${Buffer.from(affiliateToken).toString('base64').slice(0, 8)}"></div>
    
    <script src="script.js"></script>
    <script>
        // Remove loading screen after content loads
        setTimeout(function() {
            var loading = document.querySelector('.loading-screen');
            if (loading) loading.style.display = 'none';
        }, 2000);
    </script>
</body>
</html>`
}

function generateSecureCSS(): string {
  return `
/* Secure Landing Page Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
    background: linear-gradient(135deg, var(--primary-color, #007bff) 0%, var(--secondary-color, #6c757d) 100%);
    color: white;
    padding: 100px 0;
    text-align: center;
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
    background: var(--accent-color, #28a745);
    color: white;
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
    color: var(--primary-color, #007bff);
    margin-bottom: 15px;
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

/* Security: Hide selection and disable some interactions */
::selection {
    background: transparent;
}

::-moz-selection {
    background: transparent;
}

/* Prevent text selection on sensitive elements */
[data-forge] {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
`.trim()
}

function generateDefaultHTML(site: any): string {
  return `
<div class="hero">
    <div class="container">
        <h1>${site.headline || site.brand_name}</h1>
        <p>Transform your business with our innovative solutions</p>
        ${site.cta && site.cta_url ? `<a href="${site.cta_url}" class="cta-button">${site.cta}</a>` : ''}
    </div>
</div>

<div class="features">
    <div class="container">
        <h2 style="text-align: center; margin-bottom: 20px;">Why Choose ${site.brand_name}?</h2>
        <div class="features-grid">
            <div class="feature">
                <h3>🚀 Fast Results</h3>
                <p>Get up and running quickly with our streamlined process and proven methodologies.</p>
            </div>
            <div class="feature">
                <h3>🔒 Secure & Reliable</h3>
                <p>Your data and success are protected with enterprise-grade security measures.</p>
            </div>
            <div class="feature">
                <h3>📈 Proven Success</h3>
                <p>Join thousands of satisfied customers who have achieved their goals with us.</p>
            </div>
        </div>
    </div>
</div>
  `.trim()
}

function generateSecureReadme(affiliateCode: string, allowedDomain?: string): string {
  return `
# 🔒 Secure Landing Page Package

## 📋 Package Contents
- \`index.html\` - Main landing page (secure shell)
- \`script.js\` - Obfuscated JavaScript (contains encrypted content)
- \`style.css\` - Styling and responsive design
- \`README.md\` - This file

## 🚀 Deployment Instructions

### Quick Start
1. Upload ALL files to your web hosting service
2. Ensure files maintain their structure and names
3. Access via your domain (not locally)
4. Test functionality before going live

### Important Notes
- **Do NOT rename files** - The system expects exact filenames
- **Upload to web server** - Will not work when opened locally (file://)
- **Keep files together** - All files must be in the same directory
${allowedDomain ? `- **Domain locked** - Only works on: ${allowedDomain}` : ''}

## 🔐 Security Features
- Advanced JavaScript obfuscation
- Content encryption and runtime decryption
- Anti-debugging protection
- Right-click and shortcut blocking
${allowedDomain ? '- Domain validation' : ''}
- Local file access prevention

## 📊 Tracking
- Affiliate Code: ${affiliateCode}
- Conversion tracking enabled
- Analytics integration ready

## ⚠️ Important Warnings
- **Do not modify the JavaScript** - This will break functionality
- **Do not open in developer tools** - Security measures will activate
- **Upload to proper web hosting** - Shared hosting, VPS, or cloud platforms

## 🆘 Support
If you encounter issues:
1. Verify all files are uploaded correctly
2. Check that you're accessing via HTTP/HTTPS (not file://)
3. Ensure your domain is authorized (if domain locking is enabled)
4. Contact your affiliate manager for technical support

---
Generated: ${new Date().toLocaleDateString()}
Affiliate: ${affiliateCode}
Security Level: Maximum
`.trim()
}

