-- Fix template_id constraint to support all current templates
-- This allows t6, t7, t9, t10, t11, t12, t13

-- Drop the old constraint
ALTER TABLE sites DROP CONSTRAINT IF EXISTS sites_template_id_check;

-- Add new constraint with all supported templates
ALTER TABLE sites ADD CONSTRAINT sites_template_id_check 
CHECK (template_id IN ('t1', 't2', 't3', 't4', 't5', 't6', 't7', 't9', 't10', 't11', 't12', 't13'));

-- Add comment
COMMENT ON CONSTRAINT sites_template_id_check ON sites IS 
'Allows all template IDs: t1-t7 (legacy), t9-t13 (game templates)';
