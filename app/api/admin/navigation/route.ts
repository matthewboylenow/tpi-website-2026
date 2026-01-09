import { NextRequest, NextResponse } from "next/server";
import { getAllNavigationItems, createNavigationItem } from "@/lib/data";

export async function GET() {
  try {
    const items = await getAllNavigationItems();
    return NextResponse.json({ items });
  } catch (error) {
    console.error("Get navigation error:", error);
    return NextResponse.json(
      { error: "Failed to get navigation items" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.menuLocation || !data.label || !data.url) {
      return NextResponse.json(
        { error: "Menu location, label, and URL are required" },
        { status: 400 }
      );
    }

    const item = await createNavigationItem({
      menuLocation: data.menuLocation,
      label: data.label,
      url: data.url,
      parentId: data.parentId || null,
      displayOrder: data.displayOrder || 0,
      isExternal: data.isExternal || false,
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error("Create navigation error:", error);
    return NextResponse.json(
      { error: "Failed to create navigation item" },
      { status: 500 }
    );
  }
}
