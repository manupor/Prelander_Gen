-- Create download_passwords table to store temporary passwords for secure downloads
CREATE TABLE IF NOT EXISTS download_passwords (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  password TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  used_at TIMESTAMPTZ,
  CONSTRAINT unique_active_password UNIQUE (site_id, user_id)
);

-- Create index for faster lookups
CREATE INDEX idx_download_passwords_site_user ON download_passwords(site_id, user_id);
CREATE INDEX idx_download_passwords_expires ON download_passwords(expires_at);

-- Enable RLS
ALTER TABLE download_passwords ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own download passwords
CREATE POLICY "Users can view own download passwords"
  ON download_passwords
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can create download passwords for their own sites
CREATE POLICY "Users can create download passwords"
  ON download_passwords
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own download passwords (mark as used)
CREATE POLICY "Users can update own download passwords"
  ON download_passwords
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Add comment
COMMENT ON TABLE download_passwords IS 'Stores temporary passwords for secure ZIP file downloads';
