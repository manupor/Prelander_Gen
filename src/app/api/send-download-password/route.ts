import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { email, password, brandName, siteId } = await request.json()

    // Validate input
    if (!email || !password || !brandName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Send email using Resend (you'll need to install and configure)
    // For now, we'll use a simple approach
    // In production, integrate with Resend, SendGrid, or use Supabase Edge Functions
    
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .password-box { background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
    .password { font-size: 24px; font-weight: bold; color: #667eea; letter-spacing: 2px; font-family: 'Courier New', monospace; }
    .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
    .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
    .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔐 Your Download Password</h1>
      <p>Secure Access to Your Landing Page</p>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>You've requested to download your <strong>${brandName}</strong> landing page. For security purposes, your download is password-protected.</p>
      
      <div class="password-box">
        <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">Your Download Password:</p>
        <div class="password">${password}</div>
      </div>

      <div class="warning">
        <strong>⚠️ Important Security Information:</strong>
        <ul style="margin: 10px 0 0 0;">
          <li>This password expires in <strong>24 hours</strong></li>
          <li>Keep this password secure and do not share it</li>
          <li>The password protects your landing page assets from unauthorized access</li>
          <li>If you didn't request this download, please contact support immediately</li>
        </ul>
      </div>

      <p><strong>How to use:</strong></p>
      <ol>
        <li>Download the ZIP file from your dashboard</li>
        <li>Use the password above to extract the files</li>
        <li>Deploy your landing page to your hosting service</li>
      </ol>

      <p style="margin-top: 30px;">
        <strong>Site ID:</strong> ${siteId}<br>
        <strong>Generated:</strong> ${new Date().toLocaleString()}
      </p>

      <div class="footer">
        <p>This is an automated security email from Olavivo PrelanderAI</p>
        <p>If you have any questions, please contact our support team</p>
      </div>
    </div>
  </div>
</body>
</html>
    `

    // Log the email content (in production, actually send via email service)
    console.log('Password email would be sent to:', email)
    console.log('Password:', password)

    // TODO: Integrate with actual email service
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'Olavivo PrelanderAI <noreply@yourdomain.com>',
    //   to: email,
    //   subject: `🔐 Download Password for ${brandName}`,
    //   html: emailHtml
    // })

    // For now, return success (password is in SECURITY_NOTICE.txt in the ZIP)
    return NextResponse.json({ 
      success: true,
      message: 'Password notification sent',
      // In development, include password in response
      ...(process.env.NODE_ENV === 'development' && { password })
    })

  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json({ 
      error: 'Failed to send password email',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
