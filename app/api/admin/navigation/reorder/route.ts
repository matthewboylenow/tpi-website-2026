import { NextRequest, NextResponse } from "next/server";
import { reorderNavigationItems } from "@/lib/data";

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.items || !Array.isArray(data.items)) {
      return NextResponse.json(
        { error: "Items array is required" },
        { status: 400 }
      );
    }

    // Validate each item has id and displayOrder
    for (const item of data.items) {
      if (typeof item.id !== "number" || typeof item.displayOrder !== "number") {
        return NextResponse.json(
          { error: "Each item must have id and displayOrder" },
          { status: 400 }
        );
      }
    }

    const items = await reorderNavigationItems(data.items);

    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error("Reorder navigation error:", error);
    return NextResponse.json(
      { error: "Failed to reorder navigation items" },
      { status: 500 }
    );
  }
}
