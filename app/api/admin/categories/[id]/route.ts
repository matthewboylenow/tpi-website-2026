import { NextRequest, NextResponse } from "next/server";
import {
  getCategoryById,
  updateCategory,
  deleteCategory,
  createSubcategory,
  updateSubcategory,
} from "@/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const categoryId = parseInt(id, 10);

    if (isNaN(categoryId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const category = await getCategoryById(categoryId);

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ category });
  } catch (error) {
    console.error("Get category error:", error);
    return NextResponse.json(
      { error: "Failed to get category" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const categoryId = parseInt(id, 10);

    if (isNaN(categoryId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.slug) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400 }
      );
    }

    // Update category
    const category = await updateCategory(categoryId, {
      name: data.name,
      slug: data.slug,
      description: data.description || null,
      heroImageUrl: data.heroImageUrl || null,
      profitCalculatorEnabled: data.profitCalculatorEnabled || false,
      displayOrder: data.displayOrder || 0,
    });

    // Handle subcategories
    if (data.subcategories && Array.isArray(data.subcategories)) {
      for (const sub of data.subcategories) {
        if (sub.id) {
          // Update existing subcategory
          await updateSubcategory(sub.id, {
            name: sub.name,
            displayOrder: sub.displayOrder || 0,
          });
        } else if (sub.name) {
          // Create new subcategory
          await createSubcategory({
            categoryId: categoryId,
            name: sub.name,
            displayOrder: sub.displayOrder || 0,
          });
        }
      }
    }

    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error("Update category error:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
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
    const categoryId = parseInt(id, 10);

    if (isNaN(categoryId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await deleteCategory(categoryId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete category error:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
