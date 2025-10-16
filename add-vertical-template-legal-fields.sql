-- Add vertical, template and legal fields to sites table
ALTER TABLE sites ADD COLUMN IF NOT EXISTS vertical TEXT DEFAULT 'casino';
ALTER TABLE sites ADD COLUMN IF NOT EXISTS terms_url TEXT;
ALTER TABLE sites ADD COLUMN IF NOT EXISTS privacy_url TEXT;
ALTER TABLE sites ADD COLUMN IF NOT EXISTS responsible_gaming_url TEXT;

-- Create index for vertical field for better filtering
CREATE INDEX IF NOT EXISTS idx_sites_vertical ON sites(vertical);

-- Add comment to describe the fields
COMMENT ON COLUMN sites.vertical IS 'Industry vertical: casino, sports, forex, crypto, ecommerce, finance, health, other';
COMMENT ON COLUMN sites.terms_url IS 'URL to terms and conditions page';
COMMENT ON COLUMN sites.privacy_url IS 'URL to privacy policy page';
COMMENT ON COLUMN sites.responsible_gaming_url IS 'URL to responsible gaming information page';
