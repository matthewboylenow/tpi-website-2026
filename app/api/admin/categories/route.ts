import { NextRequest, NextResponse } from "next/server";
import { createCategory, createSubcategory } from "@/lib/data";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.slug) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400 }
      );
    }

    // Create category
    const category = await createCategory({
      name: data.name,
      slug: data.slug,
      description: data.description || null,
      heroImageUrl: data.heroImageUrl || null,
      profitCalculatorEnabled: data.profitCalculatorEnabled || false,
      displayOrder: data.displayOrder || 0,
    });

    // Create subcategories if provided
    if (data.subcategories && Array.isArray(data.subcategories)) {
      for (const sub of data.subcategories) {
        if (sub.name && !sub.id) {
          await createSubcategory({
            categoryId: category.id,
            name: sub.name,
            displayOrder: sub.displayOrder || 0,
          });
        }
      }
    }

    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error("Create category error:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
