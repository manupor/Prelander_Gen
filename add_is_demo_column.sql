-- Add is_demo column to sites table
ALTER TABLE sites ADD COLUMN IF NOT EXISTS is_demo BOOLEAN DEFAULT FALSE;

-- Add index for faster demo site queries
CREATE INDEX IF NOT EXISTS idx_sites_is_demo ON sites(is_demo);

-- Allow public access to demo sites (optional - for read-only access)
-- This allows viewing demo sites without authentication
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to read demo sites
CREATE POLICY "Allow public read access to demo sites" ON sites
  FOR SELECT
  USING (is_demo = true);

-- Policy to allow anyone to update demo sites (for editing)
CREATE POLICY "Allow public update access to demo sites" ON sites
  FOR UPDATE
  USING (is_demo = true);
