-- Update template_id constraint to include t10
ALTER TABLE sites DROP CONSTRAINT IF EXISTS sites_template_id_check;
ALTER TABLE sites ADD CONSTRAINT sites_template_id_check CHECK (template_id IN ('t6', 't7', 't9', 't10'));
