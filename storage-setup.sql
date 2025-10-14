-- Storage bucket for logos (skip if exists)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('logos1', 'logos1', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for logos bucket
DROP POLICY IF EXISTS "Anyone can view logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload logos" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own logos" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own logos" ON storage.objects;

CREATE POLICY "Anyone can view logos" ON storage.objects
    FOR SELECT USING (bucket_id = 'logos1');

CREATE POLICY "Authenticated users can upload logos" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'logos1' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own logos" ON storage.objects
    FOR UPDATE USING (bucket_id = 'logos1' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own logos" ON storage.objects
    FOR DELETE USING (bucket_id = 'logos1' AND auth.uid()::text = (storage.foldername(name))[1]);
