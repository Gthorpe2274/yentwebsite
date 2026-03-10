import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Admin password for simple authentication
const ADMIN_PASSWORD = 'y-enterprises#2024';

// Helper to verify admin access
function verifyAdmin(request: Request): boolean {
  const apiKey = request.headers.get('X-API-Key');
  return apiKey === ADMIN_PASSWORD;
}

// GET /api/admin/blog/posts/[id] - Get a single blog post by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    const post = await db.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/blog/posts/[id] - Update a blog post
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
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

    // Check if post exists
    const existingPost = await db.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Check if another post has the same slug
    if (slug && slug !== existingPost.slug) {
      const slugExists = await db.blogPost.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { success: false, error: 'Another post with this slug already exists' },
          { status: 400 }
        );
      }
    }

    const updatedPost = await db.blogPost.update({
      where: { id },
      data: {
        title: title ?? existingPost.title,
        slug: slug ?? existingPost.slug,
        featuredImage: featuredImage ?? existingPost.featuredImage,
        body: postBody ?? existingPost.body,
        excerpt: excerpt ?? existingPost.excerpt,
        publishedDate: publishedDate ?? existingPost.publishedDate,
        isPublished: isPublished ?? existingPost.isPublished,
        allowComments: allowComments ?? existingPost.allowComments,
        author: author ?? existingPost.author,
      },
    });

    return NextResponse.json({
      success: true,
      post: updatedPost,
      message: 'Blog post updated successfully',
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/blog/posts/[id] - Delete a blog post
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Check if post exists
    const existingPost = await db.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    await db.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
