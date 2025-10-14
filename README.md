# Prelander AI

A production-ready MVP SaaS that generates beautiful, conversion-optimized landing pages using AI. Upload your logo, describe your business, and get a fully customized landing page in minutes.

## Features

- 🤖 **AI-Powered Copy Generation** - OpenAI creates compelling headlines, subheadlines, and CTAs
- 🎨 **Automatic Brand Color Extraction** - Extract colors from your logo using node-vibrant
- 📱 **3 Professional Templates** - Minimal SaaS, Bold Marketing, and Lead Generation designs
- 🔐 **Complete Authentication** - Supabase Auth with email/password signup
- 📊 **Analytics Dashboard** - Track visits and manage your sites
- 📦 **Export Functionality** - Download complete HTML/CSS packages for external hosting
- 🚀 **One-Click Publishing** - Publish sites with unique URLs
- 💾 **Full Database Integration** - PostgreSQL with Row Level Security

## Tech Stack

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **AI**: OpenAI GPT-3.5-turbo for copy generation
- **Color Extraction**: node-vibrant
- **Forms**: React Hook Form + Zod validation
- **File Upload**: Supabase Storage with drag & drop
- **Deployment**: Vercel-ready

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo>
cd prelander-ai
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your keys
3. Run the SQL schema in `supabase/schema.sql` in the SQL Editor
4. Enable Storage and create a `logos` bucket (make it public)

### 3. Set Up OpenAI

1. Get your API key from [platform.openai.com](https://platform.openai.com)
2. Add billing information (required for API access)

### 4. Environment Variables

Copy `env.example` to `.env.local` and fill in your keys:

```bash
cp env.example .env.local
```

Required variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Database Schema

The app uses these main tables:

- **organizations** - User organizations
- **sites** - Generated landing pages with all brand data
- **visits** - Analytics data for each site view

All tables have Row Level Security (RLS) policies for data protection.

## Usage Flow

1. **Sign Up** - Create account at `/signup`
2. **Choose Template** - Select from 3 professional designs
3. **Upload Logo** - Drag & drop or paste URL (PNG/SVG/JPEG, 2MB max)
4. **Brand Details** - Enter brand name, industry, and description
5. **Generate** - AI creates personalized copy and applies brand colors
6. **Preview** - View your site at `/sites/{slug}`
7. **Publish** - Make it live with one click
8. **Export** - Download ZIP with HTML/CSS files

## Templates

### Template 1 (t1) - Minimal SaaS
Clean, professional design perfect for SaaS and tech companies. Features hero section, feature grid, testimonials, and clear CTAs.

### Template 2 (t2) - Bold Marketing  
Eye-catching design with strong visual impact. Includes gradient backgrounds, pricing cards, and FAQ sections.

### Template 3 (t3) - Lead Generation
Conversion-focused with prominent forms, benefit bullets, social proof, and sticky CTA bars.

## API Routes

- `POST /api/upload-logo` - Upload logo to Supabase Storage
- `POST /api/generate` - Generate new site with AI
- `POST /api/publish` - Publish site (set status to published)
- `GET /api/export?siteId=...` - Download site as ZIP package
- `GET /api/sites/[id]` - Get site details

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The app is optimized for Vercel with:
- Edge runtime support
- Automatic static optimization
- Built-in analytics ready

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## Export Feature

Users can download a complete package containing:
- `index.html` - Complete landing page with inlined CSS
- `styles.css` - Separate CSS file for customization
- `assets/logo.*` - Brand logo file
- `README.md` - Deployment instructions

The exported sites work on any static hosting platform:
- Netlify (drag & drop)
- Vercel
- GitHub Pages
- Traditional web hosting

## Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run seed         # Seed database with sample data
```

## Customization

### Adding New Templates

1. Create new template in `src/templates/t4/index.tsx`
2. Export both React component and `renderTemplate` function
3. Add to template registry in `src/templates/index.ts`
4. Update types in `src/lib/types.ts`

### Modifying AI Prompts

Edit the prompts in `src/lib/openai.ts` to customize the AI-generated copy style and format.

### Brand Color Logic

The color extraction logic in `src/lib/colors.ts` can be customized to change how colors are selected from logos.

## Security Features

- Row Level Security (RLS) on all database tables
- Server-side API key management
- File upload validation and size limits
- User authentication required for all operations
- CORS protection

## Analytics

Basic analytics are implemented with:
- Visit tracking on published sites
- Dashboard showing visit counts
- Placeholder for advanced analytics integration

## Troubleshooting

### Common Issues

1. **Supabase Connection Error**
   - Check your environment variables
   - Ensure RLS policies are set up correctly

2. **OpenAI API Error**
   - Verify API key is correct
   - Check billing is set up on OpenAI account

3. **File Upload Issues**
   - Ensure Supabase Storage bucket is public
   - Check file size (2MB limit)

4. **Build Errors**
   - Run `npm run lint` to check for TypeScript errors
   - Ensure all environment variables are set

### Getting Help

- Check the browser console for client-side errors
- Check Vercel logs for server-side errors
- Verify Supabase logs in the dashboard

## License

MIT License - feel free to use this project as a starting point for your own SaaS applications.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

Built with ❤️ using Next.js, Supabase, and OpenAI.

## Latest Updates (v1.1)
- ✅ Migrated to @supabase/ssr (latest Supabase auth package)
- ✅ Fixed all ESLint errors for clean deployment  
- ✅ Optimized build configuration
- ✅ Ready for production deployment
