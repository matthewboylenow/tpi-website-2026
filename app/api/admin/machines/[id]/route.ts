import { NextRequest, NextResponse } from "next/server";
import { updateMachine, deleteMachine, getMachineById } from "@/lib/data";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const machineId = parseInt(id, 10);

    if (isNaN(machineId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.modelNumber || !data.name || !data.slug) {
      return NextResponse.json(
        { error: "Model number, name, and slug are required" },
        { status: 400 }
      );
    }

    const machine = await updateMachine(machineId, {
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
    console.error("Update machine error:", error);
    return NextResponse.json(
      { error: "Failed to update machine" },
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
    const machineId = parseInt(id, 10);

    if (isNaN(machineId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await deleteMachine(machineId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete machine error:", error);
    return NextResponse.json(
      { error: "Failed to delete machine" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const machineId = parseInt(id, 10);

    if (isNaN(machineId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const machine = await getMachineById(machineId);

    if (!machine) {
      return NextResponse.json({ error: "Machine not found" }, { status: 404 });
    }

    return NextResponse.json({ machine });
  } catch (error) {
    console.error("Get machine error:", error);
    return NextResponse.json(
      { error: "Failed to get machine" },
      { status: 500 }
    );
  }
}
