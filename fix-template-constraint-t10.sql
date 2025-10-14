-- First, check what template_id values exist in the database
SELECT DISTINCT template_id FROM sites;

-- If you see 't4' or other values, we need to include them in the constraint
-- OR update those rows to use valid template IDs

-- Option 1: Include all existing template IDs in the constraint
ALTER TABLE sites DROP CONSTRAINT IF EXISTS sites_template_id_check;
ALTER TABLE sites ADD CONSTRAINT sites_template_id_check CHECK (template_id IN ('t4', 't6', 't7', 't9', 't10'));

-- Option 2: Update t4 to t9 (since t4 was the old ID for FisherMan Slot)
-- UPDATE sites SET template_id = 't9' WHERE template_id = 't4';
-- Then apply the constraint:
-- ALTER TABLE sites DROP CONSTRAINT IF EXISTS sites_template_id_check;
-- ALTER TABLE sites ADD CONSTRAINT sites_template_id_check CHECK (template_id IN ('t6', 't7', 't9', 't10'));
