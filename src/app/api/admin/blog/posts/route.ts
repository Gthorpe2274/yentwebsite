import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Admin password for simple authentication
const ADMIN_PASSWORD = 'y-enterprises#2024';

// Helper to verify admin access
function verifyAdmin(request: Request): boolean {
  const apiKey = request.headers.get('X-API-Key');
  return apiKey === ADMIN_PASSWORD;
}

// GET /api/admin/blog/posts - Get all blog posts (including drafts)
export async function GET(request: Request) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const posts = await db.blogPost.findMany({
      orderBy: {
        createdAt: 'desc',
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

// POST /api/admin/blog/posts - Create a new blog post
export async function POST(request: Request) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      slug,
      featuredImage,
      body: postBody,
      excerpt,
      publishedDate,
      isPublished,
      allowComments,
      author,
    } = body;

    // Validate required fields
    if (!title || !title.trim()) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }

    if (!slug || !slug.trim()) {
      return NextResponse.json(
        { success: false, error: 'Slug is required' },
        { status: 400 }
      );
    }

    if (!postBody || !postBody.trim()) {
      return NextResponse.json(
        { success: false, error: 'Body content is required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPost = await db.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { success: false, error: 'A post with this slug already exists' },
        { status: 400 }
      );
    }

    const post = await db.blogPost.create({
      data: {
        title,
        slug,
        featuredImage: featuredImage || null,
        body: postBody,
        excerpt: excerpt || null,
        publishedDate: publishedDate || null,
        isPublished: isPublished || false,
        allowComments: allowComments !== false,
        author: author || null,
      },
    });

    return NextResponse.json({
      success: true,
      post,
      message: 'Blog post created successfully',
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
