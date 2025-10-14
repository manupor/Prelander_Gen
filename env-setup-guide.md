# Environment Variables Setup Guide

## 🚨 **Network Error Fix**

If you're seeing "NetworkError when attempting to fetch resource" on the login page, it means the Supabase environment variables are not properly configured in your deployment.

## 📋 **Required Environment Variables**

### **For Vercel Deployment:**

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
OPENAI_API_KEY=sk-proj-...
NEXT_PUBLIC_APP_URL=https://your-vercel-domain.vercel.app
```

### **Where to Find These Values:**

#### **Supabase Values:**
1. Go to [supabase.com](https://supabase.com)
2. Open your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

#### **OpenAI API Key:**
1. Go to [platform.openai.com](https://platform.openai.com)
2. Navigate to **API Keys**
3. Create a new key → `OPENAI_API_KEY`

## 🔧 **Setup Steps:**

### **1. Set Up Supabase Database**
Run this SQL in your Supabase SQL Editor:

```sql
-- Copy the contents of supabase/fresh-schema.sql
-- This creates all necessary tables and security policies
```

### **2. Configure Supabase Storage**
1. Go to **Storage** in Supabase dashboard
2. Create a new bucket called `logos`
3. Make it **public**
4. Set appropriate policies for file uploads

### **3. Deploy with Environment Variables**
1. Set all environment variables in Vercel
2. Redeploy your application
3. The diagnostic info on the login page will show if everything is configured correctly

## ✅ **Verification**

After setting up the environment variables:
1. The diagnostic panel on the login page should show "✅ Configured" for all items
2. Login should work without network errors
3. You can create accounts and generate landing pages

## 🆘 **Still Having Issues?**

1. **Check the browser console** for detailed error messages
2. **Verify environment variables** are set correctly in Vercel
3. **Ensure Supabase project is active** and not paused
4. **Check Supabase logs** for any database connection issues

---

**Note:** The diagnostic components will be removed in production once everything is working properly.
