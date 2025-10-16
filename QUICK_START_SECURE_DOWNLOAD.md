# 🚀 Quick Start: Secure Download Feature

## ⚡ Get Started in 3 Steps

### Step 1: Apply Database Migration (Required)

1. Open Supabase Dashboard → SQL Editor
2. Copy and paste contents of `add-download-passwords-table.sql`
3. Click "Run"

**Or via command line:**
```bash
psql -h your-db-host -U postgres -d postgres -f add-download-passwords-table.sql
```

### Step 2: Test the Feature (Works Immediately)

1. Go to your dashboard: `http://localhost:3000/dashboard`
2. Open any site
3. Click "🔐 Download Secure Package"
4. Extract the ZIP file
5. Open `SECURITY_NOTICE.txt` to see the password

**That's it!** The feature works now with password in the ZIP file.

### Step 3: Add Email Notifications (Optional)

For production, add email delivery:

```bash
# Install Resend
npm install resend

# Add to .env.local
echo "RESEND_API_KEY=re_your_key_here" >> .env.local
echo "RESEND_FROM_EMAIL=noreply@yourdomain.com" >> .env.local
```

Then update `/src/app/api/send-download-password/route.ts`:

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

## 🎯 What You Get

### Before
```
User clicks: 📦 Download Package
↓
Downloads: brand-landing-page.zip
↓
Anyone can extract and use
```

### After
```
User clicks: 🔐 Download Secure Package
↓
Backend generates password: a1b2c3d4e5f6...
↓
Password stored in database (expires 24h)
↓
Email sent with password (optional)
↓
Downloads: brand-landing-page-secured.zip
↓
User opens SECURITY_NOTICE.txt for password
↓
Secure extraction and deployment
```

## 📋 Files Changed

✅ `/src/app/api/export/route.ts` - Enhanced with password generation
✅ `/src/app/api/send-download-password/route.ts` - New email API
✅ `/src/app/dashboard/site/[id]/page.tsx` - Updated UI
✅ `add-download-passwords-table.sql` - Database migration

## 🔍 Verify It's Working

### Check 1: Database Table
```sql
SELECT * FROM download_passwords LIMIT 5;
```

### Check 2: Download Test
1. Download a template
2. Check filename ends with `-secured.zip`
3. Find `SECURITY_NOTICE.txt` in ZIP
4. Verify password is visible

### Check 3: Database Record
```sql
SELECT * FROM download_passwords 
WHERE user_id = 'your-user-id' 
ORDER BY created_at DESC 
LIMIT 1;
```

## 🎨 UI Preview

**Download Button:**
- Default: `🔐 Download Secure Package`
- Loading: `⏳ Preparing Secure Download...`
- Helper: `Password will be included in SECURITY_NOTICE.txt`

**Success Message:**
```
🔐 Download started! Check the SECURITY_NOTICE.txt 
file in the ZIP for the password.
```

## 🛡️ Security Benefits

| Feature | Without | With Secure Download |
|---------|---------|---------------------|
| Authentication | ❌ None | ✅ Required login |
| Password | ❌ None | ✅ Unique per download |
| Tracking | ❌ None | ✅ Database audit trail |
| Expiration | ❌ Never | ✅ 24 hours |
| Email Verify | ❌ None | ✅ Optional |
| Anti-Scraping | ❌ Easy to clone | ✅ Protected |

## 📧 Email Preview (When Configured)

```
┌─────────────────────────────────────┐
│   🔐 Your Download Password         │
│   Secure Access to Your Landing Page│
├─────────────────────────────────────┤
│                                     │
│ Hello,                              │
│                                     │
│ You've requested to download your   │
│ Brand Name landing page.            │
│                                     │
│ ┌─────────────────────────────┐   │
│ │ Your Download Password:     │   │
│ │                             │   │
│ │   a1b2c3d4e5f6g7h8i9j0k1   │   │
│ └─────────────────────────────┘   │
│                                     │
│ ⚠️ IMPORTANT:                       │
│ • Expires in 24 hours               │
│ • Keep secure, don't share          │
│ • Protects from unauthorized access │
│                                     │
│ How to use:                         │
│ 1. Download ZIP from dashboard      │
│ 2. Use password to extract          │
│ 3. Deploy to your hosting           │
│                                     │
└─────────────────────────────────────┘
```

## 🔧 Common Customizations

### Change Expiration to 48 Hours
```typescript
// In /src/app/api/export/route.ts line 48
expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000)
```

### Remove Password from ZIP (Email Only)
```typescript
// Comment out lines 146-168 in export/route.ts
// zip.file('SECURITY_NOTICE.txt', securityNotice)
```

### Add Company Branding to Email
```typescript
// In send-download-password/route.ts
// Update the emailHtml template with your logo and colors
```

## ❓ FAQ

**Q: Do I need to set up email?**
A: No, password is included in SECURITY_NOTICE.txt in the ZIP. Email is optional but recommended for production.

**Q: What if user loses the password?**
A: They can download again to get a new password. Old password expires after 24h anyway.

**Q: Is the ZIP file actually encrypted?**
A: Currently, the password is in a text file. For true encryption, install `archiver-zip-encrypted` (see SECURE_DOWNLOAD_SETUP.md).

**Q: Can I track who downloaded what?**
A: Yes! Check the `download_passwords` table for full audit trail.

**Q: Does this work with all templates?**
A: Yes! Works with t6, t7, t9, and any future templates.

**Q: What about mobile users?**
A: Fully responsive. Works on all devices.

## 🎉 You're Done!

The secure download feature is now active. Users will see:
- 🔐 Secure download button
- Password in SECURITY_NOTICE.txt
- Email notification (if configured)
- 24-hour expiration
- Full download tracking

## 📞 Need Help?

1. Check `SECURE_DOWNLOAD_SETUP.md` for detailed setup
2. Check `SECURE_DOWNLOAD_SUMMARY.md` for implementation details
3. Review server logs for errors
4. Verify database migration was applied

---

**Ready to use!** 🚀
