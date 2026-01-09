import { NextRequest, NextResponse } from "next/server";
import { createSalesperson } from "@/lib/data";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.slug || !data.email) {
      return NextResponse.json(
        { error: "First name, last name, slug, and email are required" },
        { status: 400 }
      );
    }

    const salesperson = await createSalesperson({
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
    console.error("Create salesperson error:", error);
    return NextResponse.json(
      { error: "Failed to create salesperson" },
      { status: 500 }
    );
  }
}
