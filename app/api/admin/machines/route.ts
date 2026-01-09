import { NextRequest, NextResponse } from "next/server";
import { createMachine } from "@/lib/data";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.modelNumber || !data.name || !data.slug) {
      return NextResponse.json(
        { error: "Model number, name, and slug are required" },
        { status: 400 }
      );
    }

    const machine = await createMachine({
      modelNumber: data.modelNumber,
      name: data.name,
      slug: data.slug,
      shortDescription: data.shortDescription || null,
      description: data.description || null,
      longDescription: data.longDescription || null,
      imageUrl: data.imageUrl || null,
      specSheetUrl: data.specSheetUrl || null,
      categoryId: data.categoryId || null,
      subcategoryId: data.subcategoryId || null,
      flavorCount: data.flavorCount || null,
      machineType: data.machineType || null,
      isAdaCompliant: data.isAdaCompliant || false,
      isFeatured: data.isFeatured || false,
      isInStock: data.isInStock ?? true,
      isDemoUnit: data.isDemoUnit || false,
      demoDiscountPercent: data.demoDiscountPercent || null,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      focusKeyword: data.focusKeyword || null,
      displayOrder: data.displayOrder || 0,
    });

    return NextResponse.json({ success: true, machine });
  } catch (error) {
    console.error("Create machine error:", error);
    return NextResponse.json(
      { error: "Failed to create machine" },
      { status: 500 }
    );
  }
}
