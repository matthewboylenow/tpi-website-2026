import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, county, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Insert into database
    const [submission] = await db
      .insert(contactSubmissions)
      .values({
        name,
        email,
        phone: phone || null,
        county: county || null,
        message,
        // salespersonId would be determined by county mapping in a more complete implementation
      })
      .returning({ id: contactSubmissions.id });

    return NextResponse.json(
      { success: true, id: submission.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
