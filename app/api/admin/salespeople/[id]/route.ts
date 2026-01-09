import { NextRequest, NextResponse } from "next/server";
import { updateSalesperson, deleteSalesperson, getSalespersonById } from "@/lib/data";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const salespersonId = parseInt(id, 10);

    if (isNaN(salespersonId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.slug || !data.email) {
      return NextResponse.json(
        { error: "First name, last name, slug, and email are required" },
        { status: 400 }
      );
    }

    const salesperson = await updateSalesperson(salespersonId, {
      firstName: data.firstName,
      lastName: data.lastName,
      slug: data.slug,
      email: data.email,
      phone: data.phone || null,
      headshotUrl: data.headshotUrl || null,
      bio: data.bio || null,
      bookingLink: data.bookingLink || null,
      displayOrder: data.displayOrder || 0,
      isActive: data.isActive ?? true,
    });

    return NextResponse.json({ success: true, salesperson });
  } catch (error) {
    console.error("Update salesperson error:", error);
    return NextResponse.json(
      { error: "Failed to update salesperson" },
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
    const salespersonId = parseInt(id, 10);

    if (isNaN(salespersonId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await deleteSalesperson(salespersonId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete salesperson error:", error);
    return NextResponse.json(
      { error: "Failed to delete salesperson" },
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
    const salespersonId = parseInt(id, 10);

    if (isNaN(salespersonId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const salesperson = await getSalespersonById(salespersonId);

    if (!salesperson) {
      return NextResponse.json({ error: "Salesperson not found" }, { status: 404 });
    }

    return NextResponse.json({ salesperson });
  } catch (error) {
    console.error("Get salesperson error:", error);
    return NextResponse.json(
      { error: "Failed to get salesperson" },
      { status: 500 }
    );
  }
}
