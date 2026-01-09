import { NextRequest, NextResponse } from "next/server";
import { updateBlogPost, deleteBlogPost, getBlogPostById } from "@/lib/data";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id, 10);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json(
        { error: "Title, slug, and content are required" },
        { status: 400 }
      );
    }

    const post = await updateBlogPost(postId, {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || null,
      content: data.content,
      featuredImageUrl: data.featuredImageUrl || null,
      author: data.author || null,
      isPublished: data.isPublished || false,
      isWhatsNew: data.isWhatsNew || false,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Update blog post error:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id, 10);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await deleteBlogPost(postId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete blog post error:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const postId = parseInt(id, 10);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const post = await getBlogPostById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Get blog post error:", error);
    return NextResponse.json(
      { error: "Failed to get blog post" },
      { status: 500 }
    );
  }
}
