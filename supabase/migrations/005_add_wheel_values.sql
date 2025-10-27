-- Add wheel_values column to sites table for Fortune Wheel templates
-- This stores comma-separated prize values for the wheel (8 values)

ALTER TABLE sites ADD COLUMN IF NOT EXISTS wheel_values TEXT;

COMMENT ON COLUMN sites.wheel_values IS 'Comma-separated prize values for Fortune Wheel templates (e.g., "$100, $200, $500, $1000, $2000, $5000, $800, $1500")';
