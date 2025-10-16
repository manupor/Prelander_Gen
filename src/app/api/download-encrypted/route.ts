import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import JSZip from 'jszip'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { slug, userEmail } = await request.json()

    if (!slug || !userEmail) {
      return NextResponse.json({ error: 'Missing slug or userEmail' }, { status: 400 })
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

    // Generate a random password for the ZIP file
    const password = crypto.randomBytes(8).toString('hex').toUpperCase()

    // Create encryption function
    const encryptContent = (content: string, password: string): string => {
      const cipher = crypto.createCipher('aes-256-cbc', password)
      let encrypted = cipher.update(content, 'utf8', 'base64')
      encrypted += cipher.final('base64')
      return encrypted
    }

    // Create ZIP file with encrypted content
    const zip = new JSZip()
    
    // Create content files
    const readmeContent = `
# ${site.brand_name} - Prelander

## 🔐 ENCRYPTED PACKAGE NOTICE
This package contains encrypted files that require a password to decrypt.

## Site Information
- Brand Name: ${site.brand_name}
- Template: ${site.template_id}
- Created: ${new Date(site.created_at).toLocaleDateString()}
- Slug: ${site.slug}

## 🔑 DECRYPTION INSTRUCTIONS
1. Use the password sent to your email: ${userEmail}
2. Run the decryption script: node decrypt.js
3. Upload the decrypted files to your web server
4. The main file will be index.html

## Support
For support, contact your account manager.

⚠️ IMPORTANT: All files in this package are encrypted with AES-256-CBC encryption.
    `.trim()

    const configContent = JSON.stringify({
      brandName: site.brand_name,
      templateId: site.template_id,
      colors: {
        primary: site.primary_color,
        secondary: site.secondary_color,
        accent: site.accent_color
      },
      content: {
        headline: site.headline,
        cta: site.cta,
        ctaUrl: site.cta_url
      },
      logo: site.logo_url,
      exportDate: new Date().toISOString(),
      encrypted: true,
      encryptionMethod: 'AES-256-CBC'
    }, null, 2)

    // Create decryption script
    const decryptScript = `
const crypto = require('crypto');
const fs = require('fs');

const password = '${password}';

function decryptFile(encryptedContent, password) {
  try {
    const decipher = crypto.createDecipher('aes-256-cbc', password);
    let decrypted = decipher.update(encryptedContent, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error('Decryption failed. Please check your password.');
    return null;
  }
}

// Decrypt index.html
if (fs.existsSync('index.html.encrypted')) {
  const encryptedHtml = fs.readFileSync('index.html.encrypted', 'utf8');
  const decryptedHtml = decryptFile(encryptedHtml, password);
  if (decryptedHtml) {
    fs.writeFileSync('index.html', decryptedHtml);
    console.log('✅ index.html decrypted successfully');
  }
}

// Decrypt config.json
if (fs.existsSync('config.json.encrypted')) {
  const encryptedConfig = fs.readFileSync('config.json.encrypted', 'utf8');
  const decryptedConfig = decryptFile(encryptedConfig, password);
  if (decryptedConfig) {
    fs.writeFileSync('config.json', decryptedConfig);
    console.log('✅ config.json decrypted successfully');
  }
}

console.log('\\n🎉 Decryption complete! Your files are ready to upload.');
console.log('📁 Main file: index.html');
    `.trim()

    // Add files to ZIP (some encrypted, some not)
    zip.file('README.md', readmeContent)
    zip.file('decrypt.js', decryptScript)
    
    // Encrypt sensitive files
    if (site.generated_html) {
      const encryptedHtml = encryptContent(site.generated_html, password)
      zip.file('index.html.encrypted', encryptedHtml)
    }
    
    const encryptedConfig = encryptContent(configContent, password)
    zip.file('config.json.encrypted', encryptedConfig)

    // Add password notice (unencrypted for reference)
    const passwordNotice = `
🔐 SECURITY NOTICE - ENCRYPTED PRELANDER PACKAGE
===============================================

This package contains ENCRYPTED files that require a password to decrypt.

IMPORTANT SECURITY INFORMATION:
- Download requested from: ${userEmail}
- Generated on: ${new Date().toLocaleString()}
- Site: ${site.brand_name} (${slug})
- Encryption: AES-256-CBC

DECRYPTION INSTRUCTIONS:
1. Ensure you have Node.js installed
2. Run: node decrypt.js
3. The script will decrypt all files using the password sent to your email
4. Upload the decrypted index.html to your web server

ENCRYPTED FILES:
- index.html.encrypted (your landing page)
- config.json.encrypted (site configuration)

UNENCRYPTED FILES:
- README.md (instructions)
- decrypt.js (decryption script)
- SECURITY_NOTICE.txt (this file)

⚠️ Keep your password secure and delete this notice after decryption.

Generated by Olavivo PrelanderAI
    `.trim()

    zip.file('SECURITY_NOTICE.txt', passwordNotice)

    // Generate the ZIP file
    const zipBuffer = await zip.generateAsync({ 
      type: 'uint8array',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    })
    
    // Send password via email
    try {
      const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/send-download-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          password: password,
          siteName: site.brand_name,
          slug: slug
        }),
      })

      if (!emailResponse.ok) {
        console.error('Failed to send email')
        // Continue with download even if email fails
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Continue with download even if email fails
    }

    // Get current user for database record
    const { data: { user } } = await supabase.auth.getUser()
    
    // Store download record in database if user is authenticated
    if (user) {
      try {
        await supabase
          .from('download_passwords')
          .insert({
            site_id: site.id,
            user_id: user.id,
            password: password,
            expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
          })
      } catch (dbError) {
        console.error('Failed to store download record:', dbError)
      }
    }

    // Return the ZIP file
    return new NextResponse(Buffer.from(zipBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${site.brand_name.replace(/[^a-zA-Z0-9]/g, '_')}_${slug}.zip"`,
        'X-Download-Password': password, // Include password in header for development
      },
    })

  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json({ error: 'Failed to generate download' }, { status: 500 })
  }
}
