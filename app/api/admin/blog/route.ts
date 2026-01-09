import { NextRequest, NextResponse } from "next/server";
import { createBlogPost } from "@/lib/data";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json(
        { error: "Title, slug, and content are required" },
        { status: 400 }
      );
    }

    const post = await createBlogPost({
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
    console.error("Create blog post error:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
