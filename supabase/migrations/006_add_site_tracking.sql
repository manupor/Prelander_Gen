-- Add fields to track site downloads and publications
ALTER TABLE sites ADD COLUMN is_downloaded BOOLEAN DEFAULT FALSE;
ALTER TABLE sites ADD COLUMN is_published BOOLEAN DEFAULT FALSE;
ALTER TABLE sites ADD COLUMN downloaded_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE sites ADD COLUMN published_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE sites ADD COLUMN download_count INTEGER DEFAULT 0;

-- Update existing sites to mark them as downloaded if they have been created
UPDATE sites SET is_downloaded = TRUE, downloaded_at = created_at WHERE created_at IS NOT NULL;
