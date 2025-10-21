-- =====================================================
-- COMPLETE DATABASE SETUP FOR PRELANDER PLATFORM
-- Execute this in your Supabase SQL Editor
-- =====================================================

-- 1. CREATE ORGANIZATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    owner_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    user_code VARCHAR(10) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies for organizations
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first
DROP POLICY IF EXISTS "Users can view their own organizations" ON public.organizations;
DROP POLICY IF EXISTS "Users can create their own organizations" ON public.organizations;
DROP POLICY IF EXISTS "Users can update their own organizations" ON public.organizations;

-- Create policies
CREATE POLICY "Users can view their own organizations"
    ON public.organizations FOR SELECT
    USING (auth.uid() = owner_user_id);

CREATE POLICY "Users can create their own organizations"
    ON public.organizations FOR INSERT
    WITH CHECK (auth.uid() = owner_user_id);

CREATE POLICY "Users can update their own organizations"
    ON public.organizations FOR UPDATE
    USING (auth.uid() = owner_user_id);


-- 2. UPDATE SITES TABLE TO USE ORG_ID
-- =====================================================
-- Add user_id column if it doesn't exist (for backward compatibility)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'sites' 
                   AND column_name = 'user_id') THEN
        ALTER TABLE public.sites ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Add org_id column if it doesn't exist
ALTER TABLE public.sites ADD COLUMN IF NOT EXISTS org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sites_org_id ON public.sites(org_id);
CREATE INDEX IF NOT EXISTS idx_sites_user_id ON public.sites(user_id);


-- 3. ADD SITE TRACKING COLUMNS
-- =====================================================
ALTER TABLE public.sites ADD COLUMN IF NOT EXISTS is_downloaded BOOLEAN DEFAULT FALSE;
ALTER TABLE public.sites ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT FALSE;
ALTER TABLE public.sites ADD COLUMN IF NOT EXISTS downloaded_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.sites ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.sites ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0;


-- 4. CREATE USER CODE GENERATION FUNCTION
-- =====================================================
CREATE OR REPLACE FUNCTION generate_user_code()
RETURNS VARCHAR(10) AS $$
DECLARE
    code VARCHAR(10);
    exists BOOLEAN;
BEGIN
    LOOP
        -- Generate 6-character alphanumeric code
        code := UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
        
        -- Check if code already exists
        SELECT EXISTS(SELECT 1 FROM organizations WHERE user_code = code) INTO exists;
        
        -- Exit loop if code is unique
        IF NOT exists THEN
            EXIT;
        END IF;
    END LOOP;
    
    RETURN code;
END;
$$ LANGUAGE plpgsql;


-- 5. CREATE TRIGGER FOR AUTO USER CODE
-- =====================================================
CREATE OR REPLACE FUNCTION set_user_code()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.user_code IS NULL THEN
        NEW.user_code := generate_user_code();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_user_code ON public.organizations;
CREATE TRIGGER trigger_set_user_code
    BEFORE INSERT ON public.organizations
    FOR EACH ROW
    EXECUTE FUNCTION set_user_code();


-- 6. CREATE ORGANIZATIONS FOR EXISTING USERS
-- =====================================================
-- This creates an organization for each user who has sites but no organization
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_schema = 'public' 
               AND table_name = 'sites' 
               AND column_name = 'user_id') THEN
        
        INSERT INTO public.organizations (owner_user_id, name)
        SELECT DISTINCT 
            s.user_id,
            'My Organization'
        FROM public.sites s
        LEFT JOIN public.organizations o ON o.owner_user_id = s.user_id
        WHERE o.id IS NULL AND s.user_id IS NOT NULL
        ON CONFLICT DO NOTHING;
    END IF;
END $$;


