-- Add missing fields to sites table
ALTER TABLE sites 
ADD COLUMN IF NOT EXISTS cta_url TEXT,
ADD COLUMN IF NOT EXISTS popup_title TEXT DEFAULT 'WINNER!',
ADD COLUMN IF NOT EXISTS popup_message TEXT DEFAULT 'Congratulations! You''ve won!',
ADD COLUMN IF NOT EXISTS popup_prize TEXT DEFAULT '$1,000 + 50 FREE SPINS';

-- Update existing rows to have default values
UPDATE sites 
SET 
  cta_url = COALESCE(cta_url, 'https://example.com'),
  popup_title = COALESCE(popup_title, 'WINNER!'),
  popup_message = COALESCE(popup_message, 'Congratulations! You''ve won!'),
  popup_prize = COALESCE(popup_prize, '$1,000 + 50 FREE SPINS')
WHERE cta_url IS NULL OR popup_title IS NULL OR popup_message IS NULL OR popup_prize IS NULL;
