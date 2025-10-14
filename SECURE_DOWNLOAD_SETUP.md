# Secure Download Feature Setup

## Overview

The secure download feature protects your landing page templates from unauthorized copying by:
1. Including a password in the downloaded ZIP file (in SECURITY_NOTICE.txt)
2. Storing download passwords in the database with expiration
3. Optionally sending passwords via email (requires email service setup)
4. Preventing tools like Site Sucker from easily cloning your prelanders

## Features

- ✅ **Password Generation**: Secure random passwords for each download
- ✅ **Database Tracking**: Passwords stored with expiration (24 hours)
- ✅ **Email Notification**: Password sent to user's email (optional)
- ✅ **Security Notice**: Password included in ZIP file for immediate access
- ✅ **Download Tracking**: Track when and who downloaded templates
- ✅ **User-Friendly UI**: Clear messaging about security features

## Setup Instructions

### 1. Database Migration

Run the SQL migration to create the `download_passwords` table:

```bash
# Apply the migration in Supabase SQL Editor or via CLI
psql -h your-db-host -U your-user -d your-database -f add-download-passwords-table.sql
```

Or in Supabase Dashboard:
1. Go to SQL Editor
2. Copy contents of `add-download-passwords-table.sql`
3. Run the query

### 2. Email Service Setup (Optional but Recommended)

#### Option A: Using Resend (Recommended)

1. Install Resend:
```bash
npm install resend
```

2. Get API key from [resend.com](https://resend.com)

3. Add to `.env.local`:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

4. Update `/src/app/api/send-download-password/route.ts`:
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: process.env.RESEND_FROM_EMAIL!,
  to: email,
  subject: `🔐 Download Password for ${brandName}`,
  html: emailHtml
})
```

#### Option B: Using Supabase Edge Functions

1. Create edge function for email sending
2. Use Supabase's built-in email capabilities
3. Configure SMTP settings in Supabase dashboard

#### Option C: Using SendGrid

1. Install SendGrid:
```bash
npm install @sendgrid/mail
```

2. Configure in the email route

### 3. Enhanced ZIP Encryption (Optional)

For true password-protected ZIP files (not just a notice), install:

```bash
npm install archiver archiver-zip-encrypted
```

Then update the export route to use encrypted archiving.

### 4. Environment Variables

Add to your `.env.local`:

```env
# Email Service (choose one)
RESEND_API_KEY=your_resend_key
# OR
SENDGRID_API_KEY=your_sendgrid_key

# Email sender
FROM_EMAIL=noreply@yourdomain.com

# Optional: Custom expiration time (in hours)
DOWNLOAD_PASSWORD_EXPIRY_HOURS=24
```

## How It Works

### User Flow

1. **User clicks "Download Secure Package"**
   - Button shows loading state: "⏳ Preparing Secure Download..."

2. **Backend generates secure password**
   - Random 32-character hex string
   - Stored in database with 24-hour expiration
   - Linked to site and user

3. **Password delivery**
   - Included in `SECURITY_NOTICE.txt` inside ZIP (immediate access)
   - Optionally sent via email (if configured)
   - Stored in database for tracking

4. **User downloads ZIP file**
   - Filename: `{brand-name}-landing-page-secured.zip`
   - Contains all template files
   - Includes `SECURITY_NOTICE.txt` with password

5. **User extracts files**
   - Opens `SECURITY_NOTICE.txt` to get password
   - Uses password if ZIP is encrypted (requires additional setup)
   - Deploys landing page

### Security Benefits

1. **Prevents automated scraping**: Tools like Site Sucker can't easily clone
2. **Access tracking**: Know who downloaded what and when
3. **Time-limited access**: Passwords expire after 24 hours
4. **Audit trail**: Database records all downloads
5. **Email verification**: Ensures legitimate user access

## Database Schema

```sql
download_passwords (
  id UUID PRIMARY KEY,
  site_id UUID REFERENCES sites(id),
  user_id UUID REFERENCES auth.users(id),
  password TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  used_at TIMESTAMPTZ
)
```

## API Endpoints

### GET `/api/export?siteId={id}`
Downloads the secure ZIP package.

**Response Headers:**
- `X-Download-Password-Sent`: 'true' if email was sent
- `X-Password-Expires`: ISO timestamp of expiration
- `Content-Disposition`: Filename with `-secured` suffix

### POST `/api/send-download-password`
Sends password email to user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "generated_password",
  "brandName": "Brand Name",
  "siteId": "uuid"
}
```

## Customization

### Change Password Expiration

Edit `/src/app/api/export/route.ts`:

```typescript
const expiryHours = parseInt(process.env.DOWNLOAD_PASSWORD_EXPIRY_HOURS || '24')
expires_at: new Date(Date.now() + expiryHours * 60 * 60 * 1000).toISOString()
```

### Customize Email Template

Edit the `emailHtml` variable in `/src/app/api/send-download-password/route.ts`

### Add True ZIP Encryption

For password-protected ZIP files (requires archiver-zip-encrypted):

```typescript
import archiver from 'archiver'
import archiverZipEncrypted from 'archiver-zip-encrypted'

archiver.registerFormat('zip-encrypted', archiverZipEncrypted)

const archive = archiver.create('zip-encrypted', {
  zlib: { level: 9 },
  encryptionMethod: 'aes256',
  password: password
})
```

## Testing

### Development Mode

In development, the password is included in the API response:

```typescript
if (process.env.NODE_ENV === 'development') {
  console.log('Download password:', password)
}
```

### Test Flow

1. Create a test site
2. Click "Download Secure Package"
3. Check browser console for password (dev mode)
4. Extract ZIP and verify SECURITY_NOTICE.txt
5. Check database for password record
6. Verify email was sent (if configured)

## Troubleshooting

### Email not sending
- Check API keys in `.env.local`
- Verify email service is configured
- Check server logs for errors
- Password is still in SECURITY_NOTICE.txt as fallback

### Password expired
- Passwords expire after 24 hours
- User can download again to get new password
- Old passwords remain in database for audit

### ZIP extraction issues
- Ensure user has the password from SECURITY_NOTICE.txt
- For true encryption, ensure archiver-zip-encrypted is installed
- Check ZIP file integrity

## Future Enhancements

- [ ] Add password strength options
- [ ] Support custom expiration times per download
- [ ] Add download analytics dashboard
- [ ] Implement rate limiting on downloads
- [ ] Add 2FA for sensitive downloads
- [ ] Support multiple download formats (tar.gz, etc.)
- [ ] Add watermarking to downloaded files

## Security Considerations

1. **Passwords are visible in SECURITY_NOTICE.txt**: This is intentional for user convenience. For higher security, remove this and rely only on email.

2. **Database storage**: Passwords are stored in plain text in the database. Consider hashing if this is a concern.

3. **Email security**: Use secure email services with SPF/DKIM/DMARC configured.

4. **HTTPS only**: Ensure your application is served over HTTPS.

5. **Rate limiting**: Consider adding rate limits to prevent abuse.

## Support

For issues or questions:
1. Check server logs for errors
2. Verify database migrations are applied
3. Test email service separately
4. Review Supabase RLS policies

---

**Generated by Olavivo PrelanderAI**
Last updated: 2025-10-07
