-- Migration: add cta_url column to sites if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'sites'
      AND column_name = 'cta_url'
  ) THEN
    ALTER TABLE sites ADD COLUMN cta_url TEXT;
  END IF;
END $$;
