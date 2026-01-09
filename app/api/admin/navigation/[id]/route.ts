import { NextRequest, NextResponse } from "next/server";
import { getNavigationItemById, updateNavigationItem, deleteNavigationItem } from "@/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const itemId = parseInt(id, 10);

    if (isNaN(itemId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const item = await getNavigationItemById(itemId);

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ item });
  } catch (error) {
    console.error("Get navigation item error:", error);
    return NextResponse.json(
      { error: "Failed to get navigation item" },
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
    const itemId = parseInt(id, 10);

    if (isNaN(itemId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const data = await request.json();

    const item = await updateNavigationItem(itemId, {
      menuLocation: data.menuLocation,
      label: data.label,
      url: data.url,
      parentId: data.parentId ?? null,
      displayOrder: data.displayOrder,
      isExternal: data.isExternal,
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error("Update navigation item error:", error);
    return NextResponse.json(
      { error: "Failed to update navigation item" },
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
    const itemId = parseInt(id, 10);

    if (isNaN(itemId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await deleteNavigationItem(itemId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete navigation item error:", error);
    return NextResponse.json(
      { error: "Failed to delete navigation item" },
      { status: 500 }
    );
  }
}
