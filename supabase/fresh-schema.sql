-- =====================================================
-- OLAVIVO AI PRELANDER - COMPLETE DATABASE SCHEMA
-- =====================================================
-- This schema includes all tables, indexes, triggers, and RLS policies
-- Run this in your new Supabase project's SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLES
-- =====================================================

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sites table with T2 template support
CREATE TABLE IF NOT EXISTS sites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  template_id TEXT NOT NULL CHECK (template_id IN ('t1', 't2', 't3', 't4', 't5', 't6', 't7')),
  logo_url TEXT,
  primary_color TEXT,
  secondary_color TEXT,
  accent_color TEXT,
  brand_name TEXT,
  industry TEXT,
  description TEXT,
  cta_url TEXT,
  headline TEXT,
  subheadline TEXT,
  cta TEXT,
  generated_html TEXT,
  generated_css TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  
  -- T2 Template specific fields
  hero_image TEXT,
  feature_image1 TEXT,
  feature_image2 TEXT,
  sections JSONB DEFAULT '{}',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create visits table for analytics
CREATE TABLE IF NOT EXISTS visits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  ts TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT,
  user_agent TEXT,
  ip_address INET,
  country TEXT,
  city TEXT,
  referrer TEXT
);

-- Create site_versions table for rollback functionality
CREATE TABLE IF NOT EXISTS site_versions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  generated_html TEXT,
  generated_css TEXT,
  brand_config JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Organizations indexes
CREATE INDEX IF NOT EXISTS idx_organizations_owner_user_id ON organizations(owner_user_id);

-- Sites indexes
CREATE INDEX IF NOT EXISTS idx_sites_org_id ON sites(org_id);
CREATE INDEX IF NOT EXISTS idx_sites_slug ON sites(slug);
CREATE INDEX IF NOT EXISTS idx_sites_template_id ON sites(template_id);
CREATE INDEX IF NOT EXISTS idx_sites_status ON sites(status);
CREATE INDEX IF NOT EXISTS idx_sites_created_at ON sites(created_at);

-- Visits indexes
CREATE INDEX IF NOT EXISTS idx_visits_site_id ON visits(site_id);
CREATE INDEX IF NOT EXISTS idx_visits_ts ON visits(ts);
CREATE INDEX IF NOT EXISTS idx_visits_country ON visits(country);

-- Site versions indexes
CREATE INDEX IF NOT EXISTS idx_site_versions_site_id ON site_versions(site_id);
CREATE INDEX IF NOT EXISTS idx_site_versions_created_at ON site_versions(created_at);

-- =====================================================
-- TRIGGERS AND FUNCTIONS
-- =====================================================

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
DROP TRIGGER IF EXISTS update_organizations_updated_at ON organizations;
CREATE TRIGGER update_organizations_updated_at 
    BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_sites_updated_at ON sites;
CREATE TRIGGER update_sites_updated_at 
    BEFORE UPDATE ON sites
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create site version on update
CREATE OR REPLACE FUNCTION create_site_version()
RETURNS TRIGGER AS $$
BEGIN
    -- Only create version if HTML or CSS changed
    IF OLD.generated_html IS DISTINCT FROM NEW.generated_html 
       OR OLD.generated_css IS DISTINCT FROM NEW.generated_css THEN
        
        INSERT INTO site_versions (
            site_id, 
            version_number, 
            generated_html, 
            generated_css,
            brand_config,
            created_by
        )
        SELECT 
            OLD.id,
            COALESCE(MAX(version_number), 0) + 1,
            OLD.generated_html,
            OLD.generated_css,
            jsonb_build_object(
                'brand_name', OLD.brand_name,
                'headline', OLD.headline,
                'subheadline', OLD.subheadline,
                'logo_url', OLD.logo_url,
                'primary_color', OLD.primary_color,
                'secondary_color', OLD.secondary_color,
                'accent_color', OLD.accent_color,
                'hero_image', OLD.hero_image,
                'feature_image1', OLD.feature_image1,
                'feature_image2', OLD.feature_image2,
                'sections', OLD.sections
            ),
            auth.uid()
        FROM site_versions 
        WHERE site_id = OLD.id;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for site versioning
