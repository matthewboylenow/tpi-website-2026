import { NextRequest, NextResponse } from "next/server";
import { getAllSiteSettings, setSiteSettings } from "@/lib/data";

export async function GET() {
  try {
    const settings = await getAllSiteSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Get settings error:", error);
    return NextResponse.json(
      { error: "Failed to get settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();

    // Filter out empty values
    const settingsToSave: Record<string, string> = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "string") {
        settingsToSave[key] = value;
      }
    }

    await setSiteSettings(settingsToSave);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
