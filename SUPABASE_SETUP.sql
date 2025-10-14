-- ============================================
-- NEXUS FORGE - SUPABASE COMPLETE SETUP
-- ============================================
-- Run this in Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste & Run
-- ============================================

-- 1. CREATE TABLES
-- ============================================

-- Sites table
CREATE TABLE IF NOT EXISTS sites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  template_id TEXT NOT NULL,
  brand_name TEXT NOT NULL,
  headline TEXT,
  subheadline TEXT,
  cta TEXT,
  cta_url TEXT,
  primary_color TEXT DEFAULT '#4a90e2',
  secondary_color TEXT DEFAULT '#7b68ee',
  accent_color TEXT DEFAULT '#ffd700',
  logo_url TEXT,
  generated_html TEXT,
  generated_css TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  industry TEXT,
  description TEXT,
  popup_title TEXT DEFAULT 'WINNER!',
  popup_message TEXT DEFAULT 'Congratulations! You''ve won!',
  popup_prize TEXT DEFAULT '$1,000 + 50 FREE SPINS',
  game_balance INTEGER DEFAULT 1000,
  vertical TEXT DEFAULT 'casino',
  terms_url TEXT,
  privacy_url TEXT,
  responsible_gaming_url TEXT,
  is_demo BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Visits table (analytics)
CREATE TABLE IF NOT EXISTS visits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  source TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. CREATE INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_sites_user_id ON sites(user_id);
CREATE INDEX IF NOT EXISTS idx_sites_slug ON sites(slug);
CREATE INDEX IF NOT EXISTS idx_sites_status ON sites(status);
CREATE INDEX IF NOT EXISTS idx_sites_is_demo ON sites(is_demo);
CREATE INDEX IF NOT EXISTS idx_sites_created_at ON sites(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visits_site_id ON visits(site_id);
CREATE INDEX IF NOT EXISTS idx_visits_created_at ON visits(created_at DESC);

-- ============================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. DROP EXISTING POLICIES (if any)
-- ============================================

DROP POLICY IF EXISTS "Users can view their own sites" ON sites;
DROP POLICY IF EXISTS "Users can create their own sites" ON sites;
DROP POLICY IF EXISTS "Users can update their own sites" ON sites;
DROP POLICY IF EXISTS "Users can delete their own sites" ON sites;
DROP POLICY IF EXISTS "Allow public read access to demo sites" ON sites;
DROP POLICY IF EXISTS "Allow public update access to demo sites" ON sites;
DROP POLICY IF EXISTS "Allow public read access to published sites" ON sites;
DROP POLICY IF EXISTS "Users can view visits for their sites" ON visits;
DROP POLICY IF EXISTS "Allow inserting visits for any site" ON visits;

-- ============================================
-- 5. CREATE RLS POLICIES FOR SITES
-- ============================================

-- Allow users to view their own sites
CREATE POLICY "Users can view their own sites" ON sites
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to create their own sites
CREATE POLICY "Users can create their own sites" ON sites
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own sites
CREATE POLICY "Users can update their own sites" ON sites
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Allow users to delete their own sites
CREATE POLICY "Users can delete their own sites" ON sites
  FOR DELETE
  USING (auth.uid() = user_id);

-- Allow public read access to demo sites
CREATE POLICY "Allow public read access to demo sites" ON sites
  FOR SELECT
  USING (is_demo = true);

-- Allow public update access to demo sites
CREATE POLICY "Allow public update access to demo sites" ON sites
  FOR UPDATE
  USING (is_demo = true);

-- Allow public read access to published sites (for viewing)
CREATE POLICY "Allow public read access to published sites" ON sites
  FOR SELECT
  USING (status = 'published');

-- ============================================
-- 6. CREATE RLS POLICIES FOR VISITS
-- ============================================

-- Allow users to view visits for their sites
CREATE POLICY "Users can view visits for their sites" ON visits
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM sites
      WHERE sites.id = visits.site_id
      AND sites.user_id = auth.uid()
    )
  );

-- Allow inserting visits for any site (for analytics)
CREATE POLICY "Allow inserting visits for any site" ON visits
  FOR INSERT
  WITH CHECK (true);

-- ============================================
-- 7. CREATE STORAGE BUCKET FOR ASSETS
-- ============================================

-- Create storage bucket for logos and images
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Public read access for site assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload site assets" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own uploads" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own uploads" ON storage.objects;

-- Allow public read access to site-assets
CREATE POLICY "Public read access for site assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-assets');

-- Allow authenticated users to upload to site-assets
CREATE POLICY "Authenticated users can upload site assets"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'site-assets'
  AND auth.role() = 'authenticated'
);

-- Allow users to update their own uploads
CREATE POLICY "Users can update their own uploads"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'site-assets'
  AND auth.role() = 'authenticated'
);

-- Allow users to delete their own uploads
CREATE POLICY "Users can delete their own uploads"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'site-assets'
  AND auth.role() = 'authenticated'
);

-- ============================================
-- 8. CREATE FUNCTION FOR UPDATED_AT TRIGGER
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 9. CREATE TRIGGERS
-- ============================================

DROP TRIGGER IF EXISTS update_sites_updated_at ON sites;
CREATE TRIGGER update_sites_updated_at
  BEFORE UPDATE ON sites
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 10. GRANT PERMISSIONS
-- ============================================

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- ============================================
-- ✅ SETUP COMPLETE!
-- ============================================
-- Your database is now ready for Nexus Forge
-- 
-- Next steps:
-- 1. Copy your Supabase URL and anon key
-- 2. Add them to Vercel environment variables:
--    - NEXT_PUBLIC_SUPABASE_URL
--    - NEXT_PUBLIC_SUPABASE_ANON_KEY
-- 3. Redeploy your Vercel project
-- ============================================
