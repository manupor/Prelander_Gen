import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    const { record, old_record } = await req.json()
    
    console.log('Webhook received:', { 
      email: record.email, 
      confirmed: record.email_confirmed_at,
      old_confirmed: old_record?.email_confirmed_at 
    })
    
    // Solo enviar si el email fue RECIÉN confirmado (cambió de null a fecha)
    if (!record.email_confirmed_at || old_record?.email_confirmed_at) {
      console.log('Skipping: Email not newly confirmed')
      return new Response(JSON.stringify({ message: 'Email not newly confirmed' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    console.log('Sending welcome email to:', record.email)

    // HTML del email de bienvenida
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Prelander Gen!</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
                    <tr>
                        <td style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); padding: 50px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 36px; font-weight: 700;">
                                You're All Set! ✓
                            </h1>
                            <p style="margin: 15px 0 0 0; color: rgba(255,255,255,0.95); font-size: 18px;">
                                Welcome to Prelander Gen 🎉
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 50px 40px;">
                            <h2 style="margin: 0 0 20px 0; color: #1a202c; font-size: 28px; font-weight: 700;">
                                Thanks for Confirming Your Email!
                            </h2>
                            <p style="margin: 0 0 25px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                                Your account is now <strong style="color: #48bb78;">fully activated</strong> and ready to go! You can now access all features and start creating amazing landing pages with AI.
                            </p>
                            <div style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 12px; padding: 30px; margin: 30px 0;">
                                <h3 style="margin: 0 0 20px 0; color: #2d3748; font-size: 20px; font-weight: 600;">
                                    🚀 Quick Start Guide
                                </h3>
                                <p style="color: #2d3748; font-size: 15px; margin: 10px 0;">1️⃣ Create your first landing page</p>
                                <p style="color: #2d3748; font-size: 15px; margin: 10px 0;">2️⃣ Customize with AI assistance</p>
                                <p style="color: #2d3748; font-size: 15px; margin: 10px 0;">3️⃣ Download or deploy instantly</p>
                            </div>
                            <table role="presentation" style="margin: 35px 0;">
                                <tr>
                                    <td style="border-radius: 8px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); text-align: center; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);">
                                        <a href="https://nfinuiiqqjzejmczfiek.supabase.co/dashboard" style="display: inline-block; padding: 18px 50px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 17px;">
                                            🎨 GO TO DASHBOARD
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="background: #f7fafc; padding: 30px 40px; border-top: 1px solid #e2e8f0; text-align: center;">
                            <p style="margin: 0; color: #a0aec0; font-size: 12px;">
                                © 2025 Prelander Gen. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`

    // Enviar email con Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Prelander Gen <noreply@prelander-gen.com>',
        to: [record.email],
        subject: '🎉 Welcome to Prelander Gen!',
        html: htmlContent
      })
    })

    if (!res.ok) {
      const error = await res.text()
      console.error('Resend API error:', error)
      throw new Error(`Resend API failed: ${error}`)
    }

    const data = await res.json()
    console.log('Email sent successfully:', data)
    
    return new Response(JSON.stringify({ success: true, data }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error in send-welcome-email function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})
