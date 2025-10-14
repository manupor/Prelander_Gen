-- Add archived column to sites table
ALTER TABLE sites ADD COLUMN IF NOT EXISTS archived BOOLEAN DEFAULT FALSE;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_sites_archived ON sites(archived);

-- Update existing sites to not be archived
UPDATE sites SET archived = FALSE WHERE archived IS NULL;
