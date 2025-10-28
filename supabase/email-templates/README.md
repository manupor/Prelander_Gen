# 📧 Email Templates - Supabase Setup Guide

Professional, branded email templates for Prelander Gen authentication flow.

## 📁 Templates Included

### 1. **confirm-signup.html**
- Sent when a user creates a new account
- Includes confirmation link with 24-hour expiry
- Modern gradient design matching site branding

### 2. **welcome-confirmed.html**  
- Sent after user confirms their email
- Welcome message with quick start guide
- Features highlight and dashboard CTA

---

## 🚀 How to Configure in Supabase

### Step 1: Access Email Templates

1. Go to your **Supabase Dashboard**
2. Navigate to **Authentication** → **Email Templates**
3. You'll see these template options:
   - Confirm signup
   - Invite user
   - Magic Link
   - Change Email Address
   - Reset Password

### Step 2: Configure "Confirm Signup" Email

1. Click on **"Confirm signup"**
2. Copy the entire content from `confirm-signup.html`
3. Paste it into the **"Message (HTML)"** field
4. Set the **Subject** to: `✓ Confirm Your Email - Prelander Gen`
5. Click **"Save"**

### Step 3: Enable Welcome Email (Post-Confirmation)

Supabase doesn't have a built-in "welcome email" template, so we need to set this up with a **Database Trigger**.

#### Create Database Function:

```sql
-- Function to send welcome email after email confirmation
CREATE OR REPLACE FUNCTION public.send_welcome_email()
RETURNS trigger AS $$
BEGIN
  -- Only send if email was just confirmed
  IF NEW.email_confirmed_at IS NOT NULL AND OLD.email_confirmed_at IS NULL THEN
    PERFORM net.http_post(
      url := 'https://api.resend.com/emails',
      headers := jsonb_build_object(
        'Authorization', 'Bearer YOUR_RESEND_API_KEY',
        'Content-Type', 'application/json'
      ),
      body := jsonb_build_object(
        'from', 'Prelander Gen <noreply@prelander-gen.com>',
        'to', ARRAY[NEW.email],
        'subject', '🎉 Welcome to Prelander Gen!',
        'html', '<!-- Content from welcome-confirmed.html -->'
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### Create Trigger:

```sql
-- Trigger to call welcome email function
CREATE TRIGGER on_email_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.send_welcome_email();
```

---

## 🎨 Template Features

### Design Elements:
- ✅ **Purple/Blue Gradient** - Matches site branding (#667eea to #764ba2)
- ✅ **Responsive Design** - Mobile-friendly tables
- ✅ **Modern Typography** - Clean, professional fonts
- ✅ **Call-to-Action Buttons** - High-contrast, gradient CTAs
- ✅ **Security Notices** - Professional info boxes
- ✅ **Social Links** - Footer with social media

### Branding Consistency:
- Same color scheme as main site
- Professional gradient backgrounds
- Modern card-based layout
- Clean, spacious padding
- Smooth rounded corners

---

## 🔧 Customization

### Update Brand Name:
Replace `Prelander Gen` with your brand name in both templates.

### Update Colors:
Find and replace these gradient values:
- **Primary:** `#667eea` (purple-blue)
- **Secondary:** `#764ba2` (deep purple)
- **Success:** `#48bb78` (green - welcome email)

### Update Links:
- Replace `{{ .SiteURL }}` with your actual domain
- Update `support@prelander-gen.com` with your support email
- Add real social media links in footer

### Update Logo (Optional):
Add your logo to the header section:
```html
<img src="https://your-domain.com/logo.png" alt="Logo" style="height: 40px;">
```

---

## 📝 Variables Available

Supabase provides these template variables:

| Variable | Description |
|----------|-------------|
| `{{ .ConfirmationURL }}` | Email confirmation link |
| `{{ .Token }}` | Confirmation token |
| `{{ .TokenHash }}` | Hashed token |
| `{{ .SiteURL }}` | Your site's URL |
| `{{ .Email }}` | User's email address |

---

## ✅ Testing

### Test Confirmation Email:
1. Sign up with a new email address
2. Check your inbox for the confirmation email
3. Verify design renders correctly in:
   - Gmail
   - Outlook
   - Apple Mail
   - Mobile devices

### Test Welcome Email (if configured):
1. Click the confirmation link
2. Check inbox for welcome email
3. Verify all links work correctly

---

## 🚨 Troubleshooting

### Email not sending?
- Check SMTP settings in Supabase → Settings → Auth
- Verify email rate limits haven't been exceeded
- Check Supabase logs for errors

### Styling broken?
- Email clients strip `<style>` tags - use inline styles only
- Test in [Litmus](https://litmus.com/) or [Email on Acid](https://www.emailonacid.com/)
- Some clients don't support gradients - have fallback colors

### Variables not working?
- Double-check variable syntax: `{{ .VariableName }}`
- Ensure you're using Supabase Go template format
- Test with a real signup to see actual values

---

## 📊 Metrics to Track

Monitor these email metrics in your email service:
- **Open Rate** - Aim for >40%
- **Click Rate** - Track CTA button clicks
- **Confirmation Rate** - % of users who confirm
- **Time to Confirm** - How long users take to click

---

## 🔐 Security Best Practices

1. ✅ Always use HTTPS links
2. ✅ Set link expiry (24 hours default)
3. ✅ Include security notices
4. ✅ Don't include sensitive information
5. ✅ Use branded, trusted sender address

---

## 📞 Support

Need help setting this up?
- Email: support@prelander-gen.com
- Supabase Docs: https://supabase.com/docs/guides/auth/auth-email-templates

---

**Last Updated:** 2025-10-27
**Version:** 1.0