DROP TRIGGER IF EXISTS create_site_version_trigger ON sites;
CREATE TRIGGER create_site_version_trigger
    BEFORE UPDATE ON sites
    FOR EACH ROW EXECUTE FUNCTION create_site_version();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_versions ENABLE ROW LEVEL SECURITY;

-- Organizations policies
CREATE POLICY "Users can view their own organizations" ON organizations
    FOR SELECT USING (auth.uid() = owner_user_id);

CREATE POLICY "Users can create organizations" ON organizations
    FOR INSERT WITH CHECK (auth.uid() = owner_user_id);

CREATE POLICY "Users can update their own organizations" ON organizations
    FOR UPDATE USING (auth.uid() = owner_user_id);

CREATE POLICY "Users can delete their own organizations" ON organizations
    FOR DELETE USING (auth.uid() = owner_user_id);

-- Sites policies
CREATE POLICY "Users can view sites in their organizations" ON sites
    FOR SELECT USING (
        org_id IN (
            SELECT id FROM organizations WHERE owner_user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create sites in their organizations" ON sites
    FOR INSERT WITH CHECK (
        org_id IN (
            SELECT id FROM organizations WHERE owner_user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update sites in their organizations" ON sites
    FOR UPDATE USING (
        org_id IN (
            SELECT id FROM organizations WHERE owner_user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete sites in their organizations" ON sites
    FOR DELETE USING (
        org_id IN (
            SELECT id FROM organizations WHERE owner_user_id = auth.uid()
        )
    );

-- Public read access for published sites (for visitors)
CREATE POLICY "Anyone can view published sites" ON sites
    FOR SELECT USING (status = 'published');

-- Visits policies (allow anonymous visits for analytics)
CREATE POLICY "Anyone can create visits" ON visits
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view visits for their sites" ON visits
    FOR SELECT USING (
        site_id IN (
            SELECT s.id FROM sites s
            JOIN organizations o ON s.org_id = o.id
            WHERE o.owner_user_id = auth.uid()
        )
    );

-- Site versions policies
CREATE POLICY "Users can view versions of their sites" ON site_versions
    FOR SELECT USING (
        site_id IN (
            SELECT s.id FROM sites s
            JOIN organizations o ON s.org_id = o.id
            WHERE o.owner_user_id = auth.uid()
        )
    );

CREATE POLICY "System can create site versions" ON site_versions
    FOR INSERT WITH CHECK (true);

-- =====================================================
-- STORAGE SETUP
-- =====================================================

-- Create storage bucket for logos and images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('logos1', 'logos1', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for logos bucket
CREATE POLICY "Anyone can view logos" ON storage.objects
    FOR SELECT USING (bucket_id = 'logos1');

CREATE POLICY "Authenticated users can upload logos" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'logos1' 
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can update their own logos" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'logos1' 
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can delete their own logos" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'logos1' 
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- =====================================================
-- SAMPLE DATA (OPTIONAL)
-- =====================================================

-- Uncomment the following to insert sample data for testing

/*
-- Insert sample organization (replace with your user ID)
INSERT INTO organizations (id, owner_user_id, name) 
VALUES (
    uuid_generate_v4(),
    'your-user-id-here', -- Replace with actual user ID from auth.users
    'Sample Organization'
);

-- Insert sample site
INSERT INTO sites (
    org_id, 
    slug, 
    template_id, 
    brand_name, 
    headline, 
    subheadline,
    primary_color,
    secondary_color,
    accent_color,
    status
) VALUES (
    (SELECT id FROM organizations LIMIT 1),
    'sample-site',
    't2',
    'Sample Brand',
    'Transform Your Business Today',
    'Get started with our amazing platform',
    '#3B82F6',
    '#6B7280', 
    '#10B981',
    'draft'
);
*/

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

DO $$
BEGIN
    RAISE NOTICE '✅ Olavivo AI Prelander database schema created successfully!';
    RAISE NOTICE '📋 Next steps:';
    RAISE NOTICE '   1. Set up your environment variables';
    RAISE NOTICE '   2. Configure authentication in your app';
    RAISE NOTICE '   3. Test the connection';
    RAISE NOTICE '   4. Start building amazing landing pages!';
END $$;
