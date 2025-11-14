# Supabase Storage Setup Guide

## 📦 Storage Buckets Configuration

### 1. Create Storage Buckets

Go to Supabase Dashboard → Storage → Create Bucket

#### Bucket 1: event-banners
- **Name:** `event-banners`
- **Public:** Yes (for easy access)
- **File size limit:** 5MB
- **Allowed MIME types:** `image/jpeg, image/png, image/webp`

#### Bucket 2: deliverable-proofs
- **Name:** `deliverable-proofs`
- **Public:** Yes
- **File size limit:** 10MB
- **Allowed MIME types:** `image/jpeg, image/png, image/webp, application/pdf`

### 2. Storage Policies

Run these SQL commands in Supabase SQL Editor:

```sql
-- Event Banners Policies
CREATE POLICY "Anyone can view event banners"
ON storage.objects FOR SELECT
USING (bucket_id = 'event-banners');

CREATE POLICY "Organizers can upload event banners"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'event-banners' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Organizers can update own banners"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'event-banners' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Organizers can delete own banners"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'event-banners' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Deliverable Proofs Policies
CREATE POLICY "Match participants can view proofs"
ON storage.objects FOR SELECT
USING (bucket_id = 'deliverable-proofs');

CREATE POLICY "Organizers can upload proofs"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'deliverable-proofs' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Organizers can update own proofs"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'deliverable-proofs' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

### 3. File Upload Example

```typescript
// lib/storage.ts
import { supabase } from './supabase';

export async function uploadEventBanner(file: File, userId: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('event-banners')
    .upload(fileName, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('event-banners')
    .getPublicUrl(fileName);

  return publicUrl;
}

export async function uploadDeliverableProof(file: File, userId: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('deliverable-proofs')
    .upload(fileName, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('deliverable-proofs')
    .getPublicUrl(fileName);

  return publicUrl;
}
```

### 4. Client-Side Image Compression (Optional)

To stay within free tier limits, compress images before upload:

```typescript
// lib/image-compression.ts
export async function compressImage(file: File, maxWidth = 1200): Promise<File> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ratio = Math.min(maxWidth / img.width, 1);
        
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          resolve(new File([blob!], file.name, { type: 'image/jpeg' }));
        }, 'image/jpeg', 0.8);
      };
    };
  });
}
```

### 5. Usage in Components

```typescript
// In EventForm component
const handleBannerUpload = async (file: File) => {
  const compressed = await compressImage(file);
  const url = await uploadEventBanner(compressed, user.id);
  setFormData({ ...formData, bannerUrl: url });
};

// In DeliverableUpload component
const handleProofUpload = async (file: File) => {
  const compressed = await compressImage(file);
  const url = await uploadDeliverableProof(compressed, user.id);
  // Update deliverable with proof URL
};
```

## 📊 Storage Limits (Free Tier)

- **Total Storage:** 1GB
- **Bandwidth:** 2GB/month
- **File Size Limit:** 50MB per file

## 💡 Tips

1. **Compress images** before upload to save space
2. **Use WebP format** for better compression
3. **Delete old files** when updating
4. **Monitor usage** in Supabase dashboard
5. **Set file size limits** in bucket settings

## ✅ Verification

Test your setup:

```bash
# Upload test file
curl -X POST 'https://YOUR_PROJECT.supabase.co/storage/v1/object/event-banners/test.jpg' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -F 'file=@test.jpg'

# Verify public URL
https://YOUR_PROJECT.supabase.co/storage/v1/object/public/event-banners/test.jpg
```

## 🚨 Troubleshooting

**Upload fails:**
- Check bucket exists
- Verify policies are set
- Check file size < limit
- Ensure authenticated

**Can't view files:**
- Verify bucket is public
- Check RLS policies
- Confirm public URL format

**Storage full:**
- Delete unused files
- Compress images more
- Consider upgrading plan
