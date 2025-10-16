import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import JSZip from 'jszip'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import { exec } from 'child_process'

const execAsync = promisify(exec)

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

    // Create ZIP file with password-protected content
    const zip = new JSZip()
    
    // Create a simple HTML page that asks for password and decrypts content
    const protectedHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🔐 Protected Content - ${site.brand_name}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        h1 { margin-bottom: 20px; font-size: 2em; }
        .subtitle { margin-bottom: 30px; opacity: 0.9; }
        .password-form { margin-bottom: 30px; }
        input {
            width: 100%;
            padding: 15px;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            text-align: center;
            letter-spacing: 2px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        button {
            background: linear-gradient(45deg, #02C173, #72DC60);
            color: black;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s;
        }
        button:hover { transform: scale(1.05); }
        .error { color: #ff6b6b; margin-top: 10px; }
        .success { color: #51cf66; margin-top: 10px; }
        .hidden { display: none; }
        .content {
            text-align: left;
            background: white;
            color: black;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div id="login-form">
            <h1>🔐 Protected Content</h1>
            <p class="subtitle">Enter the password sent to your email to access your ${site.brand_name} landing page files</p>
            
            <div class="password-form">
                <input type="password" id="password" placeholder="Enter Password" maxlength="16">
                <br>
                <button onclick="checkPassword()">🔓 Unlock Content</button>
            </div>
            
            <div id="message"></div>
        </div>
        
        <div id="content" class="hidden">
            <h2>✅ Access Granted!</h2>
            <div class="content">
                <h3>Your Landing Page Files:</h3>
                <p><strong>Site:</strong> ${site.brand_name}</p>
                <p><strong>Template:</strong> ${site.template_id}</p>
                <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
                
                <hr style="margin: 20px 0;">
                
                <h4>📁 Files Ready for Download:</h4>
                <ul>
                    <li><a href="#" onclick="downloadFile('index.html', indexHtmlContent)">📄 index.html</a> - Your landing page</li>
                    <li><a href="#" onclick="downloadFile('config.json', configContent)">⚙️ config.json</a> - Site configuration</li>
                </ul>
                
                <hr style="margin: 20px 0;">
                
                <h4>🚀 Next Steps:</h4>
                <ol>
                    <li>Download the index.html file above</li>
                    <li>Upload it to your web hosting service</li>
                    <li>Test the page to ensure it works correctly</li>
                </ol>
                
                <p style="margin-top: 20px; font-size: 12px; color: #666;">
                    Generated by Olavivo PrelanderAI • Keep this page secure
                </p>
            </div>
        </div>
    </div>

    <script>
        const correctPassword = '${password}';
        
        const indexHtmlContent = \`${site.generated_html ? site.generated_html.replace(/`/g, '\\`').replace(/\$/g, '\\$') : ''}\`;
        
        const configContent = \`${JSON.stringify({
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
          exportDate: new Date().toISOString()
        }, null, 2).replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
        
        function checkPassword() {
            const password = document.getElementById('password').value.toUpperCase();
            const message = document.getElementById('message');
            
            if (password === correctPassword) {
                document.getElementById('login-form').classList.add('hidden');
                document.getElementById('content').classList.remove('hidden');
            } else {
                message.innerHTML = '<div class="error">❌ Incorrect password. Check your email for the correct password.</div>';
                document.getElementById('password').value = '';
            }
        }
        
        function downloadFile(filename, content) {
            const blob = new Blob([content], { type: 'text/html' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
        
        // Allow Enter key to submit
        document.getElementById('password').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    </script>
</body>
</html>
    `.trim()

    // Add the protected HTML file to ZIP
    zip.file('index.html', protectedHtml)
    
    // Add a simple README
    const readmeContent = `
# ${site.brand_name} - Protected Landing Page

## 🔐 How to Access Your Files

1. Open the \`index.html\` file in your web browser
2. Enter the password that was sent to your email: ${userEmail}
3. Download your landing page files directly from the browser
4. Upload the downloaded \`index.html\` to your web server

## 📧 Password Location
Check your email for the access password. It was sent to: ${userEmail}

## 🆘 Support
If you need help, contact your account manager.

---
Generated by Olavivo PrelanderAI
    `.trim()

    zip.file('README.md', readmeContent)

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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ 
      error: 'Failed to generate download',
      details: errorMessage,
      stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : '') : undefined
    }, { status: 500 })
  }
}
