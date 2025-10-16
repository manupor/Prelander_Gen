# Supabase Storage Setup for Logo Uploads

## Create Storage Bucket

You need to create a storage bucket in Supabase to store uploaded logos.

### Steps:

1. **Go to Supabase Dashboard**
   - Navigate to your project
   - Click on "Storage" in the left sidebar

2. **Create New Bucket**
   - Click "New bucket"
   - Name: `site-assets`
   - Public bucket: ✅ **YES** (check this box)
   - Click "Create bucket"

3. **Set Bucket Policies** (Optional but recommended)
   
   Go to "Policies" tab and add these policies:

   **Allow Public Read:**
   ```sql
   CREATE POLICY "Public Access"
   ON storage.objects FOR SELECT
   USING ( bucket_id = 'site-assets' );
   ```

   **Allow Authenticated Upload:**
   ```sql
   CREATE POLICY "Authenticated users can upload"
   ON storage.objects FOR INSERT
   WITH CHECK (
     bucket_id = 'site-assets' 
     AND auth.role() = 'authenticated'
   );
   ```

   **Allow Authenticated Update:**
   ```sql
   CREATE POLICY "Authenticated users can update own files"
   ON storage.objects FOR UPDATE
   USING ( bucket_id = 'site-assets' AND auth.role() = 'authenticated' )
   WITH CHECK ( bucket_id = 'site-assets' AND auth.role() = 'authenticated' );
   ```

4. **Test Upload**
   - Go back to your editor
   - Click on "Logo" tab
   - Click "Choose File from Computer"
   - Select an image
   - Should upload successfully! ✅

## Troubleshooting

### Error: "Bucket not found"
- Make sure the bucket name is exactly `site-assets`
- Make sure the bucket is public

### Error: "Permission denied"
- Check that you're logged in
- Verify the bucket policies are set correctly

### Error: "File too large"
- Max file size is 2MB
- Compress your image before uploading

## Alternative: Use Existing Bucket

If you already have a storage bucket, you can modify the code:

In `/src/app/sites/[slug]/edit/page.tsx`, change:
```typescript
.from('site-assets')  // Change this to your bucket name
```
