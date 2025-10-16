# Deployment Guide - Olavivo Prelander AI

## Required Environment Variables

The following environment variables must be configured in your deployment platform:

### Required Variables
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Optional Variables
```
OPENAI_API_KEY=your_openai_api_key
```

## Setup Instructions

### 1. Supabase Configuration
1. Create a new project at [Supabase](https://supabase.com)
2. Go to Settings > API in your Supabase dashboard
3. Copy your Project URL and anon/public key
4. Set these as environment variables in your deployment platform

### 2. OpenAI Configuration (Optional)
1. Get an API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Set `OPENAI_API_KEY` in your deployment environment
3. If not provided, the app will use fallback marketing copy

### 3. Database Setup
The application will automatically create the required database tables on first run.

## Deployment Platforms

### Vercel
1. Connect your GitHub repository
2. Add environment variables in Project Settings > Environment Variables
3. Deploy

### Netlify
1. Connect your GitHub repository
2. Add environment variables in Site Settings > Environment Variables
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Deploy

### Other Platforms
Ensure your platform supports:
- Node.js 18+
- Next.js 13+ with App Router
- Environment variable configuration

## Features

### Templates Available
- **Template 7 (Bonanza)**: Premium slot machine template with guaranteed jackpot win on 2nd spin

### Authentication
- User signup/login via Supabase Auth
- Session management with middleware
- Protected dashboard routes

### Site Generation
- AI-powered marketing copy generation (with OpenAI)
- Fallback copy when OpenAI is unavailable
- Brand customization (logo, colors, copy)
- Static site export functionality

## Troubleshooting

### Common Issues
1. **NetworkError on signup/login**: Environment variables not configured
2. **Build failures**: Missing required dependencies
3. **Authentication not working**: Check Supabase URL and keys

### Demo Mode
The application gracefully handles missing environment variables and displays helpful configuration notices to users.
