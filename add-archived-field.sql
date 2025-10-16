-- Add archived column to sites table
ALTER TABLE sites ADD COLUMN IF NOT EXISTS archived BOOLEAN DEFAULT false;

-- Create index for better performance when filtering archived sites
CREATE INDEX IF NOT EXISTS idx_sites_archived ON sites(archived);

-- Update RLS policies to include archived sites in user queries
-- (The existing policies already handle this, but we ensure archived sites are still accessible to owners)
