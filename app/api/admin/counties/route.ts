import { NextRequest, NextResponse } from "next/server";
import { getCountiesWithSalespeople, createCounty } from "@/lib/data";

export async function GET() {
  try {
    const counties = await getCountiesWithSalespeople();
    return NextResponse.json({ counties });
  } catch (error) {
    console.error("Get counties error:", error);
    return NextResponse.json(
      { error: "Failed to get counties" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.state) {
      return NextResponse.json(
        { error: "Name and state are required" },
        { status: 400 }
      );
    }

    const county = await createCounty({
      name: data.name,
      state: data.state,
      salespersonId: data.salespersonId || null,
    });

    return NextResponse.json({ success: true, county });
  } catch (error) {
    console.error("Create county error:", error);
    return NextResponse.json(
      { error: "Failed to create county" },
      { status: 500 }
    );
  }
}
