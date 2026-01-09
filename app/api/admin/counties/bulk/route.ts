import { NextRequest, NextResponse } from "next/server";
import { bulkAssignCounties } from "@/lib/data";

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.countyIds || !Array.isArray(data.countyIds) || data.countyIds.length === 0) {
      return NextResponse.json(
        { error: "County IDs array is required" },
        { status: 400 }
      );
    }

    const salespersonId = data.salespersonId ?? null;

    const counties = await bulkAssignCounties(data.countyIds, salespersonId);

    return NextResponse.json({ success: true, counties });
  } catch (error) {
    console.error("Bulk assign counties error:", error);
    return NextResponse.json(
      { error: "Failed to bulk assign counties" },
      { status: 500 }
    );
  }
}
