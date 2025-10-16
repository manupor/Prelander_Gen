-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create organizations table
CREATE TABLE organizations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sites table
CREATE TABLE sites (
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create visits table for analytics
CREATE TABLE visits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  ts TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT,
  user_agent TEXT
);

-- Add T2 template specific columns
ALTER TABLE sites ADD COLUMN IF NOT EXISTS hero_image TEXT;
ALTER TABLE sites ADD COLUMN IF NOT EXISTS feature_image1 TEXT;
ALTER TABLE sites ADD COLUMN IF NOT EXISTS feature_image2 TEXT;
ALTER TABLE sites ADD COLUMN IF NOT EXISTS sections JSONB;

-- Create indexes for better performance
CREATE INDEX idx_organizations_owner_user_id ON organizations(owner_user_id);
CREATE INDEX idx_sites_org_id ON sites(org_id);
CREATE INDEX idx_sites_slug ON sites(slug);
CREATE INDEX idx_visits_site_id ON visits(site_id);
CREATE INDEX idx_visits_ts ON visits(ts);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for sites table
CREATE TRIGGER update_sites_updated_at BEFORE UPDATE ON sites
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;

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

-- Public access to published sites
CREATE POLICY "Anyone can view published sites" ON sites
    FOR SELECT USING (status = 'published');

-- Visits policies
CREATE POLICY "Anyone can create visit records" ON visits
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view visits for their sites" ON visits
    FOR SELECT USING (
        site_id IN (
            SELECT s.id FROM sites s
            JOIN organizations o ON s.org_id = o.id
            WHERE o.owner_user_id = auth.uid()
        )
    );

-- Storage bucket for logos
INSERT INTO storage.buckets (id, name, public) VALUES ('logos1', 'logos1', true);

-- Storage policies for logos bucket
CREATE POLICY "Anyone can view logos" ON storage.objects
    FOR SELECT USING (bucket_id = 'logos1');

CREATE POLICY "Authenticated users can upload logos" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'logos1' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own logos" ON storage.objects
    FOR UPDATE USING (bucket_id = 'logos1' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own logos" ON storage.objects
    FOR DELETE USING (bucket_id = 'logos1' AND auth.uid()::text = (storage.foldername(name))[1]);
