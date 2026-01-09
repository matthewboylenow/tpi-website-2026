import { NextRequest, NextResponse } from "next/server";
import { getSubcategoryById, updateSubcategory, deleteSubcategory } from "@/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const subcategoryId = parseInt(id, 10);

    if (isNaN(subcategoryId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const subcategory = await getSubcategoryById(subcategoryId);

    if (!subcategory) {
      return NextResponse.json({ error: "Subcategory not found" }, { status: 404 });
    }

    return NextResponse.json({ subcategory });
  } catch (error) {
    console.error("Get subcategory error:", error);
    return NextResponse.json(
      { error: "Failed to get subcategory" },
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
    const subcategoryId = parseInt(id, 10);

    if (isNaN(subcategoryId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const subcategory = await updateSubcategory(subcategoryId, {
      name: data.name,
      categoryId: data.categoryId,
      displayOrder: data.displayOrder || 0,
    });

    return NextResponse.json({ success: true, subcategory });
  } catch (error) {
    console.error("Update subcategory error:", error);
    return NextResponse.json(
      { error: "Failed to update subcategory" },
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
    const subcategoryId = parseInt(id, 10);

    if (isNaN(subcategoryId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await deleteSubcategory(subcategoryId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete subcategory error:", error);
    return NextResponse.json(
      { error: "Failed to delete subcategory" },
      { status: 500 }
    );
  }
}
