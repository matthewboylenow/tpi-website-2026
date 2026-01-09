import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { machines, categories, blogPosts } from "@/lib/schema";
import { ilike, or, eq, and } from "drizzle-orm";

interface SearchResult {
  type: "machine" | "category" | "blog";
  title: string;
  description?: string;
  href: string;
  modelNumber?: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }

  const searchTerm = `%${query.trim()}%`;

  try {
    // Search machines
    const machineResults = await db
      .select({
        id: machines.id,
        name: machines.name,
        modelNumber: machines.modelNumber,
        slug: machines.slug,
        shortDescription: machines.shortDescription,
      })
      .from(machines)
      .where(
        or(
          ilike(machines.name, searchTerm),
          ilike(machines.modelNumber, searchTerm),
          ilike(machines.shortDescription, searchTerm),
          ilike(machines.description, searchTerm)
        )
      )
      .limit(10);

    // Search categories
    const categoryResults = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        description: categories.description,
      })
      .from(categories)
      .where(
        or(
          ilike(categories.name, searchTerm),
          ilike(categories.description, searchTerm)
        )
      )
      .limit(5);

    // Search blog posts
    const blogResults = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        excerpt: blogPosts.excerpt,
      })
      .from(blogPosts)
      .where(
        and(
          eq(blogPosts.isPublished, true),
          or(
            ilike(blogPosts.title, searchTerm),
            ilike(blogPosts.excerpt, searchTerm),
            ilike(blogPosts.content, searchTerm)
          )
        )
      )
      .limit(5);

    // Combine and format results
    const results: SearchResult[] = [
      ...machineResults.map((m) => ({
        type: "machine" as const,
        title: m.name,
        description: m.shortDescription || undefined,
        href: `/machines/${m.slug}`,
        modelNumber: m.modelNumber,
      })),
      ...categoryResults.map((c) => ({
        type: "category" as const,
        title: c.name,
        description: c.description || undefined,
        href: `/${c.slug}`,
      })),
      ...blogResults.map((b) => ({
        type: "blog" as const,
        title: b.title,
        description: b.excerpt || undefined,
        href: `/blog/${b.slug}`,
      })),
    ];

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Search failed", results: [] },
      { status: 500 }
    );
  }
}