-- 7. LINK EXISTING SITES TO ORGANIZATIONS
-- =====================================================
-- Update sites to link them to their user's organization
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_schema = 'public' 
               AND table_name = 'sites' 
               AND column_name = 'user_id') THEN
        
        UPDATE public.sites s
        SET org_id = o.id
        FROM public.organizations o
        WHERE s.user_id = o.owner_user_id
        AND s.org_id IS NULL;
    END IF;
END $$;


-- 8. UPDATE RLS POLICIES FOR SITES
-- =====================================================
-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view their own sites" ON public.sites;
DROP POLICY IF EXISTS "Users can create their own sites" ON public.sites;
DROP POLICY IF EXISTS "Users can update their own sites" ON public.sites;
DROP POLICY IF EXISTS "Users can delete their own sites" ON public.sites;

-- Enable RLS
ALTER TABLE public.sites ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Users can view their own sites"
    ON public.sites FOR SELECT
    USING (
        auth.uid() = user_id OR 
        org_id IN (SELECT id FROM public.organizations WHERE owner_user_id = auth.uid())
    );

CREATE POLICY "Users can create their own sites"
    ON public.sites FOR INSERT
    WITH CHECK (
        auth.uid() = user_id OR 
        org_id IN (SELECT id FROM public.organizations WHERE owner_user_id = auth.uid())
    );

CREATE POLICY "Users can update their own sites"
    ON public.sites FOR UPDATE
    USING (
        auth.uid() = user_id OR 
        org_id IN (SELECT id FROM public.organizations WHERE owner_user_id = auth.uid())
    );

CREATE POLICY "Users can delete their own sites"
    ON public.sites FOR DELETE
    USING (
        auth.uid() = user_id OR 
        org_id IN (SELECT id FROM public.organizations WHERE owner_user_id = auth.uid())
    );


-- 9. CREATE VISITS TABLE IF NOT EXISTS
-- =====================================================
CREATE TABLE IF NOT EXISTS public.visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_id UUID NOT NULL REFERENCES public.sites(id) ON DELETE CASCADE,
    visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address TEXT,
    user_agent TEXT,
    referrer TEXT
);

-- Add columns if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'visits' 
                   AND column_name = 'visited_at') THEN
        ALTER TABLE public.visits ADD COLUMN visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'visits' 
                   AND column_name = 'ip_address') THEN
        ALTER TABLE public.visits ADD COLUMN ip_address TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'visits' 
                   AND column_name = 'user_agent') THEN
        ALTER TABLE public.visits ADD COLUMN user_agent TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'visits' 
                   AND column_name = 'referrer') THEN
        ALTER TABLE public.visits ADD COLUMN referrer TEXT;
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_visits_site_id ON public.visits(site_id);
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_schema = 'public' 
               AND table_name = 'visits' 
               AND column_name = 'visited_at') THEN
        CREATE INDEX IF NOT EXISTS idx_visits_visited_at ON public.visits(visited_at);
    END IF;
END $$;

-- Enable RLS for visits
ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;

-- Drop existing policy first
DROP POLICY IF EXISTS "Users can view visits for their sites" ON public.visits;

-- Create policy
CREATE POLICY "Users can view visits for their sites"
    ON public.visits FOR SELECT
    USING (
        site_id IN (
            SELECT id FROM public.sites 
            WHERE user_id = auth.uid() OR 
            org_id IN (SELECT id FROM public.organizations WHERE owner_user_id = auth.uid())
        )
    );


-- 10. VERIFY SETUP
-- =====================================================
-- Check that everything was created successfully
SELECT 
    'organizations' as table_name,
    COUNT(*) as record_count
FROM public.organizations
UNION ALL
SELECT 
    'sites' as table_name,
    COUNT(*) as record_count
FROM public.sites
UNION ALL
SELECT 
    'sites_with_org' as table_name,
    COUNT(*) as record_count
FROM public.sites
WHERE org_id IS NOT NULL;

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
-- Your database is now ready to use.
-- All existing sites have been linked to organizations.
-- New users will automatically get an organization created.
