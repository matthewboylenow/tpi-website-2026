import { NextRequest, NextResponse } from "next/server";
import { getCountyById, updateCounty, deleteCounty } from "@/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const countyId = parseInt(id, 10);

    if (isNaN(countyId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const county = await getCountyById(countyId);

    if (!county) {
      return NextResponse.json({ error: "County not found" }, { status: 404 });
    }

    return NextResponse.json({ county });
  } catch (error) {
    console.error("Get county error:", error);
    return NextResponse.json(
      { error: "Failed to get county" },
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
    const countyId = parseInt(id, 10);

    if (isNaN(countyId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const data = await request.json();

    const county = await updateCounty(countyId, {
      name: data.name,
      state: data.state,
      salespersonId: data.salespersonId ?? null,
    });

    return NextResponse.json({ success: true, county });
  } catch (error) {
    console.error("Update county error:", error);
    return NextResponse.json(
      { error: "Failed to update county" },
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
    const countyId = parseInt(id, 10);

    if (isNaN(countyId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await deleteCounty(countyId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete county error:", error);
    return NextResponse.json(
      { error: "Failed to delete county" },
      { status: 500 }
    );
  }
}
