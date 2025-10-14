-- Add game_balance field to sites table for FisherMan Slot
ALTER TABLE sites ADD COLUMN IF NOT EXISTS game_balance INTEGER DEFAULT 1000;

-- Add comment
COMMENT ON COLUMN sites.game_balance IS 'Starting balance for slot games (FisherMan Slot, etc.)';
