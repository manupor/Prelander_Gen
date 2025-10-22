-- Add fields to track site downloads and publications
ALTER TABLE sites ADD COLUMN IF NOT EXISTS is_downloaded BOOLEAN DEFAULT FALSE;
ALTER TABLE sites ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT FALSE;
ALTER TABLE sites ADD COLUMN IF NOT EXISTS downloaded_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE sites ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE sites ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0;

-- Update existing sites to mark them as downloaded if they have been created
UPDATE sites SET is_downloaded = TRUE, downloaded_at = created_at WHERE created_at IS NOT NULL AND is_downloaded IS NULL;

-- Create download_tokens table for single-use download links
CREATE TABLE IF NOT EXISTS download_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  token TEXT UNIQUE NOT NULL,
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_download_tokens_token ON download_tokens(token);
CREATE INDEX IF NOT EXISTS idx_download_tokens_site_id ON download_tokens(site_id);
CREATE INDEX IF NOT EXISTS idx_download_tokens_user_id ON download_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_download_tokens_expires_at ON download_tokens(expires_at);

-- Enable Row Level Security
ALTER TABLE download_tokens ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can create tokens for their own sites" ON download_tokens;
DROP POLICY IF EXISTS "Users can view their own tokens" ON download_tokens;
DROP POLICY IF EXISTS "Tokens can be updated when used" ON download_tokens;

-- Create policies
CREATE POLICY "Users can create tokens for their own sites"
  ON download_tokens FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own tokens"
  ON download_tokens FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Tokens can be updated when used"
  ON download_tokens FOR UPDATE
  USING (true);

-- Cleanup function to delete expired tokens
CREATE OR REPLACE FUNCTION cleanup_expired_tokens()
RETURNS void AS $$
BEGIN
  DELETE FROM download_tokens
  WHERE expires_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;
