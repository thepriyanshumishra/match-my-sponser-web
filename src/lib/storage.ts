import { supabase } from './supabase';

export async function uploadEventBanner(file: File, userId: string): Promise<string | null> {
  if (!supabase) {
    console.error('Supabase not configured');
    return null;
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}-${Date.now()}.${fileExt}`;
  const filePath = `event-banners/${fileName}`;

  const { error } = await supabase.storage
    .from('event-banners')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Upload error:', error);
    return null;
  }

  const { data } = supabase.storage
    .from('event-banners')
    .getPublicUrl(filePath);

  return data.publicUrl;
}
