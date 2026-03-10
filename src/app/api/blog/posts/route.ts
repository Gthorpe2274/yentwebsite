import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/blog/posts - Get all published blog posts
export async function GET() {
  try {
    const posts = await db.blogPost.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        publishedDate: 'desc',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        featuredImage: true,
        excerpt: true,
        publishedDate: true,
        author: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
