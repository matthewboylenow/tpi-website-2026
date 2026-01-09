import { NextRequest, NextResponse } from "next/server";
import { parseWordPressExport } from "@/lib/wordpress-import";
import { createBlogPost, getBlogPostBySlug } from "@/lib/data";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const importAsDraft = formData.get("importAsDraft") === "true";
    const skipDuplicates = formData.get("skipDuplicates") === "true";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Read file content
    const xmlContent = await file.text();

    // Parse WordPress export
    const result = parseWordPressExport(xmlContent);

    if (result.errors.length > 0 && result.posts.length === 0) {
      return NextResponse.json(
        { error: "Failed to parse WordPress export", details: result.errors },
        { status: 400 }
      );
    }

    // Import posts
    const imported: { title: string; slug: string; id: number }[] = [];
    const skipped: { title: string; reason: string }[] = [];
    const errors: { title: string; error: string }[] = [];

    for (const wpPost of result.posts) {
      try {
        // Check for duplicates
        if (skipDuplicates) {
          const existing = await getBlogPostBySlug(wpPost.slug);
          if (existing) {
            skipped.push({
              title: wpPost.title,
              reason: "Duplicate slug",
            });
            continue;
          }
        }

        // Create blog post
        const post = await createBlogPost({
          title: wpPost.title,
          slug: wpPost.slug || generateSlug(wpPost.title),
          content: wpPost.content,
          excerpt: wpPost.excerpt || undefined,
          author: wpPost.author || "Imported from WordPress",
          featuredImageUrl: wpPost.featuredImageUrl || undefined,
          isPublished: importAsDraft ? false : wpPost.status === "publish",
          isWhatsNew: false,
          publishedAt: wpPost.publishedAt || undefined,
          metaTitle: undefined,
          metaDescription: wpPost.excerpt || undefined,
        });

        imported.push({
          title: wpPost.title,
          slug: wpPost.slug,
          id: post.id,
        });
      } catch (error) {
        errors.push({
          title: wpPost.title,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    return NextResponse.json({
      success: true,
      summary: {
        total: result.posts.length,
        imported: imported.length,
        skipped: skipped.length,
        errors: errors.length,
      },
      imported,
      skipped,
      errors,
      categories: result.categories,
      tags: result.tags,
      parseErrors: result.errors,
    });
  } catch (error) {
    console.error("WordPress import error:", error);
    return NextResponse.json(
      { error: "Failed to import WordPress export" },
      { status: 500 }
    );
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 100);
}
