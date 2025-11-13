# Supabase Storage Setup

## Create Storage Bucket

1. Go to Supabase Dashboard → Storage
2. Click "Create a new bucket"
3. Name: `event-banners`
4. Set to **Public** bucket
5. Click "Create bucket"

## Set Storage Policies

Run this SQL in Supabase SQL Editor:

```sql
-- Allow authenticated users to upload files
CREATE POLICY "Users can upload event banners"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'event-banners');

-- Allow public read access
CREATE POLICY "Public can view event banners"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'event-banners');

-- Allow users to delete their own files
CREATE POLICY "Users can delete own banners"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'event-banners' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## Test Upload

After setup, test by creating an event with a banner image.
