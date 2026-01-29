import { NextResponse } from "next/server";
import { createTestimonial } from "@/lib/data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, businessName, quote, isFeatured, displayOrder } = body;

    // Validate required fields
    if (!customerName || !quote) {
      return NextResponse.json(
        { error: "Customer name and quote are required" },
        { status: 400 }
      );
    }

    const testimonial = await createTestimonial({
      customerName,
      businessName: businessName || undefined,
      quote,
      isFeatured: isFeatured ?? false,
      displayOrder: displayOrder ?? 0,
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
