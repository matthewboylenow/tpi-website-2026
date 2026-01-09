import { NextRequest, NextResponse } from "next/server";
import { createSubcategory } from "@/lib/data";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.categoryId || !data.name) {
      return NextResponse.json(
        { error: "Category ID and name are required" },
        { status: 400 }
      );
    }

    const subcategory = await createSubcategory({
      categoryId: data.categoryId,
      name: data.name,
      displayOrder: data.displayOrder || 0,
    });

    return NextResponse.json({ success: true, subcategory });
  } catch (error) {
    console.error("Create subcategory error:", error);
    return NextResponse.json(
      { error: "Failed to create subcategory" },
      { status: 500 }
    );
  }
}
