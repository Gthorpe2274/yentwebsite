import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const BUCKET_NAME = 'blog-images';

export async function GET() {
  try {
    // List all files in the uploads folder
    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .list('uploads', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' },
      });

    if (error) {
      console.error('Supabase list error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to list images: ' + error.message },
        { status: 500 }
      );
    }

    // Get public URLs for all images
    const images = (data || [])
      .filter((file) => {
        // Filter out folders and only include image files
        const extension = file.name.split('.').pop()?.toLowerCase();
        return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '');
      })
      .map((file) => {
        const filePath = `uploads/${file.name}`;
        const { data: urlData } = supabaseAdmin.storage
          .from(BUCKET_NAME)
          .getPublicUrl(filePath);

        return {
          name: file.name,
          url: urlData.publicUrl,
          path: filePath,
          createdAt: file.created_at,
          size: file.metadata?.size || 0,
        };
      });

    return NextResponse.json({
      success: true,
      images,
    });
  } catch (error) {
    console.error('Error listing images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to list images' },
      { status: 500 }
    );
  }
}
