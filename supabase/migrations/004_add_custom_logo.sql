-- Add custom_logo column to sites table for Castle Slot template
ALTER TABLE sites ADD COLUMN IF NOT EXISTS custom_logo TEXT;

-- Add comment to explain the column
COMMENT ON COLUMN sites.custom_logo IS 'URL of custom logo to display in game templates (e.g., Castle Slot)';
