import { NextRequest, NextResponse } from "next/server";
import { deleteContactSubmission } from "@/lib/data";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const contactId = parseInt(id, 10);

    if (isNaN(contactId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await deleteContactSubmission(contactId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete contact error:", error);
    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}
