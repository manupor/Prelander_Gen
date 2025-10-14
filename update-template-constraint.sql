-- Update the template_id constraint to include t5, t6, and t7
ALTER TABLE sites DROP CONSTRAINT IF EXISTS sites_template_id_check;
ALTER TABLE sites ADD CONSTRAINT sites_template_id_check CHECK (template_id IN ('t1', 't2', 't3', 't4', 't5', 't6', 't7'));
