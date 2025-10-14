# 🚀 Olavivo PrelanderAI - Deployment Guide

## Quick Deploy to Vercel

### 1. Environment Variables
Add these to your Vercel project settings (get actual values from your accounts):

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI Configuration  
OPENAI_API_KEY=your_openai_api_key

# App Configuration (update after deployment)
NEXT_PUBLIC_APP_URL=https://your-vercel-app.vercel.app
```

### Where to get your keys:
- **Supabase**: Go to your project settings → API tab
- **OpenAI**: Visit platform.openai.com → API Keys section

### 2. Database Setup
1. Go to your Supabase project: https://supabase.com/dashboard/project/cpqbubaplujjebzynjoi
2. Navigate to **SQL Editor**
3. Copy the entire contents of `/supabase/schema.sql` from this repository
4. Paste and execute the SQL to create all tables, policies, and storage buckets

### 3. Deploy Steps
1. Import this repository to Vercel: `manupor/Olavivo_AI_Prelander`
2. Add all environment variables above
3. Deploy the project
4. Update `NEXT_PUBLIC_APP_URL` with your actual Vercel domain

## Features Included
- ✅ Olavivo branding with authentic mobile logo
- ✅ Professional color palette (orange, blue, green)
- ✅ AI-powered landing page generation
- ✅ 7 professional templates
- ✅ User authentication and dashboard
- ✅ Logo upload and brand color extraction
- ✅ Site editor and export functionality

## Support
- Supabase Project: https://supabase.com/dashboard/project/cpqbubaplujjebzynjoi
- GitHub Repository: https://github.com/manupor/Olavivo_AI_Prelander

---
**Built with ❤️ for Olavivo - Powered by AI**
