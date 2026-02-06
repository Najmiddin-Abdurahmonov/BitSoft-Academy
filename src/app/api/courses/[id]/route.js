import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    // Course deletion not supported with JSON storage
    return NextResponse.json({ success: false, error: "Operation not supported" }, { status: 400 });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
